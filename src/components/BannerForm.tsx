'use client';

import { useState } from 'react';
import ImageUpload from './ImageUpload';

export default function BannerForm({ banner, onSubmit }: any) {
  const [formData, setFormData] = useState({
    title: banner?.title || '',
    link: banner?.link || '',
    imageUrl: banner?.imageUrl || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">Başlık</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Link</label>
        <input
          type="text"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <ImageUpload
        onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
        label="Banner Görseli"
        currentImage={formData.imageUrl}
      />

      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Kaydet
      </button>
    </form>
  );
}