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
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json(account);
  } catch (error) {
    console.error('Get account error:', error);
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

    // Hesap oluştur (zaten varsa güncelle)
    const account = await prisma.account.upsert({
      where: { userId: decoded.userId },
      update: {},
      create: {
        userId: decoded.userId,
        balance: 10000.0,
      },
    });

    return NextResponse.json(account);
  } catch (error) {
    console.error('Create account error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
