"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-sm mb-6 text-green-100">
            <Link href="/" className="hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">İletişim</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Bize Ulaşın</h1>
          <p className="text-xl text-green-50 max-w-2xl">
            Sorularınız için bizimle iletişime geçin. Uzman ekibimiz size
            yardımcı olmaktan mutluluk duyar.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Telefon</h3>
              <a
                href="tel:+902123502000"
                className="text-green-700 hover:text-green-800 font-semibold"
              >
                +90 (212) 350 20 00
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <EnvelopeIcon className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">E-posta</h3>
              <a
                href="mailto:bilgi@yatirimpro.com"
                className="text-green-700 hover:text-green-800 font-semibold"
              >
                bilgi@yatirimpro.com
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Çalışma Saatleri
              </h3>
              <p className="text-gray-700">Hafta İçi: 09:00 - 18:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Address */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Mesaj Gönderin
              </h2>
              {submitted ? (
                <div className="bg-green-50 border-2 border-green-500 text-green-800 p-6 rounded-xl text-center">
                  <svg
                    className="w-16 h-16 text-green-500 mx-auto mb-4"
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
                  <h3 className="text-xl font-bold mb-2">Mesajınız Alındı!</h3>
                  <p>En kısa sürede size geri dönüş yapacağız.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+90 (5xx) xxx xx xx"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Konu <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Konu seçiniz</option>
                      <option value="genel">Genel Bilgi</option>
                      <option value="kurumsal">Kurumsal Finansman</option>
                      <option value="yatirim">Yatırım Danışmanlığı</option>
                      <option value="hesap">Hesap İşlemleri</option>
                      <option value="teknik">Teknik Destek</option>
                      <option value="diğer">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Mesajınız <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Gönder
                  </button>
                </form>
              )}
            </div>

            {/* Address and Map */}
            <div>
              <div className="bg-white p-8 rounded-2xl shadow-lg mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Adresimiz
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPinIcon className="w-6 h-6 text-green-700 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Merkez Ofis
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Büyükdere Caddesi No: 127
                        <br />
                        Esentepe Mahallesi
                        <br />
                        Şişli / İstanbul
                        <br />
                        34394 Türkiye
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <PhoneIcon className="w-6 h-6 text-green-700 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Müşteri Hizmetleri
                      </h3>
                      <p className="text-gray-700">
                        Telefon:{" "}
                        <a
                          href="tel:+902123502000"
                          className="text-green-700 hover:text-green-800"
                        >
                          +90 (212) 350 20 00
                        </a>
                        <br />
                        Fax: +90 (212) 350 20 01
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <EnvelopeIcon className="w-6 h-6 text-green-700 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        E-posta Adresleri
                      </h3>
                      <p className="text-gray-700">
                        Genel:{" "}
                        <a
                          href="mailto:bilgi@yatirimpro.com"
                          className="text-green-700 hover:text-green-800"
                        >
                          bilgi@yatirimpro.com
                        </a>
                        <br />
                        Destek:{" "}
                        <a
                          href="mailto:destek@yatirimpro.com"
                          className="text-green-700 hover:text-green-800"
                        >
                          destek@yatirimpro.com
                        </a>
                        <br />
                        Kurumsal:{" "}
                        <a
                          href="mailto:kurumsal@yatirimpro.com"
                          className="text-green-700 hover:text-green-800"
                        >
                          kurumsal@yatirimpro.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white p-4 rounded-2xl shadow-lg">
                <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.5631815956307!2d29.009999615407647!3d41.06870397929229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8f0d84b7d1e6f6c3!2zQsO8ecO8a2RlcmUgQ2QsIMWeacWfbGkgMzQzOTQ!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sosyal Medya
          </h2>
          <p className="text-gray-600 mb-8">Bizi sosyal medyada takip edin</p>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-14 h-14 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-14 h-14 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white rounded-full flex items-center justify-center hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
