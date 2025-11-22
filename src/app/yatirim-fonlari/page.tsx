"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

interface Fund {
  id: string;
  code: string;
  name: string;
  type: string;
  price: string;
  change: string;
  dailyReturn: string;
  weeklyReturn: string;
  monthlyReturn: string;
  yearlyReturn: string;
  totalValue: string;
  investors: number;
  risk: "Düşük" | "Orta" | "Yüksek";
}

export default function YatirimFonlariPage() {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("Tümü");
  const [selectedRisk, setSelectedRisk] = useState<string>("Tümü");
  const [sortBy, setSortBy] = useState<string>("dailyReturn");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const fundTypes = [
    "Tümü",
    "Hisse Senedi Fonu",
    "Tahvil Bono Fonu",
    "Likit Fon",
    "Karma Fon",
    "Altın Fonu",
    "Serbest Fon",
    "Yabancı Fon",
  ];

  const riskLevels = ["Tümü", "Düşük", "Orta", "Yüksek"];

  useEffect(() => {
    // Mock data - gerçek API ile değiştirilebilir
    const mockFunds: Fund[] = [
      {
        id: "1",
        code: "AFT",
        name: "Ak Portföy Hisse Senedi Fonu",
        type: "Hisse Senedi Fonu",
        price: "0.245678",
        change: "+2.45",
        dailyReturn: "+2.45",
        weeklyReturn: "+5.23",
        monthlyReturn: "+12.34",
        yearlyReturn: "+45.67",
        totalValue: "1.2 Milyar ₺",
        investors: 15420,
        risk: "Yüksek",
      },
      {
        id: "2",
        code: "AHD",
        name: "Ak Portföy Tahvil ve Bono Fonu",
        type: "Tahvil Bono Fonu",
        price: "0.156234",
        change: "+0.85",
        dailyReturn: "+0.85",
        weeklyReturn: "+1.45",
        monthlyReturn: "+3.21",
        yearlyReturn: "+18.45",
        totalValue: "850 Milyon ₺",
        investors: 8920,
        risk: "Düşük",
      },
      {
        id: "3",
        code: "AGD",
        name: "Ak Portföy Kısa Vadeli Tahvil Bono Fonu",
        type: "Likit Fon",
        price: "0.089456",
        change: "+0.45",
        dailyReturn: "+0.45",
        weeklyReturn: "+0.89",
        monthlyReturn: "+2.15",
        yearlyReturn: "+12.34",
        totalValue: "2.1 Milyar ₺",
        investors: 24560,
        risk: "Düşük",
      },
      {
        id: "4",
        code: "AKD",
        name: "Ak Portföy Karma Fonu",
        type: "Karma Fon",
        price: "0.178923",
        change: "+1.56",
        dailyReturn: "+1.56",
        weeklyReturn: "+3.45",
        monthlyReturn: "+7.89",
        yearlyReturn: "+28.56",
        totalValue: "650 Milyon ₺",
        investors: 6780,
        risk: "Orta",
      },
      {
        id: "5",
        code: "ALA",
        name: "Ak Portföy Altın Fonu",
        type: "Altın Fonu",
        price: "0.234567",
        change: "+3.12",
        dailyReturn: "+3.12",
        weeklyReturn: "+6.78",
        monthlyReturn: "+15.23",
        yearlyReturn: "+52.34",
        totalValue: "480 Milyon ₺",
        investors: 12340,
        risk: "Orta",
      },
      {
        id: "6",
        code: "GSF",
        name: "Garanti Portföy Serbest Fon",
        type: "Serbest Fon",
        price: "0.198765",
        change: "+1.89",
        dailyReturn: "+1.89",
        weeklyReturn: "+4.12",
        monthlyReturn: "+9.45",
        yearlyReturn: "+32.67",
        totalValue: "1.5 Milyar ₺",
        investors: 18920,
        risk: "Yüksek",
      },
      {
        id: "7",
        code: "IHF",
        name: "İş Portföy Hisse Senedi Fonu",
        type: "Hisse Senedi Fonu",
        price: "0.267890",
        change: "+2.78",
        dailyReturn: "+2.78",
        weeklyReturn: "+5.89",
        monthlyReturn: "+13.45",
        yearlyReturn: "+48.90",
        totalValue: "980 Milyon ₺",
        investors: 11230,
        risk: "Yüksek",
      },
      {
        id: "8",
        code: "YDF",
        name: "Yapı Kredi Portföy Yabancı Fon",
        type: "Yabancı Fon",
        price: "0.145678",
        change: "+1.23",
        dailyReturn: "+1.23",
        weeklyReturn: "+2.67",
        monthlyReturn: "+6.12",
        yearlyReturn: "+22.34",
        totalValue: "720 Milyon ₺",
        investors: 9450,
        risk: "Orta",
      },
    ];

    setFunds(mockFunds);
    setFilteredFunds(mockFunds);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = [...funds];

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(
        (fund) =>
          fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fund.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tip filtresi
    if (selectedType !== "Tümü") {
      filtered = filtered.filter((fund) => fund.type === selectedType);
    }

    // Risk filtresi
    if (selectedRisk !== "Tümü") {
      filtered = filtered.filter((fund) => fund.risk === selectedRisk);
    }

    // Sıralama
    filtered.sort((a, b) => {
      let aValue: number, bValue: number;

      switch (sortBy) {
        case "dailyReturn":
          aValue = parseFloat(a.dailyReturn);
          bValue = parseFloat(b.dailyReturn);
          break;
        case "weeklyReturn":
          aValue = parseFloat(a.weeklyReturn);
          bValue = parseFloat(b.weeklyReturn);
          break;
        case "monthlyReturn":
          aValue = parseFloat(a.monthlyReturn);
          bValue = parseFloat(b.monthlyReturn);
          break;
        case "yearlyReturn":
          aValue = parseFloat(a.yearlyReturn);
          bValue = parseFloat(b.yearlyReturn);
          break;
        default:
          aValue = parseFloat(a.dailyReturn);
          bValue = parseFloat(b.dailyReturn);
      }

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

    setFilteredFunds(filtered);
  }, [searchTerm, selectedType, selectedRisk, sortBy, sortOrder, funds]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Hisse Senedi Fonu":
        return <ChartBarIcon className="w-5 h-5" />;
      case "Tahvil Bono Fonu":
        return <BanknotesIcon className="w-5 h-5" />;
      case "Likit Fon":
        return <BanknotesIcon className="w-5 h-5" />;
      case "Karma Fon":
        return <ChartBarIcon className="w-5 h-5" />;
      case "Altın Fonu":
        return <BanknotesIcon className="w-5 h-5" />;
      case "Serbest Fon":
        return <ChartBarIcon className="w-5 h-5" />;
      case "Yabancı Fon":
        return <GlobeAltIcon className="w-5 h-5" />;
      default:
        return <BuildingLibraryIcon className="w-5 h-5" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Düşük":
        return "text-green-600 bg-green-50";
      case "Orta":
        return "text-yellow-600 bg-yellow-50";
      case "Yüksek":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Yükleniyor...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-white py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Yatırım Fonları
              </h1>
              <p className="text-lg text-gray-600">
                Profesyonel yöneticiler tarafından yönetilen yatırım fonlarıyla
                portföyünüzü çeşitlendirin
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Filtreler */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Arama */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Fon ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Tip Filtresi */}
              <div className="relative">
                <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                >
                  {fundTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Risk Filtresi */}
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {riskLevels.map((risk) => (
                  <option key={risk} value={risk}>
                    Risk: {risk}
                  </option>
                ))}
              </select>

              {/* Sıralama */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="dailyReturn">Günlük Getiri</option>
                <option value="weeklyReturn">Haftalık Getiri</option>
                <option value="monthlyReturn">Aylık Getiri</option>
                <option value="yearlyReturn">Yıllık Getiri</option>
              </select>
            </div>
          </div>

          {/* Fonlar Listesi */}
          <div className="space-y-4">
            {filteredFunds.map((fund) => {
              const isPositive = fund.change.startsWith("+");
              return (
                <div
                  key={fund.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Sol: Fon Bilgileri */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="text-green-600 mt-1">
                          {getTypeIcon(fund.type)}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">
                            {fund.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              {fund.code}
                            </span>
                            <span className="text-sm text-gray-500">
                              {fund.type}
                            </span>
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded ${getRiskColor(
                                fund.risk
                              )}`}
                            >
                              {fund.risk} Risk
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Orta: Getiri Oranları */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">
                          Günlük
                        </div>
                        <div
                          className={`font-semibold ${
                            isPositive ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {fund.dailyReturn}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">
                          Haftalık
                        </div>
                        <div
                          className={`font-semibold ${
                            parseFloat(fund.weeklyReturn) >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {fund.weeklyReturn}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Aylık</div>
                        <div
                          className={`font-semibold ${
                            parseFloat(fund.monthlyReturn) >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {fund.monthlyReturn}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Yıllık</div>
                        <div
                          className={`font-semibold ${
                            parseFloat(fund.yearlyReturn) >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {fund.yearlyReturn}%
                        </div>
                      </div>
                    </div>

                    {/* Sağ: Fiyat ve Aksiyon */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {fund.price} ₺
                        </div>
                        <div
                          className={`text-sm font-semibold flex items-center justify-end gap-1 ${
                            isPositive ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {isPositive ? (
                            <ArrowTrendingUpIcon className="w-4 h-4" />
                          ) : (
                            <ArrowTrendingDownIcon className="w-4 h-4" />
                          )}
                          {fund.change}%
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold whitespace-nowrap">
                        Al
                      </button>
                    </div>
                  </div>

                  {/* Alt: Ek Bilgiler */}
                  <div className="mt-4 pt-4 border-t grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="text-gray-500">Toplam Değer:</span>{" "}
                      <span className="font-semibold">{fund.totalValue}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Yatırımcı Sayısı:</span>{" "}
                      <span className="font-semibold">
                        {fund.investors.toLocaleString("tr-TR")}
                      </span>
                    </div>
                    <div className="lg:text-right">
                      <a
                        href="#"
                        className="text-green-600 hover:text-green-700 font-semibold"
                      >
                        Detaylı Bilgi →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sonuç bulunamadı */}
          {filteredFunds.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-gray-400 mb-4">
                <MagnifyingGlassIcon className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sonuç Bulunamadı
              </h3>
              <p className="text-gray-600">
                Arama kriterlerinize uygun fon bulunamadı. Filtreleri değiştirip
                tekrar deneyin.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
