'use client';

import { useState } from 'react';

interface TestResult {
  endpoint: string;
  method: string;
  status: number;
  response: any;
  timestamp: string;
}

export default function APITestPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (endpoint: string, method: string, status: number, response: any) => {
    setResults(prev => [{
      endpoint,
      method,
      status,
      response,
      timestamp: new Date().toLocaleTimeString('tr-TR'),
    }, ...prev]);
  };

  const testEndpoint = async (endpoint: string, method: string = 'GET', body?: any) => {
    try {
      setLoading(true);
      const options: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (body) options.body = JSON.stringify(body);

      const res = await fetch(`/api${endpoint}`, options);
      const data = await res.json();
      addResult(endpoint, method, res.status, data);
    } catch (error) {
      addResult(endpoint, method, 0, { error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold">API Test Paneli</h1>
        <p className="text-gray-600 mt-1">API endpoint'lerini test edin</p>
      </div>

      {/* Test Butonları */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Piyasa Verileri Testleri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button
            onClick={() => testEndpoint('/market-data')}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            Tüm Piyasa Verilerini Getir
          </button>
          <button
            onClick={() => testEndpoint('/market-data?symbol=AAPL')}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            AAPL Verilerini Getir
          </button>
          <button
            onClick={() => testEndpoint('/market-data', 'POST', {
              symbol: 'TEST',
              name: 'Test Company',
              price: 100.50,
              change: 2.5,
              changePercent: 2.5,
            })}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            Piyasa Verisi Ekle
          </button>
          <button
            onClick={() => testEndpoint('/market-data', 'PUT')}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:bg-gray-400"
          >
            Piyasa Verilerini Başlat
          </button>
        </div>
      </div>

      {/* Hesap Testleri */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Hesap Testleri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button
            onClick={() => testEndpoint('/account')}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            Hesap Bilgilerini Getir
          </button>
          <button
            onClick={() => testEndpoint('/account', 'POST')}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            Hesap Oluştur
          </button>
        </div>
      </div>

      {/* İşlem Testleri */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">İşlem Testleri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button
            onClick={() => testEndpoint('/transactions')}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            İşlem Geçmişini Getir
          </button>
          <button
            onClick={() => testEndpoint('/transactions', 'POST', {
              symbol: 'AAPL',
              type: 'BUY',
              quantity: 1,
              price: 150.25,
            })}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            İşlem Oluştur (BUY)
          </button>
        </div>
      </div>

      {/* Analiz Testleri */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Analiz Testleri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button
            onClick={() => testEndpoint('/portfolio-analysis')}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            Portföy Analizi Getir
          </button>
        </div>
      </div>

      {/* Admin Testleri */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Admin Testleri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button
            onClick={() => testEndpoint('/admin/users')}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            Kullanıcıları Listele
          </button>
          <button
            onClick={() => testEndpoint('/admin/stats')}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            İstatistikleri Getir
          </button>
        </div>
      </div>

      {/* Test Sonuçları */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Test Sonuçları ({results.length})</h2>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <p className="text-gray-600 text-center py-8">Henüz test yapılmadı</p>
          ) : (
            results.map((result, i) => (
              <div key={i} className={`border rounded p-4 ${
                result.status >= 200 && result.status < 300 ? 'border-green-300 bg-green-50' :
                result.status >= 400 ? 'border-red-300 bg-red-50' :
                'border-gray-300 bg-gray-50'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{result.method} {result.endpoint}</p>
                    <p className="text-sm text-gray-600">{result.timestamp}</p>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    result.status >= 200 && result.status < 300 ? 'bg-green-200 text-green-800' :
                    result.status >= 400 ? 'bg-red-200 text-red-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {result.status}
                  </span>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                  {JSON.stringify(result.response, null, 2)}
                </pre>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Notlar */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>⚠️ Not:</strong> Bu sayfa sadece geliştirme amaçlıdır. Üretim ortamında devre dışı bırakılmalıdır.
        </p>
      </div>
    </div>
  );
}
