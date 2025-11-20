'use client';

import { useEffect, useState } from 'react';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  joinDate: string;
  status: 'active' | 'inactive';
}

export default function HRPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: '',
  });

  useEffect(() => {
    // Mock veriler
    setEmployees([
      {
        id: 1,
        name: 'Ahmet Yılmaz',
        email: 'ahmet@company.com',
        position: 'Yazılım Mühendisi',
        department: 'Teknoloji',
        salary: 85000,
        joinDate: '2022-01-15',
        status: 'active',
      },
      {
        id: 2,
        name: 'Ayşe Kaya',
        email: 'ayse@company.com',
        position: 'Proje Yöneticisi',
        department: 'Yönetim',
        salary: 95000,
        joinDate: '2021-06-20',
        status: 'active',
      },
      {
        id: 3,
        name: 'Mehmet Demir',
        email: 'mehmet@company.com',
        position: 'Veri Analisti',
        department: 'Analitik',
        salary: 75000,
        joinDate: '2023-03-10',
        status: 'active',
      },
      {
        id: 4,
        name: 'Fatma Çetin',
        email: 'fatma@company.com',
        position: 'İnsan Kaynakları Müdürü',
        department: 'İnsan Kaynakları',
        salary: 105000,
        joinDate: '2020-01-01',
        status: 'active',
      },
      {
        id: 5,
        name: 'Emre Şahin',
        email: 'emre@company.com',
        position: 'Pazarlama Uzmanı',
        department: 'Pazarlama',
        salary: 70000,
        joinDate: '2022-09-15',
        status: 'active',
      },
    ]);
    setLoading(false);
  }, []);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee: Employee = {
      id: employees.length + 1,
      name: formData.name,
      email: formData.email,
      position: formData.position,
      department: formData.department,
      salary: parseInt(formData.salary),
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
    };
    setEmployees([...employees, newEmployee]);
    setFormData({ name: '', email: '', position: '', department: '', salary: '' });
    setShowForm(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">İnsan Kaynakları</h1>
          <p className="text-gray-600 mt-1">Çalışan yönetimi ve insan kaynakları</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'İptal' : '+ Yeni Çalışan'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Yeni Çalışan Ekle</h2>
          <form onSubmit={handleAddEmployee} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Ad Soyad"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Pozisyon"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Departman"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="number"
                placeholder="Maaş"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Ekle
            </button>
          </form>
        </div>
      )}

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Toplam Çalışan</p>
          <p className="text-3xl font-bold mt-2">{employees.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Aktif Çalışan</p>
          <p className="text-3xl font-bold mt-2">{employees.filter(e => e.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Ortalama Maaş</p>
          <p className="text-3xl font-bold mt-2">
            ${(employees.reduce((sum, e) => sum + e.salary, 0) / employees.length).toFixed(0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Departman Sayısı</p>
          <p className="text-3xl font-bold mt-2">
            {new Set(employees.map(e => e.department)).size}
          </p>
        </div>
      </div>

      {/* Çalışan Listesi */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Ad Soyad</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Pozisyon</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Departman</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Maaş</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Başlama Tarihi</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{employee.name}</td>
                  <td className="px-6 py-4">{employee.email}</td>
                  <td className="px-6 py-4">{employee.position}</td>
                  <td className="px-6 py-4">{employee.department}</td>
                  <td className="px-6 py-4">${employee.salary.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(employee.joinDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Aktif
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
