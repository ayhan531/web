"use client";

import Link from "next/link";
import {
  ChartBarIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  AcademicCapIcon,
  TrophyIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function KurumsalFinansmanPage() {
  const [activeTab, setActiveTab] = useState<"hizmetler" | "sektorler">(
    "hizmetler"
  );

  const services = [
    {
      title: "Şirket Birleşme ve Devralma",
      description:
        "Birleşme, devralma ve satış işlemlerinde danışmanlık hizmetleri",
      icon: BuildingOfficeIcon,
      link: "/kurumsal-finansman/birlesme-devralma",
    },
    {
      title: "Pay Piyasası İşlemleri",
      description: "Halka arz, sermaye artırımı ve pay satış işlemleri",
      icon: ChartBarIcon,
      link: "/kurumsal-finansman/pay-piyasasi",
    },
    {
      title: "Borçlanma Piyasası İşlemleri",
      description: "Tahvil, bono ve diğer borçlanma araçları ihracı",
      icon: DocumentTextIcon,
      link: "/kurumsal-finansman/borclanma-piyasasi",
    },
  ];

  const sectors = [
    {
      title: "Tüketim Ürünleri",
      description: "Perakende, gıda, içecek ve tüketim malları sektörü",
      icon: "🛒",
    },
    {
      title: "Enerji, İnşaat ve Madencilik",
      description: "Enerji üretimi, altyapı ve maden işletmeciliği",
      icon: "⚡",
    },
    {
      title: "Temel Endüstriler",
      description: "Üretim, kimya, çelik ve temel sanayi",
      icon: "🏭",
    },
    {
      title: "Teknoloji, Medya ve Telekomünikasyon",
      description: "IT, yazılım, medya ve telekomünikasyon hizmetleri",
      icon: "💻",
    },
    {
      title: "Finansal Hizmetler ve Gayrimenkul",
      description: "Bankacılık, sigorta ve gayrimenkul geliştirme",
      icon: "🏦",
    },
    {
      title: "Ulaştırma ve Lojistik",
      description: "Taşımacılık, lojistik ve depolama hizmetleri",
      icon: "🚚",
    },
    {
      title: "Hizmetler ve Sağlık",
      description: "Sağlık hizmetleri, eğitim ve diğer hizmet sektörleri",
      icon: "🏥",
    },
  ];

  const timeline = [
    {
      period: "1980'li Yıllar",
      title: "Kuruluş Dönemi",
      description:
        "Türkiye'de kurulan ilk menkul kıymetler birimi olarak Türkiye İş Bankası Menkul Kıymetler Müdürlüğü kuruldu. Arçelik, Erdemir, Tüpraş, Petkim ve Tofaş gibi önemli şirketlerin ilk halka arzlarını gerçekleştirdik.",
    },
    {
      period: "1990'lı Yıllar",
      title: "Borç Sermaye Piyasaları",
      description:
        "Özel sektör borç sermaye piyasaları ihraçlarının neredeyse tamamını gerçekleştirdik. Sektörde öncü konumumuzu pekiştirdik.",
    },
    {
      period: "1996",
      title: "İş Yatırım Kurumsal Finansman",
      description:
        "Türkiye İş Bankası Menkul Kıymetler Müdürlüğü'nün tecrübe ve insan kaynakları mirası ile YatırımPRO Kurumsal Finansman Müdürlüğü oluşturuldu.",
    },
    {
      period: "2000'li Yıllar",
      title: "Blok Satış ve Özelleştirme",
      description:
        "Hızlanan özelleştirme hamlelerinde satıcı taraf danışmanlıklarında büyük rol oynadık. 29 adet projede satıcı taraf, 39 adet projede alıcı taraf B&D danışmanlığı verdik.",
    },
    {
      period: "2005-Günümüz",
      title: "Liderlik Dönemi",
      description:
        "Yabancı yatırımcının artan ilgisi ile işlem hacmi artan B&D danışmanlıklarında işlem adedi bazında lider konuma geldik. 38 farklı şirkete sermaye piyasalarından fon teminine ulaşım imkanı sağladık.",
    },
  ];

  const achievements = [
    {
      number: "68+",
      label: "B&D Danışmanlığı",
      description: "2000 yılından bu yana 68 adet B&D projesi",
    },
    {
      number: "38",
      label: "Fon Temin Projesi",
      description: "FI, Bankacılık ve Reel Sektör şirketleri",
    },
    {
      number: "#1",
      label: "Sektör Lideri",
      description: "İşlem adedi bazında lider konum",
    },
    {
      number: "40+",
      label: "Yıllık Deneyim",
      description: "1980'lerden bu yana kesintisiz hizmet",
    },
  ];

  const awards = [
    {
      year: "2024",
      title: "Yılın Yatırım Bankacılığı Ekibi",
      organization: "Finance Turkey",
    },
    {
      year: "2023",
      title: "En İyi Kurumsal Finansman Danışmanı",
      organization: "Capital Markets Turkey",
    },
    {
      year: "2023",
      title: "En Başarılı Halka Arz",
      organization: "Borsa İstanbul",
    },
    {
      year: "2022",
      title: "En İyi B&D Danışmanlığı",
      organization: "International Finance Awards",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-sm mb-6 text-green-100">
            <Link href="/" className="hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">Kurumsal Finansman</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Kurumsal Finansman
          </h1>
          <p className="text-xl md:text-2xl text-green-50 max-w-3xl leading-relaxed">
            Yatırım Bankacılığı alanında sektörün en tecrübeli kadrosu ile
            yüksek etik anlayışı çerçevesinde müşterilerimize dünya
            standartlarında hizmet vermekteyiz.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/iletisim"
              className="inline-flex items-center bg-white text-green-900 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              İletişime Geçin
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
              href="#hizmetler"
              className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-900 transition-all duration-300"
            >
              Hizmetlerimiz
            </a>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xl text-gray-700 leading-relaxed">
              <span className="font-bold text-green-900">YatırımPRO</span>, İş
              Bankası kültürünün getirdiği piyasa yapıcılığı ve öncü olma
              misyonunu devam ettirerek, faaliyet gösterdiği alanlarda
              müşterilerinin ihtiyaçlarına uygun olarak{" "}
              <span className="text-green-700 font-semibold">
                yenilikçi çözümler
              </span>{" "}
              üretmekte; sektörünün en geniş kadrosu ve ürün yelpazesi ile
              müşterilerinin tüm yatırım bankacılığı hizmetlerini
              <span className="text-green-700 font-semibold">
                {" "}
                tek adresten
              </span>{" "}
              almalarını sağlamakta ve kurduğu uzun dönemli ilişkileri
              <span className="text-green-700 font-semibold">
                {" "}
                müşteri memnuniyeti
              </span>{" "}
              ile pekiştirerek sürdürmektedir.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 text-center group"
              >
                <div className="text-5xl font-bold text-green-700 mb-3 group-hover:scale-110 transition-transform duration-300">
                  {achievement.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {achievement.label}
                </div>
                <div className="text-sm text-gray-600">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services and Sectors Tabs */}
      <section id="hizmetler" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-12">
              <button
                onClick={() => setActiveTab("hizmetler")}
                className={`px-8 py-4 text-lg font-semibold transition-all duration-300 border-b-2 ${
                  activeTab === "hizmetler"
                    ? "border-green-700 text-green-700"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Temel Hizmetler
              </button>
              <button
                onClick={() => setActiveTab("sektorler")}
                className={`px-8 py-4 text-lg font-semibold transition-all duration-300 border-b-2 ${
                  activeTab === "sektorler"
                    ? "border-green-700 text-green-700"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Sektörler
              </button>
            </div>

            {/* Services Tab */}
            {activeTab === "hizmetler" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <Link
                    key={index}
                    href={service.link}
                    className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100 group"
                  >
                    <service.icon className="w-16 h-16 text-green-700 mb-6 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center text-green-700 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      Detaylı Bilgi
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
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Sectors Tab */}
            {activeTab === "sektorler" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectors.map((sector, index) => (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group cursor-pointer hover:border-green-300"
                  >
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {sector.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                      {sector.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {sector.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-12">
              <ClockIcon className="w-10 h-10 text-green-700 mr-4" />
              <h2 className="text-4xl font-bold text-gray-900">Tarihçe</h2>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-green-200"></div>

              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative mb-12 ${
                    index % 2 === 0
                      ? "md:pr-1/2 md:text-right"
                      : "md:pl-1/2 md:ml-auto"
                  }`}
                >
                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                    } pl-12 md:pl-12`}
                  >
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
                      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1 w-8 h-8 bg-green-700 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <CheckCircleIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-green-700 font-bold text-sm mb-2">
                        {item.period}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-12">
              <TrophyIcon className="w-10 h-10 text-green-700 mr-4" />
              <h2 className="text-4xl font-bold text-gray-900">Ödüllerimiz</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
                >
                  <div className="flex items-start">
                    <div className="bg-green-700 text-white font-bold text-lg rounded-lg px-4 py-2 mr-4">
                      {award.year}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {award.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {award.organization}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Kurumsal Finansman Hizmetlerimiz Hakkında
          </h2>
          <p className="text-xl text-green-50 mb-8 max-w-3xl mx-auto">
            Şirketiniz için en uygun finansman çözümlerini birlikte
            belirleyelim. Uzman ekibimiz sizinle iletişime geçmek için hazır.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/iletisim"
              className="inline-flex items-center bg-white text-green-900 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
              Bize Ulaşın
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
          </div>
        </div>
      </section>
    </div>
  );
}
