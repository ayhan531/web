'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Reveal from '@/components/Reveal';
import VideoCard from '@/components/VideoCard';

interface BISTIndex {
  symbol: string;
  name: string;
  value: string;
  change: string;
  changePercent: string;
  volume?: string;
  lastUpdate: string;
}

interface BISTStock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume?: string;
  lastUpdate: string;
}

export default function BorsaPage() {
  const [indices, setIndices] = useState<BISTIndex[]>([]);
  const [stocks, setStocks] = useState<BISTStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [indicesRes, stocksRes] = await Promise.all([
          fetch('/api/bist/indices'),
          fetch('/api/bist/stocks?limit=6'),
        ]);

        if (!indicesRes.ok || !stocksRes.ok) {
          throw new Error('Veri çekilemedi');
        }

        const [indicesData, stocksData] = await Promise.all([
          indicesRes.json(),
          stocksRes.json(),
        ]);

        setIndices(indicesData);
        setStocks(stocksData);
        setError(null);
      } catch (err) {
        console.error('BIST veri hatası:', err);
        setError('Veriler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Her 60 saniyede bir otomatik yenile
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--primary)] border-r-transparent"></div>
            <p className="mt-4 text-[var(--text-light)]">Canlı veriler yükleniyor...</p>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="rounded-lg bg-red-50 p-4 text-red-700">
            <p>{error}</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <Reveal>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Borsa İstanbul (BIST)</h1>
              <p className="mt-2 text-[var(--text-light)]">Canlı endeksler ve hisse fiyatları</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--text-light)]">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
              Canlı Veri
            </div>
          </div>
        </Reveal>

        {/* BIST Endeksleri */}
        <section className="mt-8">
          <Reveal>
            <h2 className="mb-4 text-xl font-semibold">Endeksler</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {indices.map((item, i) => {
              const isPositive = item.changePercent.startsWith('+');
              return (
                <Reveal key={item.symbol} delayMs={i * 80}>
                  <div className="lift rounded-lg bg-[var(--surface)] p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p className="mt-1 text-sm text-[var(--text-light)]">{item.symbol}</p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.changePercent}
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="text-2xl font-bold">{item.value}</span>
                      <p className="mt-2 text-xs text-[var(--text-light)]">Hacim: {item.volume}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-[var(--text-light)]">
                        {item.lastUpdate}
                      </span>
                      <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '▲' : '▼'} {item.change}
                      </span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Popüler Hisseler + Video */}
        <section className="mt-12">
          <Reveal>
            <h2 className="mb-4 text-xl font-semibold">Popüler Hisseler</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Sol taraf - Hisse kartları */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stocks.map((stock, i) => {
                  const isPositive = stock.changePercent.startsWith('+');
                  return (
                    <Reveal key={stock.symbol} delayMs={i * 80}>
                      <div className="lift rounded-lg bg-[var(--surface)] p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{stock.symbol}</h4>
                            <p className="text-xs text-[var(--text-light)]">{stock.name}</p>
                          </div>
                          <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.changePercent}
                          </span>
                        </div>
                        <div className="mt-3 flex items-baseline justify-between">
                          <span className="text-lg font-bold">{stock.price} ₺</span>
                          <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {isPositive ? '▲' : '▼'} {stock.change}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-[var(--text-light)]">Hacim: {stock.volume}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
            
            {/* Sağ taraf - Video */}
            <div className="lg:col-span-1">
              <Reveal delayMs={200}>
                <VideoCard
                  src="/video1.mp4"
                  title="2025 Yılında Türkiye Ekonomisi"
                  description="Türkiye ekonomisi ve piyasalar hakkında güncel analizler"
                />
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
