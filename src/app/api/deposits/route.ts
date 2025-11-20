import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
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

    const { amount, method, iban } = await request.json();

    // Validations
    if (!amount || !method) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!validateAmount(amount)) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    if (method === 'bank_transfer' && !validateIBAN(iban)) {
      return NextResponse.json({ error: 'Invalid IBAN' }, { status: 400 });
    }

    // Create deposit record
    const depositId = `DEP-${Date.now()}`;
    
    return NextResponse.json({ 
      id: depositId, 
      amount, 
      method, 
      status: 'pending', 
      createdAt: new Date(),
      message: 'Deposit request created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Deposit error:', error);
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

    // Return mock deposits for now
    const deposits = [
      { id: 'DEP-001', amount: 5000, method: 'bank_transfer', status: 'completed', createdAt: new Date(Date.now() - 86400000) },
      { id: 'DEP-002', amount: 10000, method: 'credit_card', status: 'pending', createdAt: new Date() }
    ];

    return NextResponse.json(deposits);
  } catch (error) {
    console.error('Deposits fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
