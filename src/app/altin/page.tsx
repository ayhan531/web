'use client';

import Header from '@/components/Header';
import Reveal from '@/components/Reveal';

export default function AltinPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <Reveal>
          <h1 className="text-3xl font-bold">Altın Fiyatları</h1>
          <p className="mt-2 text-[var(--text-light)]">Güncel altın fiyatları ve piyasadan öne çıkanlar.</p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Gram Altın", price: "2.847,50 ₺", change: "+2.3%", positive: true },
            { name: "Çeyrek Altın", price: "4.685,00 ₺", change: "+2.1%", positive: true },
            { name: "Yarım Altın", price: "9.320,00 ₺", change: "+2.2%", positive: true },
            { name: "Tam Altın", price: "18.650,00 ₺", change: "+2.3%", positive: true },
            { name: "Cumhuriyet Altını", price: "19.120,00 ₺", change: "+1.9%", positive: true },
            { name: "Ons Altın (USD)", price: "2.048,50 $", change: "+1.5%", positive: true },
          ].map((item, i) => (
            <Reveal key={item.name} delayMs={i * 80}>
              <div className="lift rounded-lg bg-[var(--surface)] p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="mt-1 text-sm text-[var(--text-light)]">Alış fiyatı</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${item.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.change}
                  </span>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <span className="text-2xl font-bold">{item.price}</span>
                  <button className="glow rounded-md bg-[var(--primary)] px-3 py-2 text-sm text-white hover:bg-[var(--primary-dark)]">
                    İşlem Yap
                  </button>
                </div>
                <div className="mt-3 text-xs text-[var(--text-light)]">
                  Son güncelleme: {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </main>
    </>
  );
}
