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

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        account: {
          select: {
            balance: true,
            totalInvested: true,
            totalReturns: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
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

    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['USER', 'ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
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

    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
