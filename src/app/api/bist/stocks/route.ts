import { NextResponse } from 'next/server';
import { fetchBISTStocks } from '@/lib/bist';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // 1 dakikada bir yenile

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    
    const stocks = await fetchBISTStocks(limit);
    return NextResponse.json(stocks);
  } catch (error) {
    console.error('BIST hisseleri API hatası:', error);
    return NextResponse.json(
      { error: 'BIST hisseleri şu anda alınamıyor' },
      { status: 500 }
    );
  }
}
