'use client';

import { useState } from 'react';
import { DocumentIcon, TableCellsIcon, PrinterIcon } from '@heroicons/react/24/outline';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('monthly');

  const reports = [
    {
      id: 'monthly',
      title: 'Aylık Rapor',
      date: 'Kasım 2025',
      data: {
        revenue: 125000,
        expenses: 85000,
        profit: 40000,
        growth: 12.5,
      },
    },
    {
      id: 'quarterly',
      title: 'Üç Aylık Rapor',
      date: 'Q4 2025',
      data: {
        revenue: 385000,
        expenses: 245000,
        profit: 140000,
        growth: 15.3,
      },
    },
    {
      id: 'annual',
      title: 'Yıllık Rapor',
      date: '2025',
      data: {
        revenue: 1500000,
        expenses: 950000,
        profit: 550000,
        growth: 18.7,
      },
    },
  ];

  const currentReport = reports.find(r => r.id === selectedReport);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Raporlar</h1>
        <p className="text-gray-600 mt-1">Mali ve operasyonel raporlar</p>
      </div>

      {/* Rapor Seçimi */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Rapor Türü Seçin</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reports.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`p-4 rounded-lg border-2 transition ${
                selectedReport === report.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <p className="font-semibold">{report.title}</p>
              <p className="text-sm text-gray-600">{report.date}</p>
            </button>
          ))}
        </div>
      </div>

      {currentReport && (
        <>
          {/* Özet */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Gelir</p>
              <p className="text-3xl font-bold mt-2">${currentReport.data.revenue.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Giderler</p>
              <p className="text-3xl font-bold mt-2">${currentReport.data.expenses.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Kar</p>
              <p className="text-3xl font-bold text-green-600 mt-2">${currentReport.data.profit.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Büyüme</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">+{currentReport.data.growth}%</p>
            </div>
          </div>

          {/* Detaylı Rapor */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Detaylı Analiz</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Kar Marjı</span>
                  <span className="text-green-600 font-semibold">
                    {((currentReport.data.profit / currentReport.data.revenue) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(currentReport.data.profit / currentReport.data.revenue) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Gider Oranı</span>
                  <span className="text-orange-600 font-semibold">
                    {((currentReport.data.expenses / currentReport.data.revenue) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full"
                    style={{ width: `${(currentReport.data.expenses / currentReport.data.revenue) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* İndirme */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Raporu İndir</h2>
            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
                <DocumentIcon className="w-5 h-5" /> PDF İndir
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2">
                <TableCellsIcon className="w-5 h-5" /> Excel İndir
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center gap-2">
                <PrinterIcon className="w-5 h-5" /> Yazdır
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
