'use client';

import Header from '@/components/Header';
import Reveal from '@/components/Reveal';
import VideoCard from '@/components/VideoCard';
import { ChartBarIcon, ArrowTrendingUpIcon, FlagIcon } from '@heroicons/react/24/outline';

export default function AnalizPage() {
  const cards = [
    { 
      title: 'Teknik Analiz', 
      desc: 'Grafik formasyonları, destek-direnç seviyeleri, RSI, MACD ve Fibonacci analizleri ile piyasa trendlerini takip edin.',
      icon: ChartBarIcon,
      topics: ['Grafik Formasyonları', 'İndikatörler', 'Fibonacci Seviyeleri']
    },
    { 
      title: 'Temel Analiz', 
      desc: 'Şirket bilançoları, F/K oranları, sektör analizleri ve makroekonomik göstergeler ışığında yatırım fırsatlarını keşfedin.',
      icon: ArrowTrendingUpIcon,
      topics: ['Bilanço Analizi', 'Sektör Raporları', 'Makro Veriler']
    },
    { 
      title: 'Piyasa Stratejisi', 
      desc: 'Günlük, haftalık ve aylık piyasa görünümü, uzman yorumları ve risk yönetimi stratejileri.',
      icon: FlagIcon,
      topics: ['Günlük Bülten', 'Haftalık Görünüm', 'Risk Yönetimi']
    },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <Reveal>
          <h1 className="text-3xl font-bold">Analiz</h1>
          <p className="mt-2 text-[var(--text-light)]">Uzman görüşleri ve derinlemesine içerikler.</p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delayMs={i * 100}>
              <div className="lift rounded-lg bg-[var(--surface)] p-6 shadow-sm hover:shadow-md transition-shadow">
                <c.icon className="w-12 h-12 text-[var(--primary)] mb-4" />
                <h3 className="text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-light)]">{c.desc}</p>
                <div className="mt-4 space-y-2">
                  {c.topics.map((topic) => (
                    <div key={topic} className="flex items-center gap-2 text-xs text-[var(--text-light)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]"></span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
                <button className="glow mt-6 w-full rounded-md bg-[var(--primary)] px-4 py-2 text-white hover:bg-[var(--primary-dark)]">
                  Analizleri İncele
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Video + Bülten Bölümü */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sol taraf - Video */}
          <div className="lg:col-span-1">
            <Reveal delayMs={300}>
              <VideoCard
                src="/video3.mp4"
                title="Yeni Yatırımcılar İçin Rehber"
                description="Yatırıma başlayanlar için pratik ipuçları ve stratejiler"
              />
            </Reveal>
          </div>

          {/* Sağ taraf - Bülten */}
          <div className="lg:col-span-2">
            <Reveal delayMs={400}>
              <div className="h-full rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] p-8 text-white">
                <h2 className="text-2xl font-bold">Günlük Piyasa Bülteni</h2>
                <p className="mt-2 opacity-90">
                  Her gün saat 09:00'da uzman analistlerimizin hazırladığı piyasa bültenini email adresinize gönderelim.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <input 
                    type="email" 
                    placeholder="Email adresiniz" 
                    className="flex-1 rounded-md px-4 py-2 text-gray-900"
                  />
                  <button className="rounded-md bg-white px-6 py-2 font-medium text-[var(--primary)] hover:bg-gray-100">
                    Abone Ol
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
    </>
  );
}
