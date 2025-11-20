'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Reveal from '@/components/Reveal';
import LoadingButton from '@/components/LoadingButton';
import FormInput from '@/components/FormInput';
import { validateEmail } from '@/lib/validation';
import { showToast } from '@/components/Toast';

export default function GirisPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!email || !password) {
      setError('Lütfen tüm alanları doldurunuz');
      showToast('Lütfen tüm alanları doldurunuz', 'error');
      return;
    }

    if (!validateEmail(email)) {
      setError('Geçerli bir email adresi girin');
      showToast('Geçerli bir email adresi girin', 'error');
      return;
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      showToast('Şifre en az 6 karakter olmalıdır', 'error');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.error || 'Giriş başarısız';
        setError(errorMsg);
        showToast(errorMsg, 'error');
        setLoading(false);
        return;
      }

      showToast('Giriş başarılı!', 'success');
      
      // Admin kullanıcıları admin panele, diğerleri ana sayfaya yönlendir
      if (data.user?.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
      }
      router.refresh();
    } catch (err) {
      const errorMsg = 'Bir hata oluştu';
      setError(errorMsg);
      showToast(errorMsg, 'error');
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <Reveal>
          <h1 className="text-3xl font-bold">Giriş Yap</h1>
          <p className="mt-2 text-[var(--text-light)]">Hesabınıza erişin.</p>
        </Reveal>

        <Reveal delayMs={120}>
          <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-4 rounded-lg bg-[var(--surface)] p-6 shadow-sm">
            {error && (
              <div className="rounded bg-red-50 p-3 text-sm text-red-600 flex items-center gap-2">
                <span>✕</span> {error}
              </div>
            )}
            <FormInput 
              label="E-posta"
              type="email" 
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              validator={(val) => ({
                valid: validateEmail(val) || val === '',
                error: 'Geçerli bir email adresi girin'
              })}
            />
            <FormInput 
              label="Şifre"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              validator={(val) => ({
                valid: val.length >= 6 || val === '',
                error: 'Şifre en az 6 karakter olmalıdır'
              })}
              helperText="En az 6 karakter"
            />
            <LoadingButton 
              type="submit" 
              loading={loading}
              className="w-full"
            >
              Giriş Yap
            </LoadingButton>
            <p className="text-center text-sm text-[var(--text-light)]">
              Hesabınız yok mu? <a href="/kayit" className="text-[var(--primary)] hover:underline">Kayıt olun</a>
            </p>
          </form>
        </Reveal>
      </main>
    </>
  );
}
