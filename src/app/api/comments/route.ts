import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { sanitizeInput } from '@/lib/validation';

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

    const { text, targetId, targetType } = await request.json();

    // Validations
    if (!text || !targetId || !targetType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (text.length < 3 || text.length > 500) {
      return NextResponse.json({ error: 'Comment must be between 3 and 500 characters' }, { status: 400 });
    }

    // Sanitize input
    const sanitizedText = sanitizeInput(text);

    // Create comment record
    const commentId = `COM-${Date.now()}`;
    
    return NextResponse.json({ 
      id: commentId, 
      text: sanitizedText,
      targetId,
      targetType,
      author: payload.email,
      rating: 5,
      createdAt: new Date(),
      message: 'Comment created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Comment creation error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const targetId = url.searchParams.get('targetId');
    const targetType = url.searchParams.get('targetType');

    if (!targetId || !targetType) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Return mock comments for now
    const comments = [
      { id: 'COM-001', text: 'Çok iyi bir analiz!', author: 'user1@example.com', rating: 5, createdAt: new Date(Date.now() - 3600000) },
      { id: 'COM-002', text: 'Harika içerik', author: 'user2@example.com', rating: 4, createdAt: new Date(Date.now() - 7200000) }
    ];

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Comments fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
