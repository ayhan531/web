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

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
  rating: number;
}

interface ChartData {
  time: string;
  price: number;
}

export default function BorsaPage() {
  const [indices, setIndices] = useState<BISTIndex[]>([]);
  const [stocks, setStocks] = useState<BISTStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStock, setSelectedStock] = useState<BISTStock | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [transactionType, setTransactionType] = useState<'BUY' | 'SELL'>('BUY');
  const [transactionMessage, setTransactionMessage] = useState('');
  const [transactionLoading, setTransactionLoading] = useState(false);

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

  const handleStockClick = async (stock: BISTStock) => {
    setSelectedStock(stock);
    setCommentsLoading(true);
    setComments([]);
    setChartData([]);
    setQuantity('');
    setTransactionMessage('');

    try {
      // Mock yorumlar ve grafik verileri
      const mockComments: Comment[] = [
        {
          id: 1,
          author: 'Yatırımcı Ali',
          text: `${stock.symbol} hissesi güzel bir trend gösteriyor. Teknik analiz açısından pozitif görünüyor.`,
          timestamp: '2 saat önce',
          rating: 5,
        },
        {
          id: 2,
          author: 'Trader Ayşe',
          text: 'Son haberler ışığında bu hisse için uzun pozisyon açmayı düşünüyorum.',
          timestamp: '1 saat önce',
          rating: 4,
        },
        {
          id: 3,
          author: 'Analist Mehmet',
          text: 'Destek seviyesine yaklaştı. Buradan rebound bekliyorum.',
          timestamp: '30 dakika önce',
          rating: 4,
        },
        {
          id: 4,
          author: 'Portföy Yöneticisi',
          text: 'Uzun vadeli yatırımcılar için iyi bir fırsat olabilir.',
          timestamp: '15 dakika önce',
          rating: 5,
        },
      ];

      // Mock grafik verileri
      const basePrice = parseFloat(stock.price);
      const mockChartData: ChartData[] = [];
      for (let i = 0; i < 24; i++) {
        const variation = (Math.random() - 0.5) * 2;
        mockChartData.push({
          time: `${i}:00`,
          price: basePrice + variation,
        });
      }

      setComments(mockComments);
      setChartData(mockChartData);
    } catch (err) {
      console.error('Veri yükleme hatası:', err);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransactionLoading(true);
    setTransactionMessage('');

    try {
      if (!selectedStock || !quantity) {
        throw new Error('Lütfen tüm alanları doldurunuz');
      }

      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: selectedStock.symbol,
          type: transactionType,
          quantity: parseFloat(quantity),
          price: parseFloat(selectedStock.price),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'İşlem başarısız');
      }

      setTransactionMessage(`✓ ${transactionType === 'BUY' ? 'Satın alma' : 'Satış'} işlemi başarılı!`);
      setQuantity('');
      setTimeout(() => setTransactionMessage(''), 3000);
    } catch (err) {
      setTransactionMessage(`✗ ${err instanceof Error ? err.message : 'Bir hata oluştu'}`);
    } finally {
      setTransactionLoading(false);
    }
  };

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
                      <div 
                        onClick={() => handleStockClick(stock)}
                        className="lift rounded-lg bg-[var(--surface)] p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                      >
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

        {/* Modal - Hisse Detayları */}
        {selectedStock && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[var(--surface)] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-[var(--surface)] border-b border-[var(--border)] p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedStock.symbol}</h2>
                  <p className="text-[var(--text-light)]">{selectedStock.name}</p>
                </div>
                <button
                  onClick={() => setSelectedStock(null)}
                  className="text-2xl font-bold text-[var(--text-light)] hover:text-[var(--text)]"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Fiyat Bilgisi */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[var(--bg)] p-4 rounded-lg">
                    <p className="text-sm text-[var(--text-light)]">Güncel Fiyat</p>
                    <p className="text-3xl font-bold mt-2">{selectedStock.price} ₺</p>
                  </div>
                  <div className="bg-[var(--bg)] p-4 rounded-lg">
                    <p className="text-sm text-[var(--text-light)]">Değişim</p>
                    <p className={`text-2xl font-bold mt-2 ${selectedStock.changePercent.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedStock.change}
                    </p>
                  </div>
                  <div className="bg-[var(--bg)] p-4 rounded-lg">
                    <p className="text-sm text-[var(--text-light)]">Yüzde Değişim</p>
                    <p className={`text-2xl font-bold mt-2 ${selectedStock.changePercent.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedStock.changePercent}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Grafik */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">24 Saatlik Grafik</h3>
                    <div className="bg-[var(--bg)] p-4 rounded-lg h-64">
                      {chartData.length > 0 ? (
                        <div className="h-full flex items-end justify-between gap-1">
                          {chartData.map((data, i) => {
                            const minPrice = Math.min(...chartData.map(d => d.price));
                            const maxPrice = Math.max(...chartData.map(d => d.price));
                            const range = maxPrice - minPrice || 1;
                            const height = ((data.price - minPrice) / range) * 100;
                            return (
                              <div
                                key={i}
                                className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t opacity-70 hover:opacity-100 transition-opacity"
                                style={{ height: `${height}%`, minHeight: '4px' }}
                                title={`${data.time}: ${data.price.toFixed(2)} ₺`}
                              />
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-[var(--text-light)]">
                          Grafik yükleniyor...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Trade İşlemleri */}
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-semibold mb-4">Alım-Satım İşlemi</h3>
                    <form onSubmit={handleTransaction} className="space-y-4">
                      {/* İşlem Tipi */}
                      <div>
                        <label className="block text-sm font-medium mb-2">İşlem Tipi</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setTransactionType('BUY')}
                            className={`flex-1 py-2 px-3 rounded font-medium transition ${
                              transactionType === 'BUY'
                                ? 'bg-blue-600 text-white'
                                : 'bg-[var(--bg)] text-[var(--text)] hover:bg-opacity-80'
                            }`}
                          >
                            Satın Al
                          </button>
                          <button
                            type="button"
                            onClick={() => setTransactionType('SELL')}
                            className={`flex-1 py-2 px-3 rounded font-medium transition ${
                              transactionType === 'SELL'
                                ? 'bg-green-600 text-white'
                                : 'bg-[var(--bg)] text-[var(--text)] hover:bg-opacity-80'
                            }`}
                          >
                            Sat
                          </button>
                        </div>
                      </div>

                      {/* Miktar */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Miktar</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          placeholder="0.00"
                          className="w-full border border-[var(--border)] rounded px-3 py-2 bg-[var(--bg)] text-[var(--text)]"
                          required
                        />
                      </div>

                      {/* Toplam Tutar */}
                      {quantity && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                          <p className="text-sm text-[var(--text-light)]">Toplam Tutar</p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {(parseFloat(quantity) * parseFloat(selectedStock.price)).toFixed(2)} ₺
                          </p>
                        </div>
                      )}

                      {/* Mesaj */}
                      {transactionMessage && (
                        <div className={`p-3 rounded text-sm ${transactionMessage.startsWith('✓') ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'}`}>
                          {transactionMessage}
                        </div>
                      )}

                      {/* Gönder Butonu */}
                      <button
                        type="submit"
                        disabled={transactionLoading || !quantity}
                        className={`w-full py-2 px-4 rounded font-medium text-white transition ${
                          transactionType === 'BUY'
                            ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400'
                            : 'bg-green-600 hover:bg-green-700 disabled:bg-gray-400'
                        }`}
                      >
                        {transactionLoading ? 'İşleniyor...' : transactionType === 'BUY' ? 'Satın Al' : 'Sat'}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Yorumlar */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">En Güncel Yorumlar</h3>
                  {commentsLoading ? (
                    <div className="text-center py-8">
                      <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-[var(--primary)] border-r-transparent"></div>
                      <p className="mt-2 text-[var(--text-light)]">Yorumlar yükleniyor...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="bg-[var(--bg)] p-4 rounded-lg border border-[var(--border)]">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{comment.author}</h4>
                              <p className="text-xs text-[var(--text-light)]">{comment.timestamp}</p>
                            </div>
                            <div className="flex gap-1">
                              {[...Array(comment.rating)].map((_, i) => (
                                <span key={i} className="text-yellow-400">★</span>
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-[var(--text)]">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
