import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'Dosya yüklenmedi' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Güvenli dosya adı oluştur
    const timestamp = Date.now();
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-');
    const fileName = `${timestamp}-${safeName}`;
    const path = join(process.cwd(), 'public/uploads', fileName);
    
    await writeFile(path, buffer);
    
    return NextResponse.json({ 
      url: `/uploads/${fileName}`,
      fileName: fileName,
      originalName: file.name,
      size: file.size,
      type: file.type
    });
  } catch (e) {
    console.error('Yükleme hatası:', e);
    return NextResponse.json(
      { error: 'Yükleme başarısız' },
      { status: 500 }
    );
  }
}