'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Reveal from '@/components/Reveal';

export default function HaberDetayPage() {
  const params = useParams();
  const id = params.id as string;

  // Mock veri
  const haber = {
    id: parseInt(id) || 1,
    title: 'TCMB Faiz Kararı Piyasaları Nasıl Etkiledi?',
    excerpt: 'Merkez Bankası\'nın faiz kararı sonrası dolar/TL kurunda hareketlilik yaşandı.',
    content: `
      Türkiye Cumhuriyet Merkez Bankası (TCMB) tarafından açıklanan faiz kararı piyasalarda beklentileri aştı. 
      
      Merkez Bankası Başkanı, para politikasının sıkı tutulacağını ve enflasyonla mücadelenin devam edeceğini belirtti.
      
      Bu karar sonrasında:
      - Dolar/TL kuru 2% düştü
      - Borsa İstanbul 1.5% yükselişe geçti
      - Hazine tahvilleri güçlü talep gördü
      
      Analistler, bu kararın uzun vadeli ekonomik istikrar için olumlu olduğunu değerlendiriyor.
    `,
    author: 'Ekonomi Editörü',
    date: '6 Kasım 2024',
    category: 'Ekonomi',
    image: '💰',
    views: 1250,
    comments: 45,
  };

  const relatedNews = [
    { id: 2, title: 'Altın Fiyatları Rekor Kırdı', date: '6 Kasım 2024', icon: '🥇' },
    { id: 3, title: 'BIST 100 Endeksi 10.000 Puanı Test Ediyor', date: '5 Kasım 2024', icon: '📈' },
    { id: 4, title: 'Kripto Para Piyasalarında Hareketli Günler', date: '5 Kasım 2024', icon: '₿' },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <Reveal>
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-4xl">{haber.image}</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {haber.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{haber.title}</h1>
              <div className="flex items-center justify-between text-gray-600 border-b pb-4">
                <div>
                  <p className="font-medium">{haber.author}</p>
                  <p className="text-sm">{haber.date}</p>
                </div>
                <div className="flex gap-4 text-sm">
                  <span>👁️ {haber.views} görüntüleme</span>
                  <span>💬 {haber.comments} yorum</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <Reveal delayMs={100}>
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {haber.content}
                </p>
              </div>
            </Reveal>

            {/* Actions */}
            <Reveal delayMs={200}>
              <div className="flex gap-4 mb-12 pb-12 border-b">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                  👍 Beğen
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition">
                  🔗 Paylaş
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition">
                  🔖 Kaydet
                </button>
              </div>
            </Reveal>

            {/* Related News */}
            <Reveal delayMs={300}>
              <div>
                <h2 className="text-2xl font-bold mb-6">İlgili Haberler</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedNews.map((news) => (
                    <div
                      key={news.id}
                      className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                    >
                      <div className="text-3xl mb-2">{news.icon}</div>
                      <h3 className="font-semibold mb-2 line-clamp-2">{news.title}</h3>
                      <p className="text-xs text-gray-600">{news.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Comments Section */}
            <Reveal delayMs={400}>
              <div className="mt-12 pt-12 border-t">
                <h2 className="text-2xl font-bold mb-6">Yorumlar</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                        👤
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Yatırımcı Ali</p>
                        <p className="text-sm text-gray-600 mb-2">2 saat önce</p>
                        <p className="text-gray-700">
                          Çok iyi bir analiz. TCMB'nin bu adımı ekonomi için olumlu olacak.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                        👤
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Trader Ayşe</p>
                        <p className="text-sm text-gray-600 mb-2">1 saat önce</p>
                        <p className="text-gray-700">
                          Piyasanın tepkisi beklentilerin üstünde oldu. Pozitif bir sinyal.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comment Form */}
                <div className="mt-6 p-4 rounded-lg bg-blue-50">
                  <h3 className="font-semibold mb-3">Yorum Yaz</h3>
                  <textarea
                    placeholder="Düşüncelerinizi paylaşın..."
                    className="w-full p-3 rounded border border-blue-200 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={4}
                  />
                  <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                    Yorum Gönder
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </main>
    </>
  );
}
