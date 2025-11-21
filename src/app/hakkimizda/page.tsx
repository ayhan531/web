"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  BuildingOfficeIcon,
  ChartBarIcon,
  UserGroupIcon,
  TrophyIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface CompanyStats {
  foundingYear: string;
  employees: number;
  branches: number;
  totalAssets: number;
  equity: number;
  ipoValue: number;
  ipoCount: number;
  bondIssuances: number;
  maTransactions: number;
  lastUpdate: string;
}

export default function HakkimizdaPage() {
  const [stats, setStats] = useState<CompanyStats>({
    foundingYear: "1996",
    employees: 603,
    branches: 36,
    totalAssets: 100310,
    equity: 28698,
    ipoValue: 33.2,
    ipoCount: 40,
    bondIssuances: 363.6,
    maTransactions: 164,
    lastUpdate: new Date().toLocaleDateString("tr-TR"),
  });

  useEffect(() => {
    // Simulate fetching updated company stats
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/company-stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.log("Using default stats");
      }
    };

    fetchStats();
    // Update every hour
    const interval = setInterval(fetchStats, 3600000);
    return () => clearInterval(interval);
  }, []);

  const timeline = [
    {
      year: "1996",
      title: "Kuruluş",
      description:
        "Türkiye İş Bankası A.Ş. tarafından 18 Aralık 1996'da kuruldu.",
    },
    {
      year: "2007",
      title: "Halka Arz",
      description:
        "ISMEN kodu ile Mayıs 2007'de Borsa İstanbul'da işlem görmeye başladı.",
    },
    {
      year: "2010",
      title: "Varant İhracı",
      description: "İlk yerli aracı kuruluş varantlarını yatırımcılara sunduk.",
    },
    {
      year: "2024",
      title: "Herkese Borsa",
      description:
        "Yeni nesil mobil ve web işlem platformu Herkese Borsa'yı başlattık.",
    },
    {
      year: "2025",
      title: "Sektör Lideri",
      description: `${stats.ipoCount} halka arz, ${stats.maTransactions} B&D işlemi ile sektörde lider konumdayız.`,
    },
  ];

  const services = [
    {
      icon: ChartBarIcon,
      title: "Kurumsal Finansman",
      description:
        "Halka arz, borçlanma araçları ihracı, birleşme ve devralma danışmanlığı",
      stats: `${stats.ipoValue} milyar TL halka arz`,
    },
    {
      icon: UserGroupIcon,
      title: "Yatırım Danışmanlığı",
      description:
        "Profesyonel yatırım danışmanlığı ve portföy yönetimi hizmetleri",
      stats: "SPK lisanslı danışmanlar",
    },
    {
      icon: BuildingOfficeIcon,
      title: "Aracılık Hizmetleri",
      description: "BIST, VİOP, yurtdışı piyasalar ve forex işlem platformları",
      stats: `${stats.branches} şube ağı`,
    },
  ];

  const achievements = [
    "BIST Sürdürülebilirlik Endeksi'nde işlem gören tek aracı kurum",
    "Saha Rating AAA kredi notu (uzun vadeli)",
    "İlk yerli aracı kuruluş varantı ihraççısı",
    "İlk hedge fonunu çıkaran kuruluş",
    "Borsa İstanbul'un ilk likidite sağlayıcısı",
    "İlk yabancı şirket halka arzına liderlik",
  ];

  const platforms = [
    {
      name: "TradeMaster",
      description: "BIST ve VİOP işlemleri için profesyonel platform",
    },
    {
      name: "TradeMaster International",
      description: "Küresel piyasalara erişim (hisse, vadeli, CFD)",
    },
    {
      name: "TradeMaster FX",
      description: "MetaTrader 5 tabanlı forex platformu",
    },
    {
      name: "Herkese Borsa",
      description:
        "Yeni nesil mobil ve web işlem platformu - komisyon avantajı",
    },
    {
      name: "İş Varant Mobil",
      description: "Varant işlemleri için özel mobil uygulama",
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
            <span className="text-white font-medium">Hakkımızda</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Kısaca YatırımPRO
          </h1>
          <p className="text-xl text-green-100 max-w-4xl leading-relaxed mb-4">
            {stats.foundingYear} yılında kurulan YatırımPRO; yerli-yabancı
            bireysel ve kurumsal yatırımcılara, geleneksel alım-satım
            aracılığının yanı sıra Kurumsal Finansman, Yatırım Danışmanlığı,
            Portföy Yönetimi, Piyasa Yapıcılığı ve Likidite Sağlayıcılığı
            hizmetleri sunmaktadır.
          </p>
          <p className="text-sm text-green-200">
            Son güncelleme: {stats.lastUpdate}
          </p>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-16 bg-gray-50 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">
                {stats.foundingYear}
              </div>
              <div className="text-sm text-gray-600">Kuruluş Yılı</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">
                {stats.employees}
              </div>
              <div className="text-sm text-gray-600">Çalışan Sayısı</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">
                {stats.branches}
              </div>
              <div className="text-sm text-gray-600">Şube</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">
                {stats.totalAssets.toLocaleString("tr-TR")}
              </div>
              <div className="text-sm text-gray-600">Milyon TL Aktif</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">
                {stats.equity.toLocaleString("tr-TR")}
              </div>
              <div className="text-sm text-gray-600">Milyon TL Özkaynak</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">AAA</div>
              <div className="text-sm text-gray-600">Kredi Notu</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Text */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                {stats.foundingYear} yılında kuruluş hikayemizde, yaklaşık{" "}
                {new Date().getFullYear() - parseInt(stats.foundingYear)} yıldır
                yerli ve yabancı bireysel ve kurumsal yatırımcılarımıza
                sunduğumuz geleneksel alım-satım aracılık hizmetlerinin yanı
                sıra kurumsal finansman, yatırım danışmanlığı, portföy yönetimi,
                piyasa yapıcılığı ve likidite sağlayıcılığı hizmetleri
                vermekteyiz.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Ülkemizin sermaye piyasalarına ve Türkiye ekonomisine katkı
                sağlamaya devam ederken, öncü ve lider kimliğimiz ile değişen
                riskleri, fırsatları ve teknolojinin hızlı gelişimini sürekli
                takip ederek zamanın akışını değere çevirmek için üstün
                gayretimizi sürdürüyoruz.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Bugün, Türkiye sermaye piyasalarında hizmet veren geniş kurumsal
                ve bireysel müşteri tabanına sahip aracı kuruluş konumundayız.{" "}
                <strong>{stats.branches} şube</strong> ile İstanbul, Ankara,
                İzmir başta olmak üzere Türkiye'nin dört bir yanında hizmet
                vermekteyiz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Hizmetlerimiz
            </h2>
            <p className="text-lg text-gray-700">
              Kapsamlı ürün yelpazesi ve profesyonel hizmet anlayışı
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="text-sm font-semibold text-green-700">
                  {service.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <TrophyIcon className="w-16 h-16 text-green-700 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Performansımız
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-green-50 p-8 rounded-2xl text-center border-2 border-green-200">
                <div className="text-5xl font-bold text-green-700 mb-3">
                  {stats.ipoValue}M TL
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {stats.ipoCount} Halka Arz
                </div>
                <div className="text-sm text-gray-600">
                  2025/9 itibarıyla sektör lideri
                </div>
              </div>
              <div className="bg-green-50 p-8 rounded-2xl text-center border-2 border-green-200">
                <div className="text-5xl font-bold text-green-700 mb-3">
                  {stats.bondIssuances}M TL
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  Borçlanma Araçları
                </div>
                <div className="text-sm text-gray-600">
                  2010'dan bugüne toplam işlem
                </div>
              </div>
              <div className="bg-green-50 p-8 rounded-2xl text-center border-2 border-green-200">
                <div className="text-5xl font-bold text-green-700 mb-3">
                  {stats.maTransactions}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  B&D İşlemi
                </div>
                <div className="text-sm text-gray-600">
                  13 milyar USD üzerinde
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-12">
              <ClockIcon className="w-10 h-10 text-green-700 mr-4" />
              <h2 className="text-4xl font-bold text-gray-900">Tarihçe</h2>
            </div>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-green-700 text-white font-bold text-lg rounded-full w-20 h-20 shrink-0 flex flex-col items-center justify-center mr-6 shadow-lg">
                    <div className="text-2xl">{item.year}</div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <CheckCircleIcon className="w-16 h-16 text-green-700 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Başarılarımız ve İlklerimiz
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-start bg-green-50 p-6 rounded-xl border border-green-200"
                >
                  <svg
                    className="w-6 h-6 text-green-700 mr-4 shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-gray-800 font-semibold">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                İşlem Platformlarımız
              </h2>
              <p className="text-lg text-gray-700">
                Teknoloji odaklı, güvenli ve kullanıcı dostu platformlar
              </p>
            </div>

            <div className="space-y-4">
              {platforms.map((platform, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {platform.name}
                      </h3>
                      <p className="text-gray-600">{platform.description}</p>
                    </div>
                    <svg
                      className="w-8 h-8 text-green-700"
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

      {/* CTA */}
      <section className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Daha Fazla Bilgi</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            YatırımPRO ailesi olarak{" "}
            {new Date().getFullYear() - parseInt(stats.foundingYear)} yıllık
            tecrübemizle sizlere hizmet vermeye devam ediyoruz.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/iletisim"
              className="inline-flex items-center bg-white text-green-900 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg"
            >
              İletişime Geçin
            </Link>
            <Link
              href="/kayit"
              className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-900 transition-all duration-300"
            >
              Hesap Aç
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
