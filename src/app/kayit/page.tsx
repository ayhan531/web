'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Reveal from '@/components/Reveal';

export default function KayitPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Kayıt başarısız');
        setLoading(false);
        return;
      }

      router.push('/');
      router.refresh();
    } catch (err) {
      setError('Bir hata oluştu');
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <Reveal>
          <h1 className="text-3xl font-bold">Kayıt Ol</h1>
          <p className="mt-2 text-[var(--text-light)]">Hızlıca bir hesap oluşturun.</p>
        </Reveal>

        <Reveal delayMs={120}>
          <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-4 rounded-lg bg-[var(--surface)] p-6 shadow-sm">
            {error && (
              <div className="rounded bg-red-50 p-3 text-sm text-red-600">{error}</div>
            )}
            <div>
              <label className="mb-1 block text-sm font-medium">Ad Soyad</label>
              <input 
                className="w-full rounded border border-[var(--border-color)] p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">E-posta</label>
              <input 
                className="w-full rounded border border-[var(--border-color)] p-2" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Şifre</label>
              <input 
                className="w-full rounded border border-[var(--border-color)] p-2" 
                type="password" 
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="glow w-full rounded-md bg-[var(--primary)] px-4 py-2 font-medium text-white hover:bg-[var(--primary-dark)] disabled:opacity-50"
            >
              {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
            </button>
            <p className="text-center text-sm text-[var(--text-light)]">
              Zaten hesabınız var mı? <a href="/giris" className="text-[var(--primary)] hover:underline">Giriş yapın</a>
            </p>
          </form>
        </Reveal>
      </main>
    </>
  );
}
