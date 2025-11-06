import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import jwt from 'jsonwebtoken';

const SECRET = process.env.ADMIN_JWT_SECRET || 'dev-secret-for-local';

function getTokenFromCookie(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|; )token=([^;]+)/);
  return match ? match[1] : null;
}

export async function GET() {
  const banners = await prisma.banner.findMany({ orderBy: { order: 'desc' } });
  return NextResponse.json(banners);
}

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get('cookie');
    const token = getTokenFromCookie(cookie);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
      jwt.verify(token, SECRET);
    } catch (err) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json();
    const { title, content, image, link } = body;
    const banner = await prisma.banner.create({ data: { title, content, image, link } });
    return NextResponse.json(banner);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
