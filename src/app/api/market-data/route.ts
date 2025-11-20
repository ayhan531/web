import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Örnek borsa verisi - gerçek API ile değiştirilecek
const MOCK_DATA = {
  'AAPL': { name: 'Apple Inc.', price: 150.25, change: 2.5, changePercent: 1.69 },
  'GOOGL': { name: 'Alphabet Inc.', price: 140.80, change: -1.2, changePercent: -0.84 },
  'MSFT': { name: 'Microsoft Corp.', price: 380.50, change: 5.2, changePercent: 1.38 },
  'AMZN': { name: 'Amazon.com Inc.', price: 170.45, change: 3.1, changePercent: 1.85 },
  'TSLA': { name: 'Tesla Inc.', price: 242.30, change: -4.5, changePercent: -1.83 },
  'NVDA': { name: 'NVIDIA Corp.', price: 875.20, change: 12.5, changePercent: 1.45 },
  'META': { name: 'Meta Platforms Inc.', price: 485.75, change: 8.3, changePercent: 1.73 },
  'NFLX': { name: 'Netflix Inc.', price: 245.60, change: 2.8, changePercent: 1.15 },
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get('symbol');

    if (symbol) {
      // Belirli bir sembol için veri getir
      const data = await prisma.marketData.findUnique({
        where: { symbol: symbol.toUpperCase() },
      });

      if (!data) {
        return NextResponse.json({ error: 'Symbol not found' }, { status: 404 });
      }

      return NextResponse.json(data);
    }

    // Tüm market verilerini getir
    const allData = await prisma.marketData.findMany({
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(allData);
  } catch (error) {
    console.error('Get market data error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { symbol, price, change, changePercent, high, low, volume, name } = await req.json();

    if (!symbol || price === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const marketData = await prisma.marketData.upsert({
      where: { symbol: symbol.toUpperCase() },
      update: {
        price,
        change,
        changePercent,
        high,
        low,
        volume,
        name,
        updatedAt: new Date(),
      },
      create: {
        symbol: symbol.toUpperCase(),
        name,
        price,
        change,
        changePercent,
        high,
        low,
        volume,
      },
    });

    return NextResponse.json(marketData);
  } catch (error) {
    console.error('Update market data error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Market verilerini başlat
export async function PUT(req: Request) {
  try {
    // Mock verilerle başlat
    for (const [symbol, data] of Object.entries(MOCK_DATA)) {
      await prisma.marketData.upsert({
        where: { symbol },
        update: {
          price: data.price,
          change: data.change,
          changePercent: data.changePercent,
          name: data.name,
          updatedAt: new Date(),
        },
        create: {
          symbol,
          name: data.name,
          price: data.price,
          change: data.change,
          changePercent: data.changePercent,
        },
      });
    }

    return NextResponse.json({ message: 'Market data initialized' });
  } catch (error) {
    console.error('Initialize market data error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
