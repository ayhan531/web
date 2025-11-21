import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In production, this would fetch from database or real data source
    // For now, return structured company statistics
    const stats = {
      foundingYear: '1996',
      employees: 603,
      branches: 36,
      totalAssets: 100310, // Million TL
      equity: 28698, // Million TL
      ipoValue: 33.2, // Billion TL
      ipoCount: 40,
      bondIssuances: 363.6, // Billion TL
      maTransactions: 164,
      lastUpdate: new Date().toISOString()
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching company stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company statistics' },
      { status: 500 }
    );
  }
}
