"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ChartBarIcon,
  DocumentTextIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  lastUpdate: string;
}

interface CalculatorData {
  buyDate: string;
  buyPrice: number;
  lots: number;
  sellDate: string;
  profitLoss: number;
  profitLossPercent: number;
}

export default function YatirimciIliskileriPage() {
  const [stockData, setStockData] = useState<StockData>({
    symbol: "YPRO",
    price: 42.5,
    change: 1.25,
    changePercent: 3.03,
    volume: 1250000,
    marketCap: 6375000000,
    lastUpdate: new Date().toLocaleString("tr-TR"),
  });

  const [calculator, setCalculator] = useState({
    buyDate: "",
    buyPrice: "",
    lots: "",
    sellDate: new Date().toISOString().split("T")[0],
  });

  const [calcResult, setCalcResult] = useState<CalculatorData | null>(null);

  useEffect(() => {
    // Simulate real-time stock data updates
    const fetchStockData = async () => {
      try {
        const response = await fetch("/api/investor-relations/stock");
        if (response.ok) {
          const data = await response.json();
          setStockData(data);
        }
      } catch (error) {
        console.log("Using default stock data");
      }
    };

    fetchStockData();
    // Update every 10 seconds
    const interval = setInterval(fetchStockData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleCalculate = () => {
    const buyPriceNum = parseFloat(calculator.buyPrice) || stockData.price;
    const lotsNum = parseInt(calculator.lots) || 0;
    const currentPrice = stockData.price;
    const buyValue = buyPriceNum * lotsNum * 100; // 1 lot = 100 hisse
    const currentValue = currentPrice * lotsNum * 100;
    const profitLoss = currentValue - buyValue;
    const profitLossPercent = (profitLoss / buyValue) * 100;

    setCalcResult({
      buyDate: calculator.buyDate,
      buyPrice: buyPriceNum,
      lots: lotsNum,
      sellDate: calculator.sellDate,
      profitLoss,
      profitLossPercent,
    });
  };

  const dividends = [
    {
      year: "2024",
      grossAmount: 2.5,
      netAmount: 2.125,
      paymentDate: "15.05.2024",
    },
    {
      year: "2023",
      grossAmount: 2.2,
      netAmount: 1.87,
      paymentDate: "18.05.2023",
    },
    {
      year: "2022",
      grossAmount: 1.8,
      netAmount: 1.53,
      paymentDate: "20.05.2022",
    },
    {
      year: "2021",
      grossAmount: 1.5,
      netAmount: 1.275,
      paymentDate: "15.05.2021",
    },
  ];

  const capitalIncreases = [
    {
      date: "2023",
      method: "Bedelli",
      ratio: "20%",
      oldCapital: "1.250.000.000 TL",
      newCapital: "1.500.000.000 TL",
    },
    {
      date: "2021",
      method: "Bedelsiz",
      ratio: "10%",
      oldCapital: "1.136.364.000 TL",
      newCapital: "1.250.000.000 TL",
    },
  ];

  const financialReports = [
    {
      period: "2024 9 Aylık",
      date: "15.11.2024",
      type: "Finansal Tablo",
      link: "#",
    },
    {
      period: "2024 6 Aylık",
      date: "15.08.2024",
      type: "Finansal Tablo",
      link: "#",
    },
    {
      period: "2024 3 Aylık",
      date: "15.05.2024",
      type: "Finansal Tablo",
      link: "#",
    },
    {
      period: "2023 Yıllık",
      date: "28.02.2024",
      type: "Faaliyet Raporu",
      link: "#",
    },
  ];

  const announcements = [
    {
      date: "22.11.2025",
      title: "Özel Durum Açıklaması - Genel Kurul Bilgilendirmesi",
      category: "Genel Kurul",
    },
    {
      date: "15.11.2025",
      title: "2024 9 Aylık Finansal Sonuçlar Açıklandı",
      category: "Finansal",
    },
    {
      date: "01.11.2025",
      title: "Yönetim Kurulu Kararları",
      category: "Yönetim",
    },
    {
      date: "15.10.2025",
      title: "Temettü Dağıtım Bilgilendirmesi",
      category: "Temettü",
    },
  ];

  const faqs = [
    {
      question: "YPRO hisseleri hangi endekslerde yer alıyor?",
      answer:
        "YPRO hisseleri BIST 100, BIST Sürdürülebilirlik ve BIST Finansal endekslerinde işlem görmektedir.",
    },
    {
      question: "Temettü ödemeleri ne zaman yapılır?",
      answer:
        "Temettü ödemeleri genellikle Genel Kurul kararını takiben Mayıs ayı içerisinde gerçekleştirilir.",
    },
    {
      question: "Hisse senedi alım-satım işlemlerini nasıl yapabilirim?",
      answer:
        "YPRO hisselerini herhangi bir aracı kurum üzerinden BIST'te YPRO kodu ile alıp satabilirsiniz.",
    },
    {
      question: "Finansal raporlara nereden ulaşabilirim?",
      answer:
        "Tüm finansal raporlar ve dipnotlar bu sayfada ve KAP (Kamuyu Aydınlatma Platformu) üzerinden erişilebilir.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-green-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-sm mb-6 text-green-100">
            <Link href="/" className="hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">Yatırımcı İlişkileri</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Yatırımcı İlişkileri
          </h1>
          <p className="text-xl text-green-100 max-w-4xl leading-relaxed mb-4">
            YPRO hisse senedi hakkında fiyat performansı, tarihsel fiyat
            bilgileri ve diğer tüm yatırımcı bilgileri
          </p>
          <p className="text-sm text-green-200">
            Canlı veri • Son güncelleme: {stockData.lastUpdate}
          </p>
        </div>
      </section>

      {/* Live Stock Data */}
      <section className="py-16 bg-gray-50 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-green-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-baseline mb-6">
                    <h2 className="text-4xl font-bold text-gray-900 mr-4">
                      {stockData.symbol}
                    </h2>
                    <span className="text-sm text-gray-600">
                      YatırımPRO Menkul Değerler
                    </span>
                  </div>
                  <div className="flex items-baseline mb-2">
                    <div className="text-5xl font-bold text-gray-900 mr-4">
                      ₺{stockData.price.toFixed(2)}
                    </div>
                    <div
                      className={`text-2xl font-bold ${
                        stockData.change >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stockData.change >= 0 ? "+" : ""}
                      {stockData.change.toFixed(2)} (
                      {stockData.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        stockData.change >= 0 ? "bg-green-500" : "bg-red-500"
                      } animate-pulse`}
                    ></div>
                    Canlı veri
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Hacim</span>
                    <span className="font-semibold text-gray-900">
                      {(stockData.volume / 1000000).toFixed(2)}M adet
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Piyasa Değeri</span>
                    <span className="font-semibold text-gray-900">
                      {(stockData.marketCap / 1000000000).toFixed(2)}M TL
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Sermaye</span>
                    <span className="font-semibold text-gray-900">
                      1.500.000.000 TL
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/stock/YPRO"
                  className="inline-flex items-center bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                >
                  <ChartBarIcon className="w-5 h-5 mr-2" />
                  Detaylı Grafik
                </Link>
                <a
                  href="https://www.kap.org.tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  <DocumentTextIcon className="w-5 h-5 mr-2" />
                  KAP Sayfası
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Return Calculator */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <ArrowTrendingUpIcon className="w-16 h-16 text-green-700 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Getiri Hesap Makinesi
              </h2>
              <p className="text-lg text-gray-700">
                YPRO hisse senedi yatırımınızın kar/zarar durumunu hesaplayın
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Alış Tarihi
                  </label>
                  <input
                    type="date"
                    value={calculator.buyDate}
                    onChange={(e) =>
                      setCalculator({ ...calculator, buyDate: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Alış Fiyatı (₺)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={calculator.buyPrice}
                    onChange={(e) =>
                      setCalculator({ ...calculator, buyPrice: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={`Örn: ${stockData.price.toFixed(2)}`}
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Fiyat girmezseniz, alış tarihindeki kapanış fiyatı
                    kullanılır
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Lot Miktarı
                  </label>
                  <input
                    type="number"
                    value={calculator.lots}
                    onChange={(e) =>
                      setCalculator({ ...calculator, lots: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Örn: 10"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    1 lot = 100 hisse
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Değerleme Tarihi
                  </label>
                  <input
                    type="date"
                    value={calculator.sellDate}
                    onChange={(e) =>
                      setCalculator({ ...calculator, sellDate: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-colors"
              >
                Hesapla
              </button>

              {calcResult && (
                <div className="mt-6 bg-white p-6 rounded-xl border-2 border-green-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Hesaplama Sonucu
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Alış Değeri
                      </div>
                      <div className="text-lg font-semibold">
                        ₺
                        {(
                          calcResult.buyPrice *
                          calcResult.lots *
                          100
                        ).toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Güncel Değer
                      </div>
                      <div className="text-lg font-semibold">
                        ₺
                        {(
                          stockData.price *
                          calcResult.lots *
                          100
                        ).toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="col-span-2 pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">
                        Kar/Zarar
                      </div>
                      <div
                        className={`text-3xl font-bold ${
                          calcResult.profitLoss >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {calcResult.profitLoss >= 0 ? "+" : ""}₺
                        {calcResult.profitLoss.toLocaleString("tr-TR", {
                          minimumFractionDigits: 2,
                        })}
                        <span className="text-xl ml-2">
                          ({calcResult.profitLossPercent >= 0 ? "+" : ""}
                          {calcResult.profitLossPercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Dividends */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-8">
              <BanknotesIcon className="w-10 h-10 text-green-700 mr-4" />
              <h2 className="text-4xl font-bold text-gray-900">
                Temettü Ödemeleri
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-green-700 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Yıl</th>
                      <th className="px-6 py-4 text-right font-semibold">
                        Brüt Tutar (₺)
                      </th>
                      <th className="px-6 py-4 text-right font-semibold">
                        Net Tutar (₺)
                      </th>
                      <th className="px-6 py-4 text-right font-semibold">
                        Ödeme Tarihi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dividends.map((div, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-green-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-semibold">{div.year}</td>
                        <td className="px-6 py-4 text-right">
                          ₺{div.grossAmount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          ₺{div.netAmount.toFixed(3)}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">
                          {div.paymentDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capital Increases */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-8">
              <ChartBarIcon className="w-10 h-10 text-green-700 mr-4" />
              <h2 className="text-4xl font-bold text-gray-900">
                Sermaye Artırımları
              </h2>
            </div>

            <div className="space-y-4">
              {capitalIncreases.map((capital, index) => (
                <div
                  key={index}
                  className="bg-green-50 p-6 rounded-xl border border-green-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl font-bold text-green-700 mr-3">
                          {capital.date}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            capital.method === "Bedelli"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {capital.method}
                        </span>
                        <span className="ml-3 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          {capital.ratio}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <div className="text-sm text-gray-600">
                            Eski Sermaye
                          </div>
                          <div className="font-semibold text-gray-900">
                            {capital.oldCapital}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">
                            Yeni Sermaye
                          </div>
                          <div className="font-semibold text-gray-900">
                            {capital.newCapital}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Financial Reports */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-8">
              <DocumentTextIcon className="w-10 h-10 text-green-700 mr-4" />
              <h2 className="text-4xl font-bold text-gray-900">
                Finansal Raporlar
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {financialReports.map((report, index) => (
                <a
                  key={index}
                  href={report.link}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group"
                >
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                      {report.period}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {report.date}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                        {report.type}
                      </span>
                    </div>
                  </div>
                  <svg
                    className="w-6 h-6 text-green-700 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold text-gray-900">
                Özel Durum Açıklamaları
              </h2>
              <a
                href="https://www.kap.org.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 hover:text-green-800 font-semibold"
              >
                Tümünü Gör →
              </a>
            </div>

            <div className="space-y-3">
              {announcements.map((announcement, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl hover:bg-green-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">
                        {announcement.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>{announcement.date}</span>
                        <span className="px-2 py-1 bg-white rounded text-xs font-semibold">
                          {announcement.category}
                        </span>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Sıkça Sorulan Sorular
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-start">
                    <span className="bg-green-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0 text-sm">
                      ?
                    </span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed pl-9">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Daha Fazla Bilgi</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Yatırımcı ilişkileri hakkında detaylı bilgi ve güncel duyurular için
            iletişime geçin
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:yatirimciiliskileri@yatirimpro.com"
              className="inline-flex items-center bg-white text-green-900 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              yatirimciiliskileri@yatirimpro.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
