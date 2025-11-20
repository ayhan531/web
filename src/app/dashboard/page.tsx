'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Account {
  id: number;
  balance: number;
  totalInvested: number;
  totalReturns: number;
  portfolio: Array<{
    id: number;
    symbol: string;
    quantity: number;
    currentPrice: number;
    totalValue: number;
    gainLoss: number;
    gainLossPercent: number;
  }>;
  transactions: Array<{
    id: number;
    symbol: string;
    type: string;
    quantity: number;
    price: number;
    totalAmount: number;
    createdAt: string;
  }>;
}

export default function Dashboard() {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    try {
      const res = await fetch('/api/account');
      if (!res.ok) throw new Error('Failed to fetch account');
      const data = await res.json();
      setAccount(data);
    } catch (err) {
      setError('Hesap bilgileri yüklenemedi');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  if (!account) {
    return (
      <div className="text-center py-12">
        <p className="mb-4">Henüz bir hesabınız yok</p>
        <button
          onClick={async () => {
            const res = await fetch('/api/account', { method: 'POST' });
            if (res.ok) fetchAccount();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Hesap Oluştur
        </button>
      </div>
    );
  }

  const totalPortfolioValue = account.portfolio.reduce((sum, p) => sum + p.totalValue, 0);
  const totalGainLoss = account.portfolio.reduce((sum, p) => sum + p.gainLoss, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-1">Yatırım portföyünüzü yönetin</p>
      </div>

      {/* Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Kullanılabilir Bakiye</p>
          <p className="text-2xl font-bold mt-2">${account.balance.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Portföy Değeri</p>
          <p className="text-2xl font-bold mt-2">${totalPortfolioValue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Toplam Yatırım</p>
          <p className="text-2xl font-bold mt-2">${account.totalInvested.toFixed(2)}</p>
        </div>
        <div className={`bg-white rounded-lg shadow p-6 ${totalGainLoss >= 0 ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
          <p className="text-gray-600 text-sm">Kazanç/Kayıp</p>
          <p className={`text-2xl font-bold mt-2 ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${totalGainLoss.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Portföy */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Portföyüm</h2>
          <Link href="/trade" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            İşlem Yap
          </Link>
        </div>

        {account.portfolio.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Henüz hisse satın almadınız</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Sembol</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Miktar</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Fiyat</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Toplam Değer</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Kazanç/Kayıp</th>
                </tr>
              </thead>
              <tbody>
                {account.portfolio.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">{item.symbol}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3">${item.currentPrice.toFixed(2)}</td>
                    <td className="px-4 py-3">${item.totalValue.toFixed(2)}</td>
                    <td className={`px-4 py-3 font-semibold ${item.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${item.gainLoss.toFixed(2)} ({item.gainLossPercent.toFixed(2)}%)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Son İşlemler */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Son İşlemler</h2>

        {account.transactions.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Henüz işlem yapılmamış</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Tarih</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Sembol</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Tür</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Miktar</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Fiyat</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Toplam</th>
                </tr>
              </thead>
              <tbody>
                {account.transactions.map((tx) => (
                  <tr key={tx.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{new Date(tx.createdAt).toLocaleDateString('tr-TR')}</td>
                    <td className="px-4 py-3 font-semibold">{tx.symbol}</td>
                    <td className={`px-4 py-3 font-semibold ${tx.type === 'BUY' ? 'text-blue-600' : 'text-green-600'}`}>
                      {tx.type === 'BUY' ? 'Satın Al' : 'Sat'}
                    </td>
                    <td className="px-4 py-3">{tx.quantity}</td>
                    <td className="px-4 py-3">${tx.price.toFixed(2)}</td>
                    <td className="px-4 py-3">${tx.totalAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
