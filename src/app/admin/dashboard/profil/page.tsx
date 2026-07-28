"use client";

import { useState } from "react";

export default function AdminProfilPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    namaSekolah: "UPT SMP Negeri 4 Duampanua",
    kepalaSekolah: "Nama Kepala Sekolah, S.Pd., M.Pd.",
    sambutan: "Selamat datang di website resmi UPT SMP Negeri 4 Duampanua...",
    visi: "Terwujudnya peserta didik yang berprestasi, berkarakter, unggul, dan berwawasan lingkungan.",
    misi: "1. Menyelenggarakan pembelajaran yang berkualitas.\n2. Membentuk karakter siswa yang religius dan berbudi pekerti luhur.",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated API Call
    setTimeout(() => {
      setLoading(false);
      alert("Data profil berhasil diperbarui!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Kelola Profil Sekolah</h1>
        <p className="text-sm text-gray-500">
          Ubah informasi umum, visi, misi, dan sambutan kepala sekolah.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl bg-white p-6 shadow-sm border border-gray-100"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Sekolah
            </label>
            <input
              type="text"
              name="namaSekolah"
              value={formData.namaSekolah}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Kepala Sekolah
            </label>
            <input
              type="text"
              name="kepalaSekolah"
              value={formData.kepalaSekolah}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sambutan Kepala Sekolah
          </label>
          <textarea
            name="sambutan"
            rows={4}
            value={formData.sambutan}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Visi Sekolah
          </label>
          <textarea
            name="visi"
            rows={3}
            value={formData.visi}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Misi Sekolah
          </label>
          <textarea
            name="misi"
            rows={4}
            value={formData.misi}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}