'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import AlertForm from '@/components/AlertForm';
import type { ExchangeRate } from '@/types/exchange';
import Reveal from '@/components/Reveal';
import VideoCard from '@/components/VideoCard';

function ExchangeCard({ rate, onAlertClick }: { rate: ExchangeRate; onAlertClick: () => void }) {
  const isPositive = rate.change.startsWith('+');
  
  return (
    <div className="lift rounded-lg bg-[var(--surface)] p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">{rate.code}</h3>
          <p className="text-sm text-[var(--text-light)]">{rate.name}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onAlertClick}
            className="glow rounded-full p-2 hover:bg-gray-100"
            title="Kur Alarmı Oluştur"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="h-5 w-5"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" 
              />
            </svg>
          </button>
          <span className={(isPositive ? 'text-[var(--success)]' : 'text-[var(--error)]') + ' font-semibold'}>
            {rate.change}%
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-[var(--text-light)]">Alış</p>
          <p className="text-lg font-semibold">{rate.buying} ₺</p>
        </div>
        <div>
          <p className="text-sm text-[var(--text-light)]">Satış</p>
          <p className="text-lg font-semibold">{rate.selling} ₺</p>
        </div>
      </div>
      <div className="mt-4 text-xs text-[var(--text-light)]">
        Son güncelleme: {rate.lastUpdate}
      </div>
    </div>
  );
}

export default function ExchangePage() {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRate, setSelectedRate] = useState<ExchangeRate | null>(null);

  const fetchRates = async () => {
    try {
      const res = await fetch('/api/exchange');
      if (!res.ok) throw new Error('Veriler alınamadı');
      const data = await res.json();
      setRates(data);
      setError(null);
    } catch (err) {
      setError('Döviz kurları şu anda alınamıyor');
      console.error('Döviz kuru hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    // Her 5 dakikada bir güncelle
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto animate-fade-in px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <Reveal>
            <h1 className="text-3xl font-bold">Döviz Kurları</h1>
          </Reveal>
          <button 
            onClick={fetchRates}
            className="glow inline-flex items-center rounded-md border border-[var(--primary)] px-4 py-2 text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
            disabled={loading}
          >
            {loading ? 'Yükleniyor...' : 'Yenile'}
          </button>
        </div>

        {error ? (
          <div className="rounded bg-[color:oklch(0.64_0.23_27.86)/0.1] p-4 text-[var(--error)]">
            {error}
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Reveal key={i} delayMs={i * 80}>
                <div className="rounded-lg bg-[var(--surface)] p-6 shadow-sm">
                  <div className="h-32 rounded shimmer"></div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Sol taraf - Döviz kartları */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rates.map((rate, i) => (
                  <Reveal key={rate.code} delayMs={i * 80}>
                    <ExchangeCard 
                      rate={rate} 
                      onAlertClick={() => setSelectedRate(rate)}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
            
            {/* Sağ taraf - Video */}
            <div className="lg:col-span-1">
              <Reveal delayMs={200}>
                <VideoCard
                  src="/video2.mp4"
                  title="Teknik Analiz Kavramları"
                  description="Yatırımda başarı için teknik analiz temellerini öğrenin"
                />
              </Reveal>
            </div>
          </div>
        )}

        {selectedRate && (
          <AlertForm
            rate={selectedRate}
            onClose={() => setSelectedRate(null)}
          />
        )}

        <Reveal>
          <div className="mt-12 rounded-lg bg-[var(--surface)] p-6">
            <h2 className="mb-4 text-xl font-semibold">Önemli Bilgi</h2>
            <p className="text-[var(--text-light)]">
              Döviz kurları T.C. Merkez Bankası'ndan alınmaktadır ve gösterge niteliğindedir. 
              İşlem yapmadan önce bankanız ile güncel kurları teyit ediniz.
            </p>
          </div>
        </Reveal>
      </main>
    </>
  );
}