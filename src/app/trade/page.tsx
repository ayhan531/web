'use client';

import { useEffect, useState } from 'react';

interface MarketData {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function TradePage() {
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [transactionType, setTransactionType] = useState<'BUY' | 'SELL'>('BUY');

  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    try {
      const res = await fetch('/api/market-data');
      if (!res.ok) throw new Error('Failed to fetch markets');
      const data = await res.json();
      setMarkets(data);
      if (data.length > 0) {
        setSelectedSymbol(data[0].symbol);
      }
    } catch (err) {
      console.error('Failed to fetch markets:', err);
      setMessage('Piyasa verileri yüklenemedi');
    }
  };

  const handleTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const selectedMarket = markets.find(m => m.symbol === selectedSymbol);
      if (!selectedMarket) throw new Error('Sembol bulunamadı');

      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: selectedSymbol,
          type: transactionType,
          quantity: parseFloat(quantity),
          price: selectedMarket.price,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'İşlem başarısız');
      }

      setMessage(`✓ ${transactionType === 'BUY' ? 'Satın alma' : 'Satış'} işlemi başarılı!`);
      setQuantity('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(`✗ ${err instanceof Error ? err.message : 'Bir hata oluştu'}`);
    } finally {
      setLoading(false);
    }
  };

  const selectedMarket = markets.find(m => m.symbol === selectedSymbol);
  const totalAmount = selectedMarket && quantity ? parseFloat(quantity) * selectedMarket.price : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">İşlem Yap</h1>
        <p className="text-gray-600 mt-1">Hisse satın alın veya satın</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* İşlem Formu */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">İşlem Yap</h2>

            <form onSubmit={handleTransaction} className="space-y-4">
              {/* İşlem Tipi */}
              <div>
                <label className="block text-sm font-medium mb-2">İşlem Tipi</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setTransactionType('BUY')}
                    className={`flex-1 py-2 px-3 rounded font-medium transition ${
                      transactionType === 'BUY'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Satın Al
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransactionType('SELL')}
                    className={`flex-1 py-2 px-3 rounded font-medium transition ${
                      transactionType === 'SELL'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Sat
                  </button>
                </div>
              </div>

              {/* Sembol Seçimi */}
              <div>
                <label className="block text-sm font-medium mb-2">Sembol</label>
                <select
                  value={selectedSymbol}
                  onChange={(e) => setSelectedSymbol(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  {markets.map((market) => (
                    <option key={market.symbol} value={market.symbol}>
                      {market.symbol} - {market.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fiyat Bilgisi */}
              {selectedMarket && (
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Güncel Fiyat</p>
                  <p className="text-2xl font-bold">${selectedMarket.price.toFixed(2)}</p>
                  <p className={`text-sm ${selectedMarket.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedMarket.change >= 0 ? '+' : ''}{selectedMarket.change.toFixed(2)} ({selectedMarket.changePercent.toFixed(2)}%)
                  </p>
                </div>
              )}

              {/* Miktar */}
              <div>
                <label className="block text-sm font-medium mb-2">Miktar</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0.00"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Toplam Tutar */}
              {totalAmount > 0 && (
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-sm text-gray-600">Toplam Tutar</p>
                  <p className="text-2xl font-bold text-blue-600">${totalAmount.toFixed(2)}</p>
                </div>
              )}

              {/* Mesaj */}
              {message && (
                <div className={`p-3 rounded text-sm ${message.startsWith('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {message}
                </div>
              )}

              {/* Gönder Butonu */}
              <button
                type="submit"
                disabled={loading || !selectedSymbol || !quantity}
                className={`w-full py-2 px-4 rounded font-medium text-white transition ${
                  transactionType === 'BUY'
                    ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400'
                    : 'bg-green-600 hover:bg-green-700 disabled:bg-gray-400'
                }`}
              >
                {loading ? 'İşleniyor...' : transactionType === 'BUY' ? 'Satın Al' : 'Sat'}
              </button>
            </form>
          </div>
        </div>

        {/* Piyasa Verileri */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Piyasa Verileri</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Sembol</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">İsim</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Fiyat</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Değişim</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">%</th>
                  </tr>
                </thead>
                <tbody>
                  {markets.map((market) => (
                    <tr
                      key={market.symbol}
                      onClick={() => setSelectedSymbol(market.symbol)}
                      className={`border-t cursor-pointer hover:bg-gray-50 ${
                        selectedSymbol === market.symbol ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="px-4 py-3 font-semibold">{market.symbol}</td>
                      <td className="px-4 py-3 text-sm">{market.name}</td>
                      <td className="px-4 py-3">${market.price.toFixed(2)}</td>
                      <td className={`px-4 py-3 ${market.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {market.change >= 0 ? '+' : ''}{market.change.toFixed(2)}
                      </td>
                      <td className={`px-4 py-3 font-semibold ${market.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {market.changePercent >= 0 ? '+' : ''}{market.changePercent.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
