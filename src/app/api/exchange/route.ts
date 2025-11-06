import { NextResponse } from 'next/server';
import { fetchExchangeRates } from '@/lib/exchange';

export const dynamic = 'force-dynamic'; // Her istekte yeni veri
export const revalidate = 300; // 5 dakikada bir yenile

export async function GET() {
  try {
    // TCMB'den güncel kurları al
    const rates = await fetchExchangeRates();
    return NextResponse.json(rates);
  } catch (error) {
    console.error('Döviz API hatası:', error);
    // Güvenli fallback: minimal demo verisi ile dön
    const now = new Date().toLocaleString('tr-TR');
    const fallback = [
      { code: 'USD', name: 'ABD Doları', buying: '32.1000', selling: '32.4000', change: '+0.45', lastUpdate: now },
      { code: 'EUR', name: 'Euro',       buying: '34.5000', selling: '34.8500', change: '-0.12', lastUpdate: now },
      { code: 'GBP', name: 'İngiliz Sterlini', buying: '39.8000', selling: '40.1500', change: '+0.20', lastUpdate: now },
    ];
    return NextResponse.json(fallback, { status: 200 });
  }
}