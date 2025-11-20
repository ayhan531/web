'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Reveal from '@/components/Reveal';

export default function HisseDetayPage() {
  const params = useParams();
  const symbol = (params.symbol as string).toUpperCase();

  // Mock veri
  const hisse = {
    symbol,
    name: 'Türk Hava Yolları',
    price: 269.50,
    change: 5.20,
    changePercent: 1.96,
    volume: '12.5M',
    marketCap: '85.2B ₺',
    pe: 12.5,
    dividend: 2.5,
    description: 'Türkiye\'nin en büyük havayolu şirketi. Uluslararası ve yurt içi uçuşlar gerçekleştiriyor.',
  };

  const chartData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    price: hisse.price + (Math.random() - 0.5) * 10,
  }));

  const comments = [
    { author: 'Yatırımcı Ali', text: 'THYAO güzel trend gösteriyor. Teknik analiz açısından pozitif.', rating: 5, time: '2 saat önce' },
    { author: 'Trader Ayşe', text: 'Uzun pozisyon açmayı düşünüyorum.', rating: 4, time: '1 saat önce' },
    { author: 'Analist Mehmet', text: 'Destek seviyesine yaklaştı. Rebound bekliyorum.', rating: 4, time: '30 dakika önce' },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <Reveal>
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold">{symbol}</h1>
              <p className="text-gray-600 mt-2">{hisse.name}</p>
            </div>

            {/* Price Info */}
            <Reveal delayMs={100}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-600 text-sm">Güncel Fiyat</p>
                  <p className="text-3xl font-bold mt-2">{hisse.price} ₺</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-600 text-sm">Değişim</p>
                  <p className={`text-3xl font-bold mt-2 ${hisse.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {hisse.change >= 0 ? '+' : ''}{hisse.change.toFixed(2)} ₺
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-600 text-sm">Yüzde Değişim</p>
                  <p className={`text-3xl font-bold mt-2 ${hisse.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {hisse.changePercent >= 0 ? '+' : ''}{hisse.changePercent.toFixed(2)}%
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-600 text-sm">Hacim</p>
                  <p className="text-3xl font-bold mt-2">{hisse.volume}</p>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart */}
              <Reveal delayMs={200}>
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold mb-4">24 Saatlik Grafik</h2>
                  <div className="h-64 flex items-end justify-between gap-1">
                    {chartData.map((data, i) => {
                      const minPrice = Math.min(...chartData.map(d => d.price));
                      const maxPrice = Math.max(...chartData.map(d => d.price));
                      const range = maxPrice - minPrice || 1;
                      const height = ((data.price - minPrice) / range) * 100;
                      return (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t opacity-70 hover:opacity-100 transition"
                          style={{ height: `${height}%`, minHeight: '4px' }}
                          title={`${data.time}: ${data.price.toFixed(2)} ₺`}
                        />
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              {/* Trade Form */}
              <Reveal delayMs={300}>
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold mb-4">Alım-Satım</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">İşlem Tipi</label>
                      <div className="flex gap-2">
                        <button type="button" className="flex-1 py-2 px-3 rounded bg-blue-600 text-white font-medium">
                          Satın Al
                        </button>
                        <button type="button" className="flex-1 py-2 px-3 rounded bg-gray-100 text-gray-700 font-medium">
                          Sat
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Miktar</label>
                      <input type="number" placeholder="0.00" className="w-full border rounded px-3 py-2" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700">
                      Satın Al
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>

            {/* Details */}
            <Reveal delayMs={400}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold mb-4">Hisse Bilgileri</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Piyasa Değeri</span>
                      <span className="font-semibold">{hisse.marketCap}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">F/K Oranı</span>
                      <span className="font-semibold">{hisse.pe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Temettü Verimi</span>
                      <span className="font-semibold">%{hisse.dividend}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold mb-4">Açıklama</h2>
                  <p className="text-gray-700">{hisse.description}</p>
                </div>
              </div>
            </Reveal>

            {/* Comments */}
            <Reveal delayMs={500}>
              <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-6">En Güncel Yorumlar</h2>
                <div className="space-y-4">
                  {comments.map((comment, i) => (
                    <div key={i} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{comment.author}</h4>
                          <p className="text-xs text-gray-600">{comment.time}</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(comment.rating)].map((_, j) => (
                            <span key={j} className="text-yellow-400">★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </main>
    </>
  );
}
