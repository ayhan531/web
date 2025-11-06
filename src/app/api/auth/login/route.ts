import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyPassword, generateToken, createSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email ve şifre gerekli' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Geçersiz email veya şifre' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Geçersiz email veya şifre' }, { status: 401 });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    await createSession(user.id, token);

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Giriş işlemi başarısız' }, { status: 500 });
  }
}
