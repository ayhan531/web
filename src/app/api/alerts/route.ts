import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

// Alarm listesi
export async function GET(request: NextRequest) {
  const user = await auth(request);
  if (!user) {
    return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
  }

  const alerts = await prisma.rateAlert.findMany({
    where: { userId: user.id },
    include: {
      market: true
    }
  });

  return NextResponse.json(alerts);
}

// Yeni alarm oluştur
export async function POST(request: NextRequest) {
  const user = await auth(request);
  if (!user) {
    return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { marketId, type, price } = data;

    // Geçerlilik kontrolleri
    if (!marketId || !type || !price) {
      return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });
    }

    if (!['ABOVE', 'BELOW'].includes(type)) {
      return NextResponse.json({ error: 'Geçersiz alarm tipi' }, { status: 400 });
    }

    // Sayısal değer kontrolü
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      return NextResponse.json({ error: 'Geçersiz fiyat' }, { status: 400 });
    }

    const alert = await prisma.rateAlert.create({
      data: {
        userId: user.id,
        marketId,
        type,
        price: price.toString(),
        active: true
      },
      include: {
        market: true
      }
    });

    return NextResponse.json(alert);
  } catch (error) {
    console.error('Alarm oluşturma hatası:', error);
    return NextResponse.json(
      { error: 'Alarm oluşturulamadı' },
      { status: 500 }
    );
  }
}

// Alarm güncelle/sil
export async function PATCH(request: NextRequest) {
  const user = await auth(request);
  if (!user) {
    return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { id, active } = data;

    const alert = await prisma.rateAlert.update({
      where: {
        id,
        userId: user.id // Sadece kendi alarmlarını güncelleyebilir
      },
      data: { active },
      include: {
        market: true
      }
    });

    return NextResponse.json(alert);
  } catch (error) {
    console.error('Alarm güncelleme hatası:', error);
    return NextResponse.json(
      { error: 'Alarm güncellenemedi' },
      { status: 500 }
    );
  }
}

// Alarm sil
export async function DELETE(request: NextRequest) {
  const user = await auth(request);
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
      where: {
        id,
        userId: user.id // Sadece kendi alarmlarını silebilir
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Alarm silme hatası:', error);
    return NextResponse.json(
      { error: 'Alarm silinemedi' },
      { status: 500 }
    );
  }
}