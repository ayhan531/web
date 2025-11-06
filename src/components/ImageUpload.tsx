'use client';

import { useState } from 'react';

interface ImageUploadProps {
  onUpload: (imageUrl: string) => void;
  label?: string;
  currentImage?: string;
}

export default function ImageUpload({ onUpload, label = 'Görsel Yükle', currentImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(currentImage || '');

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Yükleme başarısız');
      
      const data = await res.json();
      setPreview(data.url);
      onUpload(data.url);
    } catch (err) {
      console.error('Yükleme hatası:', err);
      alert('Görsel yükleme başarısız');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', marginBottom: 8 }}>{label}</label>
      
      {preview && (
        <div style={{ marginBottom: 8 }}>
          <img 
            src={preview} 
            alt="Önizleme" 
            style={{ maxWidth: 200, maxHeight: 200, objectFit: 'contain' }} 
          />
        </div>
      )}

      <input
        type="file"
        onChange={handleUpload}
        accept="image/*"
        disabled={uploading}
        style={{ display: 'block' }}
      />
      
      {uploading && <div>Yükleniyor...</div>}
    </div>
  );
}