'use client';

import { useEffect, useState } from 'react';

interface AnalysisData {
  summary: {
    totalBalance: number;
    totalPortfolioValue: number;
    totalInvested: number;
    totalGainLoss: number;
    gainLossPercent: number;
    totalReturns: number;
  };
  allocation: Array<{
    symbol: string;
    value: number;
    percentage: number;
  }>;
  performance: {
    bestPerformer: {
      symbol: string;
      gainLossPercent: number;
      gainLoss: number;
    } | null;
    worstPerformer: {
      symbol: string;
      gainLossPercent: number;
      gainLoss: number;
    } | null;
  };
  transactions: {
    total: number;
    buy: number;
    sell: number;
    avgValue: number;
  };
  diversification: {
    holdingCount: number;
    concentration: number;
  };
}

export default function PortfolioAnalysisPage() {
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const res = await fetch('/api/portfolio-analysis');
      if (!res.ok) throw new Error('Failed to fetch analysis');
      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      setError('Analiz yüklenemedi');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  if (error || !analysis) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  const { summary, allocation, performance, transactions, diversification } = analysis;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Portföy Analizi</h1>
        <p className="text-gray-600 mt-1">Detaylı portföy analizi ve performans metrikleri</p>
      </div>

      {/* Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Toplam Portföy Değeri</p>
          <p className="text-3xl font-bold mt-2">${summary.totalPortfolioValue.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-2">Bakiye: ${summary.totalBalance.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Toplam Yatırım</p>
          <p className="text-3xl font-bold mt-2">${summary.totalInvested.toFixed(2)}</p>
          <p className={`text-sm mt-2 ${summary.gainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {summary.gainLossPercent >= 0 ? '+' : ''}{summary.gainLossPercent.toFixed(2)}%
          </p>
        </div>
        <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${summary.totalGainLoss >= 0 ? 'border-green-500' : 'border-red-500'}`}>
          <p className="text-gray-600 text-sm">Kazanç/Kayıp</p>
          <p className={`text-3xl font-bold mt-2 ${summary.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${summary.totalGainLoss.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Toplam Getiri: ${summary.totalReturns.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portföy Dağılımı */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Portföy Dağılımı</h2>
          {allocation.length === 0 ? (
            <p className="text-gray-600 text-center py-8">Henüz hisse satın almadınız</p>
          ) : (
            <div className="space-y-3">
              {allocation.map((item) => (
                <div key={item.symbol}>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">{item.symbol}</span>
                    <span className="text-sm text-gray-600">${item.value.toFixed(2)} ({item.percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Performans */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Performans</h2>
          <div className="space-y-4">
            {performance.bestPerformer && (
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <p className="text-sm text-gray-600">En İyi Performans</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{performance.bestPerformer.symbol}</p>
                <p className="text-sm text-green-700 mt-2">
                  +{performance.bestPerformer.gainLossPercent.toFixed(2)}% (${performance.bestPerformer.gainLoss.toFixed(2)})
                </p>
              </div>
            )}
            {performance.worstPerformer && (
              <div className="bg-red-50 p-4 rounded border border-red-200">
                <p className="text-sm text-gray-600">En Kötü Performans</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{performance.worstPerformer.symbol}</p>
                <p className="text-sm text-red-700 mt-2">
                  {performance.worstPerformer.gainLossPercent.toFixed(2)}% (${performance.worstPerformer.gainLoss.toFixed(2)})
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* İşlem İstatistikleri */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">İşlem İstatistikleri</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Toplam İşlem</span>
              <span className="font-semibold">{transactions.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Satın Alma</span>
              <span className="font-semibold text-blue-600">{transactions.buy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Satış</span>
              <span className="font-semibold text-green-600">{transactions.sell}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="text-gray-600">Ortalama İşlem Değeri</span>
              <span className="font-semibold">${transactions.avgValue.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Çeşitlendirme */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Çeşitlendirme</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Holding Sayısı</span>
              <span className="font-semibold">{diversification.holdingCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Yoğunlaşma Oranı</span>
              <span className="font-semibold">{diversification.concentration.toFixed(1)}%</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Çeşitlendirme Durumu</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    diversification.concentration > 50 ? 'bg-red-500' : 
                    diversification.concentration > 30 ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(diversification.concentration, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {diversification.concentration > 50 ? '⚠️ Düşük çeşitlendirme' : 
                 diversification.concentration > 30 ? '⚠️ Orta çeşitlendirme' : 
                 '✓ İyi çeşitlendirme'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
