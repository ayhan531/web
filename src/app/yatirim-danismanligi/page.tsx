"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChartBarIcon,
  UserGroupIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  ClockIcon,
  PhoneIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export default function YatirimDanismanligiPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const services = [
    {
      title: "Pay İşlemleri",
      description:
        "Araştırma analistlerimizin hazırladığı piyasa/şirket raporları ile Borsa İstanbul'da akıllı yatırım.",
      icon: ChartBarIcon,
      color: "from-blue-500 to-blue-600",
      link: "/borsa",
    },
    {
      title: "VİOP",
      description:
        "Piyasalar yükselirken de düşerken de kaldıraçlı yatırım imkanı sunan vadeli işlem ve opsiyon sözleşmeleri.",
      icon: ChartBarIcon,
      color: "from-purple-500 to-purple-600",
      link: "#",
    },
    {
      title: "Eurobond",
      description:
        "Uzun vadeli yabancı para cinsinden yatırım düşünenler için uygun yatırım aracı.",
      icon: GlobeAltIcon,
      color: "from-green-500 to-green-600",
      link: "#",
    },
    {
      title: "Yurtdışı Hisse ve Future",
      description:
        "Küresel piyasalarda stratejinize en uygun yatırım araçları.",
      icon: GlobeAltIcon,
      color: "from-orange-500 to-orange-600",
      link: "#",
    },
  ];

  const benefits = [
    {
      icon: UserGroupIcon,
      title: "Kişiselleştirilmiş Hizmet",
      description:
        "Sizi yakından tanıyarak risk/getiri profilinizi belirliyoruz.",
    },
    {
      icon: LightBulbIcon,
      title: "Uzman Öneriler",
      description:
        "Analist ve trader'ların analiz ve beklentilerini size özel yatırım önerilerine dönüştürüyoruz.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Güvenilir Danışmanlık",
      description:
        "SPK lisanslı uzman yatırım danışmanlarımız ile güvenle yatırım yapın.",
    },
    {
      icon: ClockIcon,
      title: "7/24 Destek",
      description:
        "Piyasa saatleri içinde ve dışında kesintisiz destek hizmeti.",
    },
  ];

  const faqs = [
    {
      question: "Yatırım danışmanı nasıl atanır?",
      answer:
        "Formu doldurduğunuzda, uzman ekibimiz sizinle iletişime geçerek risk profilinize uygun bir yatırım danışmanı ataması yapar.",
    },
    {
      question: "Yatırım danışmanlığı ücreti var mı?",
      answer:
        "Yatırım danışmanlığı hizmeti, aktif işlem yapan müşterilerimize ücretsiz olarak sunulmaktadır.",
    },
    {
      question: "Hangi ürünlerde danışmanlık alabilirim?",
      answer:
        "Hisse senetleri, VİOP, eurobond, yurtdışı piyasalar, yatırım fonları ve daha fazlası için danışmanlık hizmeti alabilirsiniz.",
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
            <span className="text-white font-medium">Yatırım Danışmanlığı</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Yatırım Danışmanlığı
          </h1>
          <p className="text-2xl text-green-50 mb-4 font-semibold">
            Paranız YatırımPRO'da İşlesin
          </p>
          <p className="text-xl text-green-100 max-w-4xl leading-relaxed">
            Yatırım danışmanınız; yurtiçi ve yurtdışı piyasaların yanı sıra
            araştırma ekibi ile koordineli çalışarak, analist ve trader'ların
            analiz ve beklentilerini değerlendirdikten sonra{" "}
            <span className="font-bold">size özel yatırım önerilerine</span>{" "}
            dönüştürür.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-t-4 border-green-600">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Formu Doldurun, Sizi Arayalım
                </h2>
                <p className="text-lg text-gray-700">
                  Sizi yakından tanıyarak risk/getiri profilinizi belirleyip
                  ihtiyaçlarınıza en uygun yatırım stratejileri ve ürün
                  alternatiflerini sunuyoruz.
                </p>
              </div>

              {submitted ? (
                <div className="bg-green-50 border-2 border-green-500 text-green-800 p-8 rounded-xl text-center">
                  <svg
                    className="w-20 h-20 text-green-500 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-2xl font-bold mb-3">
                    Başvurunuz Alındı!
                  </h3>
                  <p className="text-lg">
                    Yatırım danışmanınız en kısa sürede sizinle iletişime
                    geçecektir.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Ad Soyad <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Adınız ve soyadınız"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Telefon <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="+90 (5xx) xxx xx xx"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      E-posta <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Mesajınız
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      placeholder="Yatırım hedefleriniz ve ilgilendiğiniz ürünler hakkında bilgi verebilirsiniz..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Yatırım Danışmanınızla Tanışın
                  </button>

                  <p className="text-xs text-gray-600 text-center">
                    Formu göndererek{" "}
                    <Link href="#" className="text-green-700 hover:underline">
                      Kullanım Koşulları
                    </Link>{" "}
                    ve{" "}
                    <Link href="#" className="text-green-700 hover:underline">
                      Gizlilik Politikası
                    </Link>
                    'nı kabul etmiş olursunuz.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Neden Yatırım Danışmanınız Olmalı?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Sizi yakından tanıyarak risk/getiri profilinizi belirleyip
              ihtiyaçlarınıza en uygun yatırım stratejileri ve ürün
              alternatiflerini sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 text-center group"
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <benefit.icon className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Danışmanlık Hizmeti Verdiğimiz Ürünler
            </h2>
            <p className="text-lg text-gray-700">
              Geniş ürün yelpazesi ile tüm yatırım ihtiyaçlarınıza çözüm
              sunuyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.link}
                className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90 group-hover:opacity-100 transition-opacity`}
                ></div>
                <div className="relative p-8 text-white">
                  <div className="flex items-center mb-4">
                    <service.icon className="w-12 h-12 mr-4" />
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-white/90 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Sıkça Sorulan Sorular
              </h2>
              <p className="text-lg text-gray-700">
                Yatırım danışmanlığı hizmeti hakkında merak edilenler
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-green-50 border border-green-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start">
                    <span className="bg-green-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">
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

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <PhoneIcon className="w-16 h-16 mx-auto mb-6 text-green-200" />
            <h2 className="text-4xl font-bold mb-4">
              Yatırım Kararı Vermeden Önce Bize Danışın
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Destek hattımız ve yatırım danışmanlarımız size yardımcı olmak
              için hazır
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 min-w-[280px]">
                <p className="text-green-200 text-sm mb-2">Destek Hattı</p>
                <a
                  href="tel:+902123502424"
                  className="text-2xl font-bold hover:text-green-200 transition"
                >
                  0 212 350 24 24
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 min-w-[280px]">
                <p className="text-green-200 text-sm mb-2">E-posta</p>
                <a
                  href="mailto:bilgi@yatirimpro.com"
                  className="text-2xl font-bold hover:text-green-200 transition break-all"
                >
                  bilgi@yatirimpro.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access for Bank Customers */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-green-100">
            <div className="flex items-start mb-6">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Hızlı Hesap Açma
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Mevcut bir banka hesabınız varsa şubeye gitmenize gerek
                  kalmadan internet bankacılığı ve mobil uygulama üzerinden
                  hızlı bir şekilde yatırım hesabınızı açabilirsiniz.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Gerekli sözleşmeleri imzalayarak{" "}
                  <strong>
                    Pay, Varant, Kredili Pay, Yurt Dışı Pay ve Futures
                  </strong>{" "}
                  işlemlerini gerçekleştirebilir; mobil ve web platformlarımızı
                  kullanabilirsiniz.
                </p>
                <Link
                  href="/kayit"
                  className="inline-flex items-center bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                >
                  Hemen Hesap Aç
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
