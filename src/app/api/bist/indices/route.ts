import { NextResponse } from 'next/server';
import { fetchBISTIndices } from '@/lib/bist';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // 1 dakikada bir yenile

export async function GET() {
  try {
    const indices = await fetchBISTIndices();
    return NextResponse.json(indices);
  } catch (error) {
    console.error('BIST endeksleri API hatası:', error);
    return NextResponse.json(
      { error: 'BIST endeksleri şu anda alınamıyor' },
      { status: 500 }
    );
  }
}
