"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MarketTicker from "./MarketTicker";

interface MarketData {
  symbol: string;
  name: string;
  price: string;
  changePercent: string;
}

export default function Header() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let counter = 0;

    const fetchData = async () => {
      counter++;
      try {
        const response = await fetch("/api/bist/stocks?limit=5");

        // If server returned non-OK, attempt to read body for debugging
        if (!response.ok) {
          const text = await response.text().catch(() => null);
          console.error("BIST stocks fetch failed:", response.status, text);
          generateDummyData();
          return;
        }

        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          // Received HTML (likely a dev overlay or error page) — log it for debugging
          const text = await response.text().catch(() => "<unreadable body>");
          console.error("Expected JSON but received:", text.slice(0, 100));
          generateDummyData();
          return;
        }

        let data: any;
        try {
          data = await response.json();
        } catch (err) {
          console.error("Failed to parse JSON from /api/bist/stocks:", err);
          const text = await response.text().catch(() => null);
          console.error("Response body:", text);
          generateDummyData();
          return;
        }

        const formattedData = (Array.isArray(data) ? data : []).map(
          (stock: any) => ({
            symbol: stock.symbol,
            name: stock.name,
            price: stock.price,
            changePercent: stock.changePercent,
          })
        );

        setMarketData(formattedData.length ? formattedData : []);
      } catch (error) {
        console.error("API hatası:", error);
        generateDummyData();
      }
    };

    const generateDummyData = () => {
      const dummyStocks = [
        { symbol: "THYAO", name: "Türk Hava Yolları", basePrice: 269.5 },
        { symbol: "AKBNK", name: "Akbank", basePrice: 58.9 },
        { symbol: "GARAN", name: "Garanti BBVA", basePrice: 129.8 },
        { symbol: "ASELS", name: "Aselsan", basePrice: 67.8 },
        { symbol: "BIMAS", name: "BİM", basePrice: 245.6 },
      ];

      const dummyData = dummyStocks.map((stock) => {
        const deviation = (Math.random() - 0.5) * 0.002;
        const price = stock.basePrice * (1 + deviation);
        const changePercent =
          ((price - stock.basePrice) / stock.basePrice) * 100;

        return {
          symbol: stock.symbol,
          name: stock.name,
          price: price.toFixed(2),
          changePercent: `${
            changePercent >= 0 ? "+" : ""
          }${changePercent.toFixed(2)}%`,
        };
      });

      setMarketData(dummyData);
    };

    fetchData();
    intervalId = setInterval(fetchData, 6000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top Bar - Market Data */}
      <div className="bg-white border-b border-gray-100 hidden md:block">
        <div className="container mx-auto px-4 py-2">
          <MarketTicker data={marketData} />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-0">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-lg text-gray-900 hover:text-green-700 transition"
          >
            <div className="w-8 h-8 bg-linear-to-br from-green-600 to-green-700 rounded flex items-center justify-center text-white font-bold text-sm">
              YP
            </div>
            <span className="hidden sm:inline text-gray-900">YatırımPRO</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-0.5">
            {/* Bizi Tanıyın */}
            <div className="relative group">
              <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-green-700 transition border-b-2 border-transparent group-hover:border-green-600">
                Bizi Tanıyın
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-10 border border-gray-200">
                <Link
                  href="/hakkimizda"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  Hakkımızda
                </Link>
                <Link
                  href="/insan-kaynaklari"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  İnsan Kaynakları
                </Link>
                <Link
                  href="/yatirimci-iliskileri"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  Yatırımcı İlişkileri
                </Link>
              </div>
            </div>

            {/* Hizmetler */}
            <div className="relative group">
              <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-green-700 transition border-b-2 border-transparent group-hover:border-green-600">
                Hizmetler
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-10 border border-gray-200">
                <Link
                  href="/kurumsal-finansman"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  Kurumsal Finansman
                </Link>
                <Link
                  href="/yatirim-danismanligi"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  Yatırım Danışmanlığı
                </Link>
                <Link
                  href="/portfoy-yonetimi"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  Portföy Yönetimi
                </Link>
              </div>
            </div>

            {/* Ürünler */}
            <div className="relative group">
              <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-green-700 transition border-b-2 border-transparent group-hover:border-green-600">
                Ürünler
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-10 border border-gray-200">
                <Link
                  href="/borsa"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  Pay Piyasası
                </Link>
                <Link
                  href="/doviz"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  Döviz
                </Link>
                <Link
                  href="/altin"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  Altın
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  Yatırım Fonları
                </Link>
              </div>
            </div>

            {/* Analiz */}
            <div className="relative group">
              <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-green-700 transition border-b-2 border-transparent group-hover:border-green-600">
                Analiz
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-10 border border-gray-200">
                <Link
                  href="/analiz"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  Analiz Özet
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  Hisse Senetleri
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  Araştırma Raporları
                </Link>
                <Link
                  href="/haberler"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  Haberler
                </Link>
              </div>
            </div>

            {/* Platformlar */}
            <div className="relative group">
              <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-green-700 transition border-b-2 border-transparent group-hover:border-green-600">
                Platformlar
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-10 border border-gray-200">
                <Link
                  href="#"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  TradeMaster Mobile
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  TradeMaster WEB
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  TradeMaster Masaüstü
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium"
                >
                  Herkese Borsa
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Auth & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link
              href="/giris"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-green-700 hover:text-green-800 transition"
            >
              Giriş Yap
            </Link>
            <Link
              href="/kayit"
              className="inline-flex items-center justify-center rounded-lg bg-linear-to-r from-green-600 to-green-700 px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:from-green-700 hover:to-green-800"
            >
              Kayıt Ol
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200">
            <div className="space-y-1">
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "bizi" ? null : "bizi")
                }
                className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md flex items-center justify-between"
              >
                Bizi Tanıyın
                <svg
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === "bizi" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
              {activeDropdown === "bizi" && (
                <div className="pl-4 space-y-1">
                  <Link
                    href="/hakkimizda"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    Hakkımızda
                  </Link>
                  <Link
                    href="/insan-kaynaklari"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    İnsan Kaynakları
                  </Link>
                  <Link
                    href="/yatirimci-iliskileri"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    Yatırımcı İlişkileri
                  </Link>
                </div>
              )}

              <button
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "hizmetler" ? null : "hizmetler"
                  )
                }
                className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md flex items-center justify-between"
              >
                Hizmetler
                <svg
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === "hizmetler" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
              {activeDropdown === "hizmetler" && (
                <div className="pl-4 space-y-1">
                  <Link
                    href="/kurumsal-finansman"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    Kurumsal Finansman
                  </Link>
                  <Link
                    href="/yatirim-danismanligi"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    Yatırım Danışmanlığı
                  </Link>
                  <Link
                    href="/portfoy-yonetimi"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    Portföy Yönetimi
                  </Link>
                </div>
              )}

              <button
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "urunler" ? null : "urunler"
                  )
                }
                className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md flex items-center justify-between"
              >
                Ürünler
                <svg
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === "urunler" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
              {activeDropdown === "urunler" && (
                <div className="pl-4 space-y-1">
                  <Link
                    href="/borsa"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    Pay Piyasası
                  </Link>
                  <Link
                    href="/doviz"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    Döviz
                  </Link>
                  <Link
                    href="/altin"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    Altın
                  </Link>
                </div>
              )}

              <button
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "analiz" ? null : "analiz"
                  )
                }
                className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md flex items-center justify-between"
              >
                Analiz
                <svg
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === "analiz" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
              {activeDropdown === "analiz" && (
                <div className="pl-4 space-y-1">
                  <Link
                    href="/analiz"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    Analiz Özet
                  </Link>
                  <Link
                    href="/haberler"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    Haberler
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
