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

    const account = await prisma.account.findUnique({
      where: { userId: decoded.userId },
      include: {
        portfolio: true,
        transactions: true,
      },
    });

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    // Analiz hesaplamaları
    const totalPortfolioValue = account.portfolio.reduce((sum, p) => sum + p.totalValue, 0);
    const totalInvested = account.portfolio.reduce((sum, p) => sum + (p.quantity * p.averagePrice), 0);
    const totalGainLoss = account.portfolio.reduce((sum, p) => sum + p.gainLoss, 0);
    const gainLossPercent = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

    // Portföy dağılımı
    const allocation = account.portfolio.map(p => ({
      symbol: p.symbol,
      value: p.totalValue,
      percentage: totalPortfolioValue > 0 ? (p.totalValue / totalPortfolioValue) * 100 : 0,
    }));

    // En iyi ve en kötü performans
    const sortedByGainLoss = [...account.portfolio].sort((a, b) => b.gainLossPercent - a.gainLossPercent);
    const bestPerformer = sortedByGainLoss[0];
    const worstPerformer = sortedByGainLoss[sortedByGainLoss.length - 1];

    // İşlem istatistikleri
    const buyTransactions = account.transactions.filter(t => t.type === 'BUY').length;
    const sellTransactions = account.transactions.filter(t => t.type === 'SELL').length;
    const totalTransactions = account.transactions.length;

    // Ortalama işlem değeri
    const avgTransactionValue = totalTransactions > 0 
      ? account.transactions.reduce((sum, t) => sum + t.totalAmount, 0) / totalTransactions 
      : 0;

    const analysis = {
      summary: {
        totalBalance: account.balance,
        totalPortfolioValue,
        totalInvested,
        totalGainLoss,
        gainLossPercent,
        totalReturns: account.totalReturns,
      },
      allocation,
      performance: {
        bestPerformer: bestPerformer ? {
          symbol: bestPerformer.symbol,
          gainLossPercent: bestPerformer.gainLossPercent,
          gainLoss: bestPerformer.gainLoss,
        } : null,
        worstPerformer: worstPerformer ? {
          symbol: worstPerformer.symbol,
          gainLossPercent: worstPerformer.gainLossPercent,
          gainLoss: worstPerformer.gainLoss,
        } : null,
      },
      transactions: {
        total: totalTransactions,
        buy: buyTransactions,
        sell: sellTransactions,
        avgValue: avgTransactionValue,
      },
      diversification: {
        holdingCount: account.portfolio.length,
        concentration: allocation.length > 0 ? Math.max(...allocation.map(a => a.percentage)) : 0,
      },
    };

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Portfolio analysis error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
