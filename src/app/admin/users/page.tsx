'use client';

import { useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
  account?: {
    balance: number;
    totalInvested: number;
    totalReturns: number;
  };
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState('USER');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError('Kullanıcılar yüklenemedi');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: number) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (!res.ok) throw new Error('Failed to update user');
      
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      setSelectedUser(null);
    } catch (err) {
      setError('Rol güncellenemedi');
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) return;

    try {
      const res = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) throw new Error('Failed to delete user');
      
      setUsers(users.filter(u => u.id !== userId));
    } catch (err) {
      setError('Kullanıcı silinemedi');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Kullanıcı Yönetimi</h1>
        <p className="text-gray-600 mt-1">Tüm kullanıcıları yönetin ve rollerini düzenleyin</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Ad</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Rol</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Bakiye</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Toplam Yatırım</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Kayıt Tarihi</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{user.email}</td>
                  <td className="px-6 py-4">{user.name || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'ADMIN' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'ADMIN' ? '👑 Admin' : '👤 Kullanıcı'}
                    </span>
                  </td>
                  <td className="px-6 py-4">${user.account?.balance.toFixed(2) || '0.00'}</td>
                  <td className="px-6 py-4">${user.account?.totalInvested.toFixed(2) || '0.00'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setNewRole(user.role);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Rol Değiştir
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rol Değiştirme Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Rol Değiştir</h2>
            <p className="text-gray-600 mb-4">{selectedUser.email}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Yeni Rol</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="USER">Kullanıcı</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleRoleChange(selectedUser.id)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Kaydet
                </button>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
