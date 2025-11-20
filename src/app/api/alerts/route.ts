import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import jwt from 'jsonwebtoken';

const SECRET = process.env.ADMIN_JWT_SECRET || 'dev-secret-for-local';

function getTokenFromCookie(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|; )auth-token=([^;]+)/);
  return match ? match[1] : null;
}

async function authenticateUser(request: NextRequest) {
  const cookie = request.headers.get('cookie');
  const token = getTokenFromCookie(cookie);
  if (!token) return null;

  try {
    const payload = jwt.verify(token, SECRET) as any;
    return payload;
  } catch (err) {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const user = await authenticateUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
  }

  const alerts = await prisma.rateAlert.findMany({
    where: { userId: user.userId },
    include: { market: true }
  });

  return NextResponse.json(alerts);
}

export async function POST(request: NextRequest) {
  const user = await authenticateUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { marketId, type, price } = data;

    if (!marketId || !type || !price) {
      return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });
    }

    if (!['ABOVE', 'BELOW'].includes(type)) {
      return NextResponse.json({ error: 'Geçersiz alarm tipi' }, { status: 400 });
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      return NextResponse.json({ error: 'Geçersiz fiyat' }, { status: 400 });
    }

    const alert = await prisma.rateAlert.create({
      data: {
        userId: user.userId,
        marketId,
        type,
        price: price.toString(),
        active: true
      },
      include: { market: true }
    });

    return NextResponse.json(alert);
  } catch (error) {
    console.error('Alarm oluşturma hatası:', error);
    return NextResponse.json({ error: 'Alarm oluşturulamadı' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const user = await authenticateUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { id, active } = data;

    const alert = await prisma.rateAlert.update({
      where: { id, userId: user.userId },
      data: { active },
      include: { market: true }
    });

    return NextResponse.json(alert);
  } catch (error) {
    console.error('Alarm güncelleme hatası:', error);
    return NextResponse.json({ error: 'Alarm güncellenemedi' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const user = await authenticateUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get('id') || '');

    if (!id) {
      return NextResponse.json({ error: 'Geçersiz alarm ID' }, { status: 400 });
    }

    await prisma.rateAlert.delete({
      where: { id, userId: user.userId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Alarm silme hatası:', error);
    return NextResponse.json({ error: 'Alarm silinemedi' }, { status: 500 });
  }
}
