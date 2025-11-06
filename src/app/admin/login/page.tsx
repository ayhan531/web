'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@local');
  const [password, setPassword] = useState('Admin123!');
  const router = useRouter();

  async function submit(e: any) {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.ok) {
      // Server set HttpOnly cookie. Just redirect to admin.
      router.push('/admin');
    } else {
      alert('Giriş başarısız: ' + (data.error || 'unknown'));
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Admin Girişi</h1>
      <form onSubmit={submit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Şifre</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
    </main>
  );
}
