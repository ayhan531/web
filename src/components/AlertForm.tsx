'use client';

import { useState } from 'react';
import type { ExchangeRate } from '@/types/exchange';

interface AlertFormProps {
  rate: ExchangeRate;
  onClose: () => void;
}

export default function AlertForm({ rate, onClose }: AlertFormProps) {
  const [type, setType] = useState<'ABOVE' | 'BELOW'>('ABOVE');
  const [price, setPrice] = useState(rate.selling);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marketId: rate.code,
          type,
          price
        })
      });

      if (!res.ok) throw new Error('Alarm oluşturulamadı');
      
      alert('Kur alarmı başarıyla oluşturuldu!');
      onClose();
    } catch (error) {
      alert('Alarm oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Alarm oluşturma hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">
          {rate.code} Kur Alarmı Oluştur
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Alarm Tipi
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'ABOVE' | 'BELOW')}
              className="w-full p-2 border rounded"
              required
            >
              <option value="ABOVE">Bu değerin üstüne çıkınca</option>
              <option value="BELOW">Bu değerin altına düşünce</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Kur Değeri (TL)
            </label>
            <input
              type="number"
              step="0.0001"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded"
              required
              min="0"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              disabled={loading}
            >
              İptal
            </button>
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-[var(--primary)] px-4 py-2 font-medium text-white shadow-sm transition hover:bg-[var(--primary-dark)] disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Oluşturuluyor...' : 'Alarm Oluştur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}