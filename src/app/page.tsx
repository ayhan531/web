'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import type { Banner, News, Market } from '@/types';
import Reveal from '@/components/Reveal';
import BannerSlider from '@/components/BannerSlider';
import VideoCard from '@/components/VideoCard';

function MarketCard({ market }: { market: Market }) {
  const isPositive = market.change.startsWith('+');
  return (
    <div className="lift rounded-lg bg-[var(--surface)] p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{market.symbol}</h3>
        <div className={isPositive ? 'text-[var(--success)]' : 'text-[var(--error)]'}>
          {market.price}
          <span className="ml-2">{market.change}</span>
        </div>
      </div>
    </div>
  );
}

function NewsCard({ news }: { news: News }) {
  return (
    <div className="lift rounded-lg bg-[var(--surface)] p-4 shadow-sm transition hover:shadow-md">
      <h3 className="mb-2 font-semibold">{news.title}</h3>
      <p className="text-[var(--text-light)]">{news.excerpt ?? ''}</p>
      <div className="mt-4 text-sm text-[var(--text-light)]">
        {new Date(news.createdAt).toLocaleDateString('tr-TR')}
      </div>
    </div>
  );
}

function BannerSlide({ banner }: { banner: Banner }) {
  return (
    <div className="animate-fade-in glow rounded-lg bg-[var(--primary)] p-6 text-white shadow-md">
      <h2 className="mb-2 text-xl font-bold">{banner.title}</h2>
      <p>{banner.content ?? ''}</p>
    </div>
  );
}

export default function Home() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/banners').then(res => res.json()),
      fetch('/api/news').then(res => res.json()),
      fetch('/api/bist/stocks?limit=6').then(res => res.json())
    ]).then(([bannersData, newsData, stocksData]) => {
      setBanners(bannersData);
      setNews(newsData);
      // BIST hisselerini Market formatına dönüştür
      const formattedMarkets = stocksData.map((stock: any) => ({
        id: stock.symbol,
        symbol: stock.symbol,
        price: stock.price + ' ₺',
        change: stock.changePercent,
      }));
      setMarkets(formattedMarkets);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="container mx-auto mt-4 px-4">Yükleniyor...</div>;
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4">
        {/* Banner Bölümü */}
        <section className="py-6 md:py-8">
          <div className="bg-gradient-hero rounded-xl p-8 text-white shadow-md">
            <Reveal>
              <h1 className="mb-3 text-3xl font-bold">Güncel Piyasa Verileri ve Analizler</h1>
              <p className="opacity-90">Akıcı bir deneyim için profesyonel animasyonlar ve modern arayüz.</p>
            </Reveal>
          </div>
          <div className="mt-6">
            <BannerSlider banners={banners} />
          </div>
        </section>

        {/* Piyasa Özeti + Video 1 */}
        <section className="py-8 md:py-12">
          <Reveal>
            <h2 className="mb-6 text-2xl font-bold">Piyasa Özeti</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Sol taraf - Piyasa kartları */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {markets.map((market, i) => (
                  <Reveal key={market.id} delayMs={i * 80}>
                    <MarketCard market={market} />
                  </Reveal>
                ))}
              </div>
            </div>
            
            {/* Sağ taraf - Video 2 */}
            <div className="lg:col-span-1">
              <Reveal delayMs={100}>
                <VideoCard
                  src="/video2.mp4"
                  title="Teknik Analiz Kavramları"
                  description="Yatırımda başarı için teknik analiz temellerini öğrenin"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Video 1 + Güncel Haberler */}
        <section className="py-8 md:py-12">
          <Reveal>
            <h2 className="mb-6 text-2xl font-bold">Güncel Haberler</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Sol taraf - Video 1 */}
            <div className="lg:col-span-1">
              <Reveal delayMs={100}>
                <VideoCard
                  src="/video1.mp4"
                  title="2025 Yılında Türkiye Ekonomisi"
                  description="Türkiye ekonomisi ve piyasalar hakkında güncel analizler"
                />
              </Reveal>
            </div>
            
            {/* Sağ taraf - Haberler */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {news.map((item, i) => (
                  <Reveal key={item.id} delayMs={i * 80}>
                    <NewsCard news={item} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Eğitim Videosu - Video 3 */}
        <section className="py-8 md:py-12">
          <Reveal>
            <h2 className="mb-6 text-2xl font-bold">Yatırım Eğitimi</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-1">
              <Reveal>
                <VideoCard
                  src="/video3.mp4"
                  title="Yeni Yatırımcılar İçin Rehber"
                  description="Yatırıma başlayanlar için pratik ipuçları ve stratejiler"
                />
              </Reveal>
            </div>
            <div className="md:col-span-1 lg:col-span-2">
              <Reveal delayMs={100}>
                <div className="lift rounded-lg bg-[var(--surface)] p-6 shadow-sm">
                  <h3 className="mb-4 text-xl font-semibold">Neden Eğitim Önemli?</h3>
                  <ul className="space-y-3 text-[var(--text-light)]">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--primary)]">✓</span>
                      <span>Bilinçli yatırım kararları almanıza yardımcı olur</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--primary)]">✓</span>
                      <span>Risk yönetimi becerilerinizi geliştirir</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--primary)]">✓</span>
                      <span>Piyasa trendlerini daha iyi analiz edebilirsiniz</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--primary)]">✓</span>
                      <span>Uzun vadeli başarı için sağlam temeller oluşturur</span>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA Bölümü */}
        <section className="py-12 text-center">
          <Reveal>
            <h2 className="mb-4 text-3xl font-bold">Yatırım Yolculuğunuza Başlayın</h2>
            <p className="mb-8 text-[var(--text-light)]">
              Profesyonel araçlar ve güncel piyasa analizleriyle yatırımlarınızı yönetin.
            </p>
            <a
              href="/kayit"
              className="glow inline-flex items-center rounded-md bg-[var(--primary)] px-6 py-3 font-medium text-white shadow-sm transition hover:bg-[var(--primary-dark)]"
            >
              Hemen Başla
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="mt-12 bg-[var(--surface)] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 font-bold">YatırımPRO</h3>
              <p className="text-[var(--text-light)]">
                Türkiye'nin öncü yatırım ve finans platformu.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Piyasalar</h4>
              <ul className="space-y-2">
                <li><a href="/doviz" className="text-[var(--text-light)] hover:text-[var(--primary)]">Döviz</a></li>
                <li><a href="/altin" className="text-[var(--text-light)] hover:text-[var(--primary)]">Altın</a></li>
                <li><a href="/borsa" className="text-[var(--text-light)] hover:text-[var(--primary)]">Borsa</a></li>
                <li><a href="/kripto" className="text-[var(--text-light)] hover:text-[var(--primary)]">Kripto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Şirket</h4>
              <ul className="space-y-2">
                <li><a href="/hakkimizda" className="text-[var(--text-light)] hover:text-[var(--primary)]">Hakkımızda</a></li>
                <li><a href="/iletisim" className="text-[var(--text-light)] hover:text-[var(--primary)]">İletişim</a></li>
                <li><a href="/blog" className="text-[var(--text-light)] hover:text-[var(--primary)]">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Yasal</h4>
              <ul className="space-y-2">
                <li><a href="/gizlilik" className="text-[var(--text-light)] hover:text-[var(--primary)]">Gizlilik Politikası</a></li>
                <li><a href="/kosullar" className="text-[var(--text-light)] hover:text-[var(--primary)]">Kullanım Koşulları</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-[var(--border-color)] pt-8 text-center text-[var(--text-light)]">
            <p>&copy; {new Date().getFullYear()} YatırımPRO. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
