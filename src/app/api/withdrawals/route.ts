import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { validateAmount, validateIBAN } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const cookie = request.headers.get('cookie');
    const token = cookie?.match(/auth-token=([^;]+)/)?.[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { amount, iban } = await request.json();

    // Validations
    if (!amount || !iban) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!validateAmount(amount)) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    if (!validateIBAN(iban)) {
      return NextResponse.json({ error: 'Invalid IBAN' }, { status: 400 });
    }

    // Create withdrawal record
    const withdrawalId = `WIT-${Date.now()}`;
    
    return NextResponse.json({ 
      id: withdrawalId, 
      amount, 
      iban,
      status: 'pending', 
      createdAt: new Date(),
      message: 'Withdrawal request created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Withdrawal error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const cookie = request.headers.get('cookie');
    const token = cookie?.match(/auth-token=([^;]+)/)?.[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Return mock withdrawals for now
    const withdrawals = [
      { id: 'WIT-001', amount: 2000, iban: 'TR123456789...', status: 'completed', createdAt: new Date(Date.now() - 172800000) },
      { id: 'WIT-002', amount: 5000, iban: 'TR987654321...', status: 'processing', createdAt: new Date(Date.now() - 86400000) }
    ];

    return NextResponse.json(withdrawals);
  } catch (error) {
    console.error('Withdrawals fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
