import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import jwt from 'jsonwebtoken';

const SECRET = process.env.ADMIN_JWT_SECRET || 'dev-secret-for-local';

function getTokenFromCookie(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|; )token=([^;]+)/);
  return match ? match[1] : null;
}

async function verifyAdmin(req: Request) {
  const cookie = req.headers.get('cookie');
  const token = getTokenFromCookie(cookie);
  if (!token) return false;
  try {
    jwt.verify(token, SECRET);
    return true;
  } catch (err) {
    return false;
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const market = await prisma.market.findUnique({ where: { id: parseInt(id) } });
  if (!market) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(market);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const { symbol, price, change } = body;
    const market = await prisma.market.update({
      where: { id: parseInt(id) },
      data: { symbol, price, change },
    });
    return NextResponse.json(market);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id } = await params;
    await prisma.market.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}