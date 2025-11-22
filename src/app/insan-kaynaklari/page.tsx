"use client";

import Link from "next/link";
import { useState } from "react";
import {
  UserGroupIcon,
  AcademicCapIcon,
  ChartBarIcon,
  HeartIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

export default function InsanKaynaklariPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    cv: null as File | null,
    coverLetter: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("position", formData.position);
      formDataToSend.append("coverLetter", formData.coverLetter);
      if (formData.cv) {
        formDataToSend.append("cv", formData.cv);
      }

      const response = await fetch("/api/job-applications", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            position: "",
            cv: null,
            coverLetter: "",
          });
        }, 5000);
      } else {
        setError(result.error || "Başvuru gönderilirken bir hata oluştu");
      }
    } catch (err) {
      setError("Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
      console.error("Application submission error:", err);
    } finally {
      setSubmitting(false);
    }
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        cv: e.target.files[0],
      });
    }
  };

  const benefits = [
    {
      icon: CurrencyDollarIcon,
      title: "Rekabetçi Ücret",
      description:
        "Performansa dayalı ücretlendirme sistemi ve yıllık maaş artışları",
    },
    {
      icon: HeartIcon,
      title: "Sağlık Sigortası",
      description: "Grup sağlık sigortası ve aile üyeleri için ek paketler",
    },
    {
      icon: AcademicCapIcon,
      title: "Eğitim ve Gelişim",
      description:
        "Ulusal ve uluslararası eğitim programları ve sertifikasyon desteği",
    },
    {
      icon: ChartBarIcon,
      title: "Kariyer Fırsatları",
      description:
        "İç kaynaklardan öncelikli terfi ve kariyer planlama desteği",
    },
    {
      icon: BriefcaseIcon,
      title: "Yan Haklar",
      description: "Evlenme, doğum yardımları ve grup emeklilik planı",
    },
    {
      icon: UserGroupIcon,
      title: "Çalışma Ortamı",
      description: "Dinamik, profesyonel ve gelişime açık çalışma kültürü",
    },
  ];

  const openPositions = [
    {
      title: "Yatırım Danışmanı",
      department: "Satış ve Pazarlama",
      location: "İstanbul",
      type: "Tam Zamanlı",
      requirements: [
        "Üniversite mezunu",
        "SPK Temel ve İleri Düzey Lisansları",
        "Finans, ekonomi veya işletme eğitimi",
        "Sermaye piyasaları deneyimi tercih edilir",
      ],
    },
    {
      title: "Kurumsal Finansman Uzmanı",
      department: "Kurumsal Finansman",
      location: "İstanbul",
      type: "Tam Zamanlı",
      requirements: [
        "Üniversite mezunu (Finans/Ekonomi/İşletme)",
        "3-5 yıl deneyim",
        "Halka arz ve M&A deneyimi",
        "İleri düzey İngilizce",
      ],
    },
    {
      title: "Portföy Yöneticisi",
      department: "Portföy Yönetimi",
      location: "İstanbul",
      type: "Tam Zamanlı",
      requirements: [
        "Üniversite mezunu",
        "SPK Portföy Yöneticiliği Lisansı",
        "En az 5 yıl portföy yönetimi deneyimi",
        "CFA veya FRM sertifikası tercih edilir",
      ],
    },
    {
      title: "Analist",
      department: "Araştırma",
      location: "İstanbul",
      type: "Tam Zamanlı",
      requirements: [
        "Üniversite mezunu (Finans/Ekonomi)",
        "Finansal modelleme bilgisi",
        "Bloomberg ve Excel uzmanlığı",
        "İngilizce (yazılı ve sözlü)",
      ],
    },
    {
      title: "Yazılım Geliştirici",
      department: "Bilgi Teknolojileri",
      location: "İstanbul",
      type: "Tam Zamanlı",
      requirements: [
        "Bilgisayar Mühendisliği mezunu",
        "React, Node.js, TypeScript deneyimi",
        "Fintech projelerinde çalışmış olma tercihi",
        "Agile metodolojileri bilgisi",
      ],
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
            <span className="text-white font-medium">İnsan Kaynakları</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            İnsan Kaynakları
          </h1>
          <p className="text-xl text-green-100 max-w-4xl leading-relaxed">
            "YatırımPRO çalışanı" olmak, 1924 yılından bu yana sahip olunan
            yatırım bankacılığı geleneği, bilgi birikimi ve tecrübesi üzerine
            inşa edilen bir kuruluşta çalışma ayrıcalığı demektir.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <UserGroupIcon className="w-16 h-16 text-green-700 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              YatırımPRO'da Kariyer
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Sermaye piyasalarının gelişimine katkı sağlama misyonuyla değer
              yaratan İnsan Kaynağına ulaşarak YatırımPRO Ailesini büyütmeye
              devam ediyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 text-center"
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
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

      {/* HR Policies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-8 rounded-2xl border border-green-200">
                <BriefcaseIcon className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ücret Politikası ve Yan Haklar
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  YatırımPRO'da ücretlendirme temel olarak{" "}
                  <strong>performansa dayalıdır</strong>. Çalışanlara verilen
                  ücret ve diğer menfaatlerin belirlenmesinde iş sonuçlarına ve
                  verimliliğe dikkat edilir.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
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
                    Yıllık ücret artışları
                  </li>
                  <li className="flex items-start">
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
                    Grup sağlık sigortası
                  </li>
                  <li className="flex items-start">
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
                    Grup emeklilik planı
                  </li>
                  <li className="flex items-start">
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
                    Sosyal haklar (evlenme, doğum)
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-8 rounded-2xl border border-green-200">
                <ChartBarIcon className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Performans ve Kariyer Yönetimi
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Performans değerlendirme sistemimiz;{" "}
                  <strong>hedefler ve yetkinliklerin</strong> birlikte
                  değerlendirildiği karma bir sistemdir.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
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
                    İç terfi önceliği
                  </li>
                  <li className="flex items-start">
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
                    Kariyer planlama desteği
                  </li>
                  <li className="flex items-start">
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
                    Dönemsel değerlendirme
                  </li>
                  <li className="flex items-start">
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
                    Yönetici geri bildirimi
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-green-50 p-8 rounded-2xl border border-green-200">
              <AcademicCapIcon className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Eğitim ve Gelişim
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Temel eğitim politikamız; <strong>sürekli öğrenmeyi</strong> bir
                hayat felsefesi olarak benimseyen çalışanlarımızın profesyonel
                ve kişisel gelişimlerine katkıda bulunmak ve bu hususta
                çalışanlara eşit fırsatlar sunmaktır.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-2">
                    Mesleki Eğitimler
                  </div>
                  <div className="text-sm text-gray-600">
                    SPK lisans programları, sertifikasyon eğitimleri
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-2">
                    Yöneticilik Becerileri
                  </div>
                  <div className="text-sm text-gray-600">
                    Liderlik, iletişim, takım yönetimi eğitimleri
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-2">
                    Uluslararası Programlar
                  </div>
                  <div className="text-sm text-gray-600">
                    Yurt dışı eğitim ve konferans destekleri
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <BriefcaseIcon className="w-16 h-16 text-green-700 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Açık Pozisyonlar
              </h2>
              <p className="text-lg text-gray-700">
                YatırımPRO ailesine katılmak için başvurunuzu yapın
              </p>
            </div>

            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {position.title}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            {position.department}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                            {position.location}
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                            {position.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Aranan Nitelikler:
                      </h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-gray-700 text-sm"
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
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-t-4 border-green-600">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  İş ve Staj Başvurusu
                </h2>
                <p className="text-lg text-gray-700">
                  Personel alımına ilişkin kriterler yazılı olarak belirlenir ve
                  uygulamada bu kriterlere uyulur. İş ve staj başvurularınız
                  için aşağıdaki formu doldurun.
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
                    İnsan Kaynakları ekibimiz başvurunuzu değerlendirerek en
                    kısa sürede size dönüş yapacaktır.
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="+90 (5xx) xxx xx xx"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Başvurmak İstediğiniz Pozisyon{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Pozisyon seçiniz</option>
                        {openPositions.map((pos, idx) => (
                          <option key={idx} value={pos.title}>
                            {pos.title}
                          </option>
                        ))}
                        <option value="other">Diğer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      CV (Özgeçmiş) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="cv"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      PDF, DOC veya DOCX formatında (Max 5MB)
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Ön Yazı / Kendinizi Tanıtın
                    </label>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                      placeholder="Kendinizi tanıtın, kariyer hedeflerinizi ve neden bu pozisyona uygun olduğunuzu açıklayın..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {submitting ? "Gönderiliyor..." : "Başvuruyu Gönder"}
                  </button>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <p className="text-sm text-gray-600 text-center">
                    Alternatif olarak CV'nizi{" "}
                    <a
                      href="mailto:ik@yatirimpro.com"
                      className="text-green-700 hover:underline font-semibold"
                    >
                      ik@yatirimpro.com
                    </a>{" "}
                    adresine de gönderebilirsiniz.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">YatırımPRO Ailesi Olun</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Türkiye'nin önde gelen yatırım kuruluşunda kariyer fırsatlarını
            keşfedin ve profesyonel gelişiminize katkı sağlayın.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:ik@yatirimpro.com"
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
              ik@yatirimpro.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
