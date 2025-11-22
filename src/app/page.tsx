"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import type { Banner, News, Market } from "@/types";
import Reveal from "@/components/Reveal";
import BannerSlider from "@/components/BannerSlider";
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, NewspaperIcon, DevicePhoneMobileIcon, GlobeAltIcon, ComputerDesktopIcon, RocketLaunchIcon, BoltIcon } from "@heroicons/react/24/outline";

function MarketCard({ market }: { market: Market }) {
  const isPositive = market.change.startsWith("+");
  return (
    <div className="lift rounded-lg bg-[var(--surface)] p-5 shadow-sm transition hover:shadow-lg border border-[var(--border-color)]">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg">{market.symbol}</h3>
          <p className="text-xs text-[var(--text-light)] mt-1">
            Borsa İstanbul
          </p>
        </div>
        <div
          className={`px-2 py-1 rounded text-xs font-semibold ${
            isPositive
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
          }`}
        >
          {market.change}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div
          className={`text-2xl font-bold ${
            isPositive ? "text-[var(--success)]" : "text-[var(--error)]"
          }`}
        >
          {market.price}
        </div>
        <div className="text-xs text-[var(--text-light)]">
          {isPositive ? <ArrowTrendingUpIcon className="w-5 h-5" /> : <ArrowTrendingDownIcon className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );
}

function NewsCard({ news }: { news: News }) {
  return (
    <div className="lift rounded-lg bg-[var(--surface)] p-5 shadow-sm transition hover:shadow-lg border border-[var(--border-color)] h-full flex flex-col">
      <div className="flex items-start gap-3 mb-3">
        <NewspaperIcon className="w-6 h-6 text-[var(--primary)]" />
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{news.title}</h3>
        </div>
      </div>
      <p className="text-sm text-[var(--text-light)] mb-4 line-clamp-3 flex-1">
        {news.excerpt ?? ""}
      </p>
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
        <span className="text-xs text-[var(--text-light)]">
          {new Date(news.createdAt).toLocaleDateString("tr-TR")}
        </span>
        <a
          href={`/haberler/${news.id}`}
          className="text-xs text-[var(--primary)] hover:underline font-semibold"
        >
          Devamını Oku →
        </a>
      </div>
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
      fetch("/api/banners").then((res) => res.json()).catch(() => []),
      fetch("/api/news").then((res) => res.json()).catch(() => []),
      fetch("/api/bist/stocks?limit=9").then((res) => res.json()).catch(() => []),
    ])
      .then(([bannersData, newsData, stocksData]) => {
        setBanners(Array.isArray(bannersData) ? bannersData : []);
        setNews(Array.isArray(newsData) ? newsData : []);
        // BIST hisselerini Market formatına dönüştür
        const formattedMarkets = Array.isArray(stocksData) ? stocksData.map((stock: any) => ({
          id: stock.symbol,
          symbol: stock.symbol,
          price: stock.price + " ₺",
          change: stock.changePercent,
        })) : [];
        setMarkets(formattedMarkets);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container mx-auto mt-4 px-4">Yükleniyor...</div>;
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-green-50 via-white to-green-50 text-gray-900 py-16 md:py-24 relative overflow-hidden border-b border-green-200">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-600 rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600 rounded-full -ml-48 -mb-48"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <Reveal>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
                Borsa İstanbul'da Yatırım Yapın
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl leading-relaxed">
                Gerçek zamanlı BIST verileri, profesyonel analiz araçları ve
                güvenilir işlem platformu ile yatırımlarınızı yönetin.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/kayit"
                  className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg"
                >
                  Hesap Aç
                </a>
                <a
                  href="#"
                  className="inline-flex items-center px-8 py-3 border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-50 transition"
                >
                  Daha Fazla Bilgi
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Ana Slider - Borsa Görselleri */}
        <section className="py-6 md:py-8 container mx-auto px-4">
          <BannerSlider banners={banners} />
        </section>

        {/* Piyasa Verileri */}
        <section className="py-12 md:py-16 container mx-auto px-4 bg-white">
          <Reveal>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  BIST Hisse Senetleri
                </h2>
                <p className="text-gray-600">
                  Borsa İstanbul'dan gerçek zamanlı canlı veriler
                </p>
              </div>
              <a
                href="/borsa"
                className="text-green-700 hover:text-green-800 font-bold text-sm hidden md:block"
              >
                Tümünü Gör →
              </a>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((market, i) => (
              <Reveal key={market.id} delayMs={i * 80}>
                <MarketCard market={market} />
              </Reveal>
            ))}
          </div>
          <Reveal delayMs={400}>
            <div className="mt-8 rounded-lg bg-gradient-to-r from-green-50 to-green-100 p-5 text-center border border-green-200">
              <p className="text-sm text-green-800 font-medium">
                <BoltIcon className="w-4 h-4 inline" /> Veriler BIST'ten anlık olarak güncellenmektedir • Son
                güncelleme: {new Date().toLocaleTimeString("tr-TR")}
              </p>
            </div>
          </Reveal>
        </section>

        {/* Haberler - Borsa Haberleri */}
        <section className="py-12 md:py-16 bg-white border-y border-green-100">
          <div className="container mx-auto px-4">
            <Reveal>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">
                    Borsa Haberleri
                  </h2>
                  <p className="text-gray-600">
                    Piyasaları etkileyen önemli gelişmeler ve haberler
                  </p>
                </div>
                <a
                  href="/haberler"
                  className="text-green-700 hover:text-green-800 font-bold text-sm hidden md:block"
                >
                  Tüm Haberler →
                </a>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item, i) => (
                <Reveal key={item.id} delayMs={i * 80}>
                  <NewsCard news={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Video Bölümü */}
        <section className="py-12 md:py-16 bg-green-50 border-y border-green-200">
          <div className="container mx-auto px-4">
            <Reveal>
              <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold mb-3 text-gray-900">
                  Eğitim Videoları
                </h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  Borsa yatırım stratejileri ve teknik analiz hakkında
                  profesyonel video içerikleri
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Reveal delayMs={0}>
                <div className="rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition group">
                  <div className="relative bg-black aspect-video overflow-hidden">
                    <video
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      controls
                      poster="/video1.mp4"
                    >
                      <source src="/video1.mp4" type="video/mp4" />
                      Tarayıcınız video oynatmayı desteklemiyor.
                    </video>
                  </div>
                  <div className="p-6 bg-white border-t border-green-200">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">
                      Borsa Yatırım Stratejileri
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Başarılı yatırım stratejileri ve risk yönetimi hakkında
                      detaylı rehber
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delayMs={100}>
                <div className="rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition group">
                  <div className="relative bg-black aspect-video overflow-hidden">
                    <video
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      controls
                      poster="/video2.mp4"
                    >
                      <source src="/video2.mp4" type="video/mp4" />
                      Tarayıcınız video oynatmayı desteklemiyor.
                    </video>
                  </div>
                  <div className="p-6 bg-white border-t border-green-200">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">
                      Teknik Analiz Temel Kavramları
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Grafik analizi, göstergeler ve trend analizi hakkında
                      kapsamlı bilgiler
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition group">
                  <div className="relative bg-black aspect-video overflow-hidden">
                    <video
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      controls
                      poster="/video3.mp4"
                    >
                      <source src="/video3.mp4" type="video/mp4" />
                      Tarayıcınız video oynatmayı desteklemiyor.
                    </video>
                  </div>
                  <div className="p-6 bg-white border-t border-green-200">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">
                      Portföy Yönetimi ve Çeşitlendirme
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Portföy oluşturma, çeşitlendirme ve uzun vadeli yatırım
                      stratejileri
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Platformlar Bölümü */}
        <section className="py-12 md:py-16 bg-white border-y border-green-100">
          <div className="container mx-auto px-4">
            <Reveal>
              <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-3">
                  İşlem Platformları
                </h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  BIST'te yatırım yapmak için güçlü, güvenli ve kullanıcı dostu
                  profesyonel platformlar
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Reveal delayMs={0}>
                <div className="rounded-xl bg-white p-7 shadow-lg hover:shadow-2xl transition border border-gray-200 hover:border-green-300 group">
                  <div className="mb-4 group-hover:scale-110 transition">
                    <DevicePhoneMobileIcon className="w-12 h-12 text-[var(--primary)]" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900">
                    TradeMaster Mobile
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Mobil cihazınızdan yurt içi ve yurt dışı piyasalarda anlık
                    işlem yapın
                  </p>
                </div>
              </Reveal>
              <Reveal delayMs={100}>
                <div className="rounded-xl bg-white p-7 shadow-lg hover:shadow-2xl transition border border-gray-200 hover:border-green-300 group">
                  <div className="mb-4 group-hover:scale-110 transition">
                    <GlobeAltIcon className="w-12 h-12 text-[var(--primary)]" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900">
                    TradeMaster WEB
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Web tarayıcısından erişilebilen güvenli ve hızlı işlem
                    platformu
                  </p>
                </div>
              </Reveal>
              <Reveal delayMs={200}>
                <div className="rounded-xl bg-white p-7 shadow-lg hover:shadow-2xl transition border border-gray-200 hover:border-green-300 group">
                  <div className="mb-4 group-hover:scale-110 transition">
                    <ComputerDesktopIcon className="w-12 h-12 text-[var(--primary)]" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900">
                    TradeMaster Masaüstü
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Profesyonel masaüstü uygulaması ile gelişmiş analiz araçları
                  </p>
                </div>
              </Reveal>
              <Reveal delayMs={300}>
                <div className="rounded-xl bg-white p-7 shadow-lg hover:shadow-2xl transition border border-gray-200 hover:border-green-300 group">
                  <div className="mb-4 group-hover:scale-110 transition">
                    <RocketLaunchIcon className="w-12 h-12 text-[var(--primary)]" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900">
                    Herkese Borsa
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Dijital ve şubesiz deneyim ile avantajlı komisyon oranları
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA Bölümü */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 via-white to-green-50 text-gray-900 relative overflow-hidden border-t border-green-200">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-600 rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600 rounded-full -ml-48 -mb-48"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <Reveal>
              <h2 className="mb-6 text-5xl md:text-6xl font-bold leading-tight text-gray-900">
                Borsa İstanbul'da Yatırım Yapın
              </h2>
              <p className="mb-10 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Gerçek zamanlı BIST verileri, profesyonel analiz araçları ve
                güvenilir işlem platformu ile yatırımlarınızı yönetin.
              </p>
              <a
                href="/kayit"
                className="inline-flex items-center px-10 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-2xl text-lg"
              >
                Hesap Aç
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-white text-gray-700 py-16 border-t border-green-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded flex items-center justify-center text-white font-bold">
                  YP
                </div>
                <h3 className="font-bold text-gray-900 text-lg">YatırımPRO</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Borsa İstanbul'da yatırım yapmak için profesyonel araçlar ve
                güvenilir hizmetler sunan platform.
              </p>
            </div>
            <div>
              <h4 className="mb-5 font-bold text-gray-900 text-sm uppercase tracking-wide">
                Ürünler
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/altin"
                    className="text-gray-600 hover:text-green-700 transition font-medium"
                  >
                    Altın
                  </a>
                </li>
                <li>
                  <a
                    href="/borsa"
                    className="text-gray-600 hover:text-green-700 transition font-medium"
                  >
                    Borsa
                  </a>
                </li>
                <li>
                  <a
                    href="/doviz"
                    className="text-gray-600 hover:text-green-700 transition font-medium"
                  >
                    Döviz
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-700 transition font-medium"
                  >
                    Yatırım Fonları
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-5 font-bold text-gray-900 text-sm uppercase tracking-wide">
                Şirket
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-700 transition font-medium"
                  >
                    Hakkımızda
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-700 transition font-medium"
                  >
                    İletişim
                  </a>
                </li>
                <li>
                  <a
                    href="/haberler"
                    className="text-gray-600 hover:text-green-700 transition font-medium"
                  >
                    Haberler
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-700 transition font-medium"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-5 font-bold text-gray-900 text-sm uppercase tracking-wide">
                Yasal
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-700 transition font-medium"
                  >
                    Gizlilik Politikası
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-700 transition font-medium"
                  >
                    Kullanım Koşulları
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-700 transition font-medium"
                  >
                    Risk Uyarısı
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-700 transition font-medium"
                  >
                    Aydınlatma Metni
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-200 pt-8 text-center">
            <p className="text-gray-600 font-medium">
              &copy; {new Date().getFullYear()} YatırımPRO. Tüm hakları
              saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
