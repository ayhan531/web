import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function getTokenFromCookie(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|; )auth-token=([^;]+)/);
  return match ? match[1] : null;
}

async function checkAdminRole(token: string) {
  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== 'ADMIN') {
    return null;
  }
  return decoded;
}

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get('cookie');
    const token = getTokenFromCookie(cookie);
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admin = await checkAdminRole(token);
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // İstatistikleri hesapla
    const totalUsers = await prisma.user.count();
    const totalAccounts = await prisma.account.count();
    
    const accounts = await prisma.account.findMany();
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    const totalInvested = accounts.reduce((sum, acc) => sum + acc.totalInvested, 0);
    const totalReturns = accounts.reduce((sum, acc) => sum + acc.totalReturns, 0);

    const totalTransactions = await prisma.transaction.count();
    const buyTransactions = await prisma.transaction.count({
      where: { type: 'BUY' },
    });
    const sellTransactions = await prisma.transaction.count({
      where: { type: 'SELL' },
    });

    const marketDataCount = await prisma.marketData.count();

    const stats = {
      users: {
        total: totalUsers,
        admins: await prisma.user.count({ where: { role: 'ADMIN' } }),
        regularUsers: totalUsers - await prisma.user.count({ where: { role: 'ADMIN' } }),
      },
      accounts: {
        total: totalAccounts,
        totalBalance,
        totalInvested,
        totalReturns,
        averageBalance: totalAccounts > 0 ? totalBalance / totalAccounts : 0,
      },
      transactions: {
        total: totalTransactions,
        buy: buyTransactions,
        sell: sellTransactions,
      },
      market: {
        activeSymbols: marketDataCount,
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
