import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import jwt from 'jsonwebtoken';

const SECRET = process.env.ADMIN_JWT_SECRET || 'dev-secret-for-local';

function getTokenFromCookie(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|; )auth-token=([^;]+)/);
  return match ? match[1] : null;
}

export async function GET() {
  try {
    const news = await prisma.news.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(news);
  } catch (error) {
    // Fallback mock data when database is not available
    return NextResponse.json([
      {
        id: 1,
        title: 'Piyasalarda Son Durum',
        slug: 'piyasalarda-son-durum',
        excerpt: 'Borsa İstanbul\'da günün öne çıkan hareketleri...',
        content: 'Detaylı analiz içeriği...',
        image: null,
        createdAt: new Date().toISOString()
      }
    ]);
  }
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
    const { title, slug, excerpt, content, image } = body;
    const item = await prisma.news.create({ data: { title, slug, excerpt, content, image } });
    return NextResponse.json(item);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
