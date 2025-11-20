import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function getTokenFromCookie(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|; )auth-token=([^;]+)/);
  return match ? match[1] : null;
}

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get('cookie');
    const token = getTokenFromCookie(cookie);
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        account: {
          userId: decoded.userId,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Get transactions error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get('cookie');
    const token = getTokenFromCookie(cookie);
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { symbol, type, quantity, price } = await req.json();

    if (!symbol || !type || !quantity || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['BUY', 'SELL'].includes(type)) {
      return NextResponse.json({ error: 'Invalid transaction type' }, { status: 400 });
    }

    // Hesabı bul
    const account = await prisma.account.findUnique({
      where: { userId: decoded.userId },
      include: { portfolio: true },
    });

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const totalAmount = quantity * price;
    const commission = totalAmount * 0.001; // %0.1 komisyon

    if (type === 'BUY') {
      if (account.balance < totalAmount + commission) {
        return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
      }

      // İşlemi oluştur
      const transaction = await prisma.transaction.create({
        data: {
          accountId: account.id,
          symbol,
          type: 'BUY',
          quantity,
          price,
          totalAmount,
          commission,
        },
      });

      // Portföyü güncelle
      const existingPortfolio = account.portfolio.find(p => p.symbol === symbol);
      
      if (existingPortfolio) {
        const newQuantity = existingPortfolio.quantity + quantity;
        const newAveragePrice = (existingPortfolio.averagePrice * existingPortfolio.quantity + price * quantity) / newQuantity;
        
        await prisma.portfolio.update({
          where: { id: existingPortfolio.id },
          data: {
            quantity: newQuantity,
            averagePrice: newAveragePrice,
            currentPrice: price,
            totalValue: newQuantity * price,
            gainLoss: (newQuantity * price) - (newQuantity * newAveragePrice),
            gainLossPercent: ((price - newAveragePrice) / newAveragePrice) * 100,
          },
        });
      } else {
        await prisma.portfolio.create({
          data: {
            accountId: account.id,
            symbol,
            quantity,
            averagePrice: price,
            currentPrice: price,
            totalValue: quantity * price,
            gainLoss: 0,
            gainLossPercent: 0,
          },
        });
      }

      // Hesap bakiyesini güncelle
      await prisma.account.update({
        where: { id: account.id },
        data: {
          balance: account.balance - totalAmount - commission,
          totalInvested: account.totalInvested + totalAmount,
        },
      });

      return NextResponse.json(transaction);
    } else {
      // SELL işlemi
      const portfolio = account.portfolio.find(p => p.symbol === symbol);
      
      if (!portfolio || portfolio.quantity < quantity) {
        return NextResponse.json({ error: 'Insufficient quantity' }, { status: 400 });
      }

      // İşlemi oluştur
      const transaction = await prisma.transaction.create({
        data: {
          accountId: account.id,
          symbol,
          type: 'SELL',
          quantity,
          price,
          totalAmount,
          commission,
        },
      });

      // Portföyü güncelle
      const newQuantity = portfolio.quantity - quantity;
      
      if (newQuantity === 0) {
        await prisma.portfolio.delete({
          where: { id: portfolio.id },
        });
      } else {
        await prisma.portfolio.update({
          where: { id: portfolio.id },
          data: {
            quantity: newQuantity,
            currentPrice: price,
            totalValue: newQuantity * price,
            gainLoss: (newQuantity * price) - (newQuantity * portfolio.averagePrice),
            gainLossPercent: ((price - portfolio.averagePrice) / portfolio.averagePrice) * 100,
          },
        });
      }

      // Hesap bakiyesini güncelle
      const gainLoss = (price - portfolio.averagePrice) * quantity;
      await prisma.account.update({
        where: { id: account.id },
        data: {
          balance: account.balance + totalAmount - commission,
          totalReturns: account.totalReturns + gainLoss,
        },
      });

      return NextResponse.json(transaction);
    }
  } catch (error) {
    console.error('Create transaction error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
