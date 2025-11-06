import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/db';

const SECRET = process.env.ADMIN_JWT_SECRET || 'dev-secret-for-local';

function getTokenFromCookie(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|; )token=([^;]+)/);
  return match ? match[1] : null;
}

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get('cookie');
    const token = getTokenFromCookie(cookie);
    if (!token) return NextResponse.json({ user: null });
    const data: any = jwt.verify(token, SECRET);
    const user = await prisma.user.findUnique({ where: { id: data.uid } });
    if (!user) return NextResponse.json({ user: null });
    return NextResponse.json({ user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    return NextResponse.json({ user: null });
  }
}
