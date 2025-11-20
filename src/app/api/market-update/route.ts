import { NextResponse } from 'next/server';
import { runAllUpdates } from '@/lib/market-updater';

// Bu endpoint'i cron job ile çağırabilirsiniz
// Örnek: https://cron-job.org veya Vercel Cron
export async function POST(req: Request) {
  try {
    // Güvenlik: API key kontrol et
    const apiKey = req.headers.get('x-api-key');
    const expectedKey = process.env.MARKET_UPDATE_API_KEY || 'dev-key';

    if (apiKey !== expectedKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await runAllUpdates();

    return NextResponse.json({
      success: true,
      message: 'Market data updated successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Market update error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET endpoint - manuel test için
export async function GET(req: Request) {
  try {
    const apiKey = req.headers.get('x-api-key');
    const expectedKey = process.env.MARKET_UPDATE_API_KEY || 'dev-key';

    if (apiKey !== expectedKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await runAllUpdates();

    return NextResponse.json({
      success: true,
      message: 'Market data updated successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Market update error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
