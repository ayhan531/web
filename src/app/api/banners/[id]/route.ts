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
  const banner = await prisma.banner.findUnique({ where: { id: parseInt(params.id) } });
  if (!banner) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(banner);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!await verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { title, content, image, link, published, order } = body;
    const banner = await prisma.banner.update({
      where: { id: parseInt(params.id) },
      data: { title, content, image, link, published, order },
    });
    return NextResponse.json(banner);
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
    await prisma.banner.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}