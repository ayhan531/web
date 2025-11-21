import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simulate real-time stock data
    // In production, this would fetch from BIST API or financial data provider
    const basePrice = 42.50;
    const randomChange = (Math.random() - 0.5) * 2; // Random change between -1 and +1
    const price = Number((basePrice + randomChange).toFixed(2));
    const change = Number((price - basePrice).toFixed(2));
    const changePercent = Number(((change / basePrice) * 100).toFixed(2));
    
    const stockData = {
      symbol: 'YPRO',
      price: price,
      change: change,
      changePercent: changePercent,
      volume: Math.floor(1000000 + Math.random() * 500000), // Random volume between 1-1.5M
      marketCap: Math.floor(price * 150000000), // 150M shares
      lastUpdate: new Date().toLocaleString('tr-TR')
    };

    return NextResponse.json(stockData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    );
  }
}
