'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'Borsa Trading Platform',
    email: 'admin@company.com',
    phone: '+90 (212) 555-0123',
    address: 'İstanbul, Türkiye',
    timezone: 'Europe/Istanbul',
    language: 'tr',
    theme: 'light',
    notifications: true,
    emailAlerts: true,
    pushNotifications: false,
    twoFactor: true,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Ayarlar</h1>
        <p className="text-gray-600 mt-1">Sistem ve hesap ayarlarını yönetin</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          ✓ Ayarlar başarıyla kaydedildi
        </div>
      )}

      {/* Şirket Bilgileri */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Şirket Bilgileri</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Şirket Adı</label>
            <input
              type="text"
              value={settings.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Telefon</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Adres</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Sistem Ayarları */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Sistem Ayarları</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Saat Dilimi</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="Europe/Istanbul">Europe/Istanbul (UTC+3)</option>
                <option value="Europe/London">Europe/London (UTC+0)</option>
                <option value="America/New_York">America/New_York (UTC-5)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Dil</label>
              <select
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tema</label>
            <select
              value={settings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="light">Açık Tema</option>
              <option value="dark">Koyu Tema</option>
              <option value="auto">Otomatik</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bildirim Ayarları */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Bildirim Ayarları</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Bildirimleri Etkinleştir</span>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleChange('notifications', e.target.checked)}
              className="w-5 h-5"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Email Uyarıları</span>
            <input
              type="checkbox"
              checked={settings.emailAlerts}
              onChange={(e) => handleChange('emailAlerts', e.target.checked)}
              className="w-5 h-5"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Push Bildirimleri</span>
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) => handleChange('pushNotifications', e.target.checked)}
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>

      {/* Güvenlik Ayarları */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Güvenlik Ayarları</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">İki Faktörlü Kimlik Doğrulama</p>
              <p className="text-sm text-gray-600">Hesabınızı daha güvenli hale getirin</p>
            </div>
            <input
              type="checkbox"
              checked={settings.twoFactor}
              onChange={(e) => handleChange('twoFactor', e.target.checked)}
              className="w-5 h-5"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Şifreyi Değiştir
          </button>
        </div>
      </div>

      {/* Kaydet Butonu */}
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          💾 Kaydet
        </button>
        <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400">
          ↺ Sıfırla
        </button>
      </div>
    </div>
  );
}
