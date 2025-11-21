"use client";

import Link from "next/link";
import {
  ChartPieIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function PortfoyYonetimiPage() {
  const features = [
    {
      icon: ChartPieIcon,
      title: "Profesyonel Yönetim",
      description:
        "Uzman portföy yöneticileri tarafından aktif olarak yönetilen portföyler",
    },
    {
      icon: ShieldCheckIcon,
      title: "Risk Yönetimi",
      description:
        "Risk profilinize uygun, dengeli ve çeşitlendirilmiş portföy yapısı",
    },
    {
      icon: CurrencyDollarIcon,
      title: "Getiri Odaklı",
      description:
        "Piyasa koşullarına göre optimize edilmiş yatırım stratejileri",
    },
    {
      icon: UserGroupIcon,
      title: "Kişisel Hizmet",
      description: "Size özel oluşturulan ve yönetilen portföy grupları",
    },
  ];

  const portfolioTypes = [
    {
      title: "Büyüme Portföyü",
      risk: "Yüksek",
      description:
        "Agresif büyüme stratejisi ile uzun vadeli sermaye artışı hedefleyen portföy.",
      features: [
        "Teknoloji ve büyüme hisseleri ağırlıklı",
        "Yüksek volatilite beklentisi",
        "Uzun vadeli yatırım horizonu",
        "Aktif pozisyon yönetimi",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Dengeli Portföy",
      risk: "Orta",
      description:
        "Hisse senedi ve sabit getirili araçların dengeli karışımı ile istikrarlı büyüme.",
      features: [
        "%60 hisse senedi, %40 sabit getirili",
        "Dengeli risk/getiri profili",
        "Orta-uzun vadeli yatırım",
        "Düzenli portföy rebalansı",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Gelir Portföyü",
      risk: "Düşük",
      description:
        "Düzenli gelir akışı sağlayan, düşük riskli yatırım araçları portföyü.",
      features: [
        "Temettü hisseleri ve tahviller",
        "Düşük volatilite",
        "Düzenli nakit akışı",
        "Sermaye koruma odaklı",
      ],
      color: "from-green-500 to-green-600",
    },
  ];

  const advantages = [
    "SPK lisanslı uzman portföy yöneticileri",
    "Günlük portföy performans takibi",
    "Düzenli raporlama ve şeffaflık",
    "Profesyonel risk yönetimi",
    "Esnek giriş ve çıkış imkanı",
    "Vergiye uygun yapılandırma",
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
            <span className="text-white font-medium">Portföy Yönetimi</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Portföy Yönetimi
          </h1>
          <p className="text-xl text-green-100 max-w-4xl leading-relaxed">
            Özel portföy yönetimi grupları, yatırımların risk tercihlerine göre
            portföy gruplarında değerlendirildiği profesyonel yönetim şeklidir.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/kayit"
              className="inline-flex items-center bg-white text-green-900 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Hesap Aç
              <svg
                className="ml-2 w-5 h-5"
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
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-900 transition-all duration-300"
            >
              İletişime Geçin
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Neden Portföy Yönetimi?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Profesyonel yönetim ve uzman kadromuzla yatırımlarınızı güvenle
              büyütün
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 text-center group"
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <feature.icon className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Portföy Tipleri
            </h2>
            <p className="text-lg text-gray-700">
              Risk profilinize ve yatırım hedeflerinize uygun portföy
              seçenekleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {portfolioTypes.map((portfolio, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200"
              >
                <div
                  className={`h-2 bg-linear-to-r ${portfolio.color}`}
                ></div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {portfolio.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        portfolio.risk === "Yüksek"
                          ? "bg-red-100 text-red-700"
                          : portfolio.risk === "Orta"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {portfolio.risk} Risk
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {portfolio.description}
                  </p>
                  <ul className="space-y-3">
                    {portfolio.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-sm text-gray-600"
                      >
                        <svg
                          className="w-5 h-5 text-green-600 mr-2 shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <DocumentCheckIcon className="w-16 h-16 text-green-700 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Avantajlarımız
              </h2>
              <p className="text-lg text-gray-700">
                YatırımPRO Portföy Yönetimi ile fark yaratın
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advantages.map((advantage, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 flex items-center"
                >
                  <div className="bg-green-100 rounded-full p-3 mr-4 shrink-0">
                    <svg
                      className="w-6 h-6 text-green-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-800 font-semibold">{advantage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <ClockIcon className="w-16 h-16 text-green-700 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nasıl Çalışır?
              </h2>
              <p className="text-lg text-gray-700">
                Portföy yönetimi süreci adım adım
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Hesap Açma ve Profil Belirleme",
                  description:
                    "Risk profiliniz, yatırım hedefleriniz ve beklentileriniz değerlendirilerek size özel bir portföy tipi belirlenir.",
                },
                {
                  step: "2",
                  title: "Portföy Oluşturma",
                  description:
                    "Uzman portföy yöneticilerimiz, belirlenen stratejiye uygun olarak portföyünüzü oluşturur ve çeşitlendirir.",
                },
                {
                  step: "3",
                  title: "Aktif Yönetim ve İzleme",
                  description:
                    "Portföyünüz günlük olarak izlenir, piyasa koşullarına göre gerekli ayarlamalar yapılır ve performans raporları düzenli olarak sunulur.",
                },
                {
                  step: "4",
                  title: "Raporlama ve Şeffaflık",
                  description:
                    "Aylık ve yıllık performans raporları ile portföyünüzün durumunu detaylı olarak takip edebilirsiniz.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-green-700 text-white font-bold text-2xl rounded-full w-14 h-14 shrink-0 flex items-center justify-center mr-6 shadow-lg">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
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

      {/* CTA Section */}
      <section className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Portföy Yönetimi Hakkında Daha Fazla Bilgi
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Uzman portföy yöneticilerimizle tanışmak ve size en uygun portföy
            stratejisini belirlemek için bizimle iletişime geçin.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/kayit"
              className="inline-flex items-center bg-white text-green-900 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Hesap Açmak İçin Tıklayın
              <svg
                className="ml-2 w-5 h-5"
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
            </Link>
            <a
              href="tel:+902123502000"
              className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-900 transition-all duration-300"
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +90 (212) 350 20 00
            </a>
            <a
              href="mailto:bilgi@yatirimpro.com"
              className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-900 transition-all duration-300"
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
              bilgi@yatirimpro.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
