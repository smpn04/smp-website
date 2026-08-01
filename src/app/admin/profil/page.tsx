"use client";

import { useState, useEffect } from "react";

export default function AdminProfilPage() {
  const [loading, setLoading] = useState(false);
  const [sukses, setSukses] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    kepalaSekolah: "Nama Kepala Sekolah, S.Pd., M.Pd.",
    fotoKepsek: "",
    sambutan: "Assalamu’alaikum Warahmatullahi Wabarakatuh.",
    jumlahSiswa: "350+",
    jumlahGuru: "25+",
    jumlahKelas: "12",
    jumlahPrestasi: "45+",
  });

  useEffect(() => {
    fetch("/api/admin/profil")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setFormData((prev) => ({ ...prev, ...res.data }));
        }
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const body = new FormData();
    body.append("kepalaSekolah", formData.kepalaSekolah);
    body.append("sambutan", formData.sambutan);
    body.append("jumlahSiswa", formData.jumlahSiswa);
    body.append("jumlahGuru", formData.jumlahGuru);
    body.append("jumlahKelas", formData.jumlahKelas);
    body.append("jumlahPrestasi", formData.jumlahPrestasi);
    body.append("existingFoto", formData.fotoKepsek);

    if (selectedFile) {
      body.append("fotoKepsek", selectedFile);
    }

    try {
      const res = await fetch("/api/admin/profil", {
        method: "POST",
        body,
      });

      if (res.ok) {
        setSukses(true);
        setTimeout(() => setSukses(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Edit Profil, Sambutan & Statistik
        </h1>
        <p className="text-sm text-gray-500">
          Ubah informasi sekolah, foto, dan angka statistik yang tampil di Halaman Depan.
        </p>
      </div>

      {sukses && (
        <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg text-sm font-medium">
          ✅ Berhasil disimpan ke Database & Cloudinary! Perubahan sudah aktif di Halaman Utaman.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-blue-900 border-b pb-2">
          1. Kepala Sekolah & Sambutan
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Kepala Sekolah</label>
            <input
              type="text"
              name="kepalaSekolah"
              value={formData.kepalaSekolah}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Foto Kepala Sekolah</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        {formData.fotoKepsek && (
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">Foto Kepsek Saat Ini:</label>
            <img
              src={formData.fotoKepsek}
              alt="Preview"
              className="h-32 w-28 object-cover rounded-lg border-2 border-blue-900 shadow-sm"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Sambutan Kepala Sekolah</label>
          <textarea
            name="sambutan"
            rows={4}
            value={formData.sambutan}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <h2 className="text-lg font-bold text-blue-900 border-b pb-2 pt-4">
          2. Angka Statistik Sekolah
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Jumlah Siswa</label>
            <input
              type="text"
              name="jumlahSiswa"
              value={formData.jumlahSiswa}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Jumlah Guru</label>
            <input
              type="text"
              name="jumlahGuru"
              value={formData.jumlahGuru}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Rombongan Belajar</label>
            <input
              type="text"
              name="jumlahKelas"
              value={formData.jumlahKelas}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Total Prestasi</label>
            <input
              type="text"
              name="jumlahPrestasi"
              value={formData.jumlahPrestasi}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50 transition"
          >
            {loading ? "Menyimpan ke Cloud..." : "💾 Simpan Semua Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}