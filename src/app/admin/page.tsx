'use client';

import { useEffect, useState } from 'react';
import Reveal from '@/components/Reveal';

interface AdminStats {
  users?: { total: number; admins: number; regularUsers: number };
  accounts?: { total: number; totalBalance: number; totalInvested: number; totalReturns: number };
  transactions?: { total: number; buy: number; sell: number };
  market?: { activeSymbols: number };
  banners?: number;
  news?: number;
  markets?: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    users: { total: 0, admins: 0, regularUsers: 0 },
    accounts: { total: 0, totalBalance: 0, totalInvested: 0, totalReturns: 0 },
    transactions: { total: 0, buy: 0, sell: 0 },
    market: { activeSymbols: 0 },
    banners: 0,
    news: 0,
    markets: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/stats').then(r => r.json()).catch(() => ({})),
      fetch('/api/banners').then(r => r.json()).catch(() => []),
      fetch('/api/news').then(r => r.json()).catch(() => []),
      fetch('/api/markets').then(r => r.json()).catch(() => []),
    ]).then(([adminStats, b, n, m]) => {
      setStats({
        ...adminStats,
        banners: b.length,
        news: n.length,
        markets: m.length,
      });
    });
  }, []);

  const cards = [
    { title: 'Toplam Kullanıcı', count: stats.users?.total || 0, icon: '👥', href: '/admin/users', color: 'bg-blue-50 text-blue-600' },
    { title: 'Hesaplar', count: stats.accounts?.total || 0, icon: '💼', href: '/admin/accounts', color: 'bg-green-50 text-green-600' },
    { title: 'İşlemler', count: stats.transactions?.total || 0, icon: '📊', href: '/admin/transactions', color: 'bg-purple-50 text-purple-600' },
    { title: 'Aktif Semboller', count: stats.market?.activeSymbols || 0, icon: '📈', href: '/admin/markets', color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <Reveal>
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Sistem özetine hoş geldiniz</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <Reveal key={card.title} delayMs={i * 80}>
            <a
              href={card.href}
              className={`lift block rounded-lg p-6 shadow-sm transition hover:shadow-md ${card.color}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-80">{card.title}</p>
                  <p className="mt-2 text-3xl font-bold">{card.count}</p>
                </div>
                <div className="text-4xl">{card.icon}</div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delayMs={320}>
        <div className="rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] p-6 text-white shadow-md">
          <h2 className="text-xl font-bold">Hoş Geldiniz!</h2>
          <p className="mt-2 opacity-90">
            Sol menüden yönetmek istediğiniz bölümü seçebilirsiniz.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal delayMs={400}>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold">Hızlı İşlemler</h3>
            <div className="space-y-2">
              <a href="/admin/banners" className="block rounded p-3 hover:bg-gray-50">
                ➕ Yeni Banner Ekle
              </a>
              <a href="/admin/news" className="block rounded p-3 hover:bg-gray-50">
                ➕ Yeni Haber Ekle
              </a>
              <a href="/admin/markets" className="block rounded p-3 hover:bg-gray-50">
                ➕ Yeni Piyasa Verisi Ekle
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={480}>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold">Son Aktiviteler</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span>Sistem aktif ve çalışıyor</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <span>{stats.banners} banner yayında</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                <span>{stats.news} haber mevcut</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
