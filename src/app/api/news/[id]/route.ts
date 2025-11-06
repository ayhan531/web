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

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const news = await prisma.news.findUnique({ where: { id: parseInt(params.id) } });
  if (!news) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(news);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!await verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, image, published } = body;
    const news = await prisma.news.update({
      where: { id: parseInt(params.id) },
      data: { title, slug, excerpt, content, image, published },
    });
    return NextResponse.json(news);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!await verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await prisma.news.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}