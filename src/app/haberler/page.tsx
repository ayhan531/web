'use client';

import Header from '@/components/Header';
import Reveal from '@/components/Reveal';
import { 
  CurrencyDollarIcon, 
  TrophyIcon, 
  ArrowTrendingUpIcon, 
  BuildingLibraryIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

export default function HaberlerPage() {
  const items = [
    {
      id: 1,
      title: 'TCMB Faiz Kararı Piyasaları Nasıl Etkiledi?',
      excerpt: 'Merkez Bankası\'nın faiz kararı sonrası dolar/TL kurunda hareketlilik yaşandı. Uzmanlar önümüzdeki dönem için değerlendirmelerini paylaştı.',
      date: '6 Kasım 2024',
      category: 'Ekonomi',
      icon: CurrencyDollarIcon
    },
    {
      id: 2,
      title: 'Altın Fiyatları Rekor Kırdı: Gram Altın 2.800 TL\'yi Aştı',
      excerpt: 'Küresel piyasalardaki belirsizlikler ve güvenli liman arayışı gram altın fiyatlarını tarihi zirveye taşıdı.',
      date: '6 Kasım 2024',
      category: 'Altın',
      icon: TrophyIcon
    },
    {
      id: 3,
      title: 'BIST 100 Endeksi 10.000 Puanı Test Ediyor',
      excerpt: 'Borsa İstanbul\'da yükseliş trendi devam ediyor. Bankacılık ve holding hisseleri endeksi yukarı taşıyor.',
      date: '5 Kasım 2024',
      category: 'Borsa',
      icon: ArrowTrendingUpIcon
    },
    {
      id: 4,
      title: 'Kripto Para Piyasalarında Hareketli Günler',
      excerpt: 'Bitcoin 70.000 dolar direncini test ederken, Ethereum\'da da yükseliş beklentileri artıyor.',
      date: '5 Kasım 2024',
      category: 'Kripto',
      icon: ChartBarIcon
    },
    {
      id: 5,
      title: 'Döviz Tevdiat Hesaplarında Yeni Düzenleme',
      excerpt: 'BDDK\'nın yeni kararı ile döviz tevdiat hesaplarında faiz oranları güncellendi.',
      date: '4 Kasım 2024',
      category: 'Bankacılık',
      icon: BuildingLibraryIcon
    },
    {
      id: 6,
      title: 'Enflasyon Verileri Açıklandı: Yıllık %65.5',
      excerpt: 'TÜİK\'in kasım ayı enflasyon rakamları beklentilerin üzerinde geldi. Gıda ve enerji fiyatları öne çıktı.',
      date: '4 Kasım 2024',
      category: 'Ekonomi',
      icon: ChartBarIcon
    },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <Reveal>
          <h1 className="text-3xl font-bold">Haberler</h1>
          <p className="mt-2 text-[var(--text-light)]">Güncel finans ve ekonomi haberleri.</p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((n, i) => (
            <Reveal key={n.id} delayMs={i * 80}>
              <article className="lift rounded-lg bg-[var(--surface)] p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <n.icon className="w-10 h-10 text-[var(--primary)] flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-[var(--primary)] bg-opacity-10 px-2 py-1 text-xs font-medium text-[var(--primary)]">
                        {n.category}
                      </span>
                      <span className="text-xs text-[var(--text-light)]">{n.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold hover:text-[var(--primary)] transition-colors">
                      {n.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-light)]">{n.excerpt}</p>
                    <button className="mt-4 text-sm font-medium text-[var(--primary)] hover:underline">
                      Devamını Oku →
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </main>
    </>
  );
}
