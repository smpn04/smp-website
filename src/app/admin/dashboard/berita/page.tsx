"use client";

import { useState, useEffect } from "react";

interface Berita {
  id: number;
  judul: string;
  tanggal: string;
  gambar: string;
  ringkasan: string;
}

export default function AdminBeritaPage() {
  const [dataBerita, setDataBerita] = useState<Berita[]>([
    {
      id: 1,
      judul: "Siswa SMP Negeri Raih Juara Olimpiade Sains",
      tanggal: "10 Juli 2026",
      gambar: "",
      ringkasan: "Siswa UPT SMPN 4 Duampanua berhasil meraih medali emas dalam kompetisi sains tingkat kabupaten.",
    },
    {
      id: 2,
      judul: "Kegiatan MPLS Tahun Ajaran Baru",
      tanggal: "8 Juli 2026",
      gambar: "",
      ringkasan: "Pelaksanaan Masa Pengenalan Lingkungan Sekolah berjalan dengan lancar dan penuh semangat.",
    },
    {
      id: 3,
      judul: "Pembukaan PPDB Gelombang 2",
      tanggal: "5 Juli 2026",
      gambar: "",
      ringkasan: "Pendaftaran peserta didik baru gelombang kedua resmi dibuka hingga akhir bulan ini.",
    },
  ]);

  const [form, setForm] = useState({
    judul: "",
    tanggal: "",
    gambar: "",
    ringkasan: "",
  });

  // Load berita dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("beritaSekolah");
    if (saved) {
      setDataBerita(JSON.parse(saved));
    }
  }, []);

  // Upload Gambar Berita
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, gambar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTambah = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.judul) return;

    const beritaBaru: Berita = {
      id: Date.now(),
      ...form,
    };

    const updated = [beritaBaru, ...dataBerita];
    setDataBerita(updated);
    localStorage.setItem("beritaSekolah", JSON.stringify(updated));

    // Reset Form
    setForm({ judul: "", tanggal: "", gambar: "", ringkasan: "" });
  };

  const handleHapus = (id: number) => {
    const updated = dataBerita.filter((item) => item.id !== id);
    setDataBerita(updated);
    localStorage.setItem("beritaSekolah", JSON.stringify(updated));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Kelola Berita Sekolah</h1>
        <p className="text-sm text-gray-500">
          Tambah berita kegiatan atau prestasi sekolah yang akan tampil di Halaman Depan.
        </p>
      </div>

      {/* Form Tambah Berita */}
      <form
        onSubmit={handleTambah}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4"
      >
        <h2 className="text-lg font-bold text-blue-900 border-b pb-2">
          + Tambah Berita Baru
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Judul Berita
            </label>
            <input
              type="text"
              placeholder="Contoh: Siswa Juara Lomba Melukis"
              value={form.judul}
              onChange={(e) => setForm({ ...form, judul: e.target.value })}
              className="w-full border p-2.5 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Tanggal Berita
            </label>
            <input
              type="text"
              placeholder="Contoh: 15 Juli 2026"
              value={form.tanggal}
              onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
              className="w-full border p-2.5 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Foto Berita / Header
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {form.gambar && (
          <img
            src={form.gambar}
            alt="Preview"
            className="h-32 w-56 object-cover rounded-lg border"
          />
        )}

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Ringkasan Berita
          </label>
          <textarea
            rows={3}
            placeholder="Tuliskan ringkasan singkat berita..."
            value={form.ringkasan}
            onChange={(e) => setForm({ ...form, ringkasan: e.target.value })}
            className="w-full border p-2.5 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition"
        >
          💾 Terbitkan Berita
        </button>
      </form>

      {/* Daftar Berita */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-800">Daftar Berita Aktif</h2>
        <div className="divide-y divide-gray-100">
          {dataBerita.map((item) => (
            <div key={item.id} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {item.gambar ? (
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="h-16 w-24 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="h-16 w-24 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                    No Image
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">{item.judul}</h3>
                  <span className="text-xs text-blue-600">{item.tanggal}</span>
                </div>
              </div>
              <button
                onClick={() => handleHapus(item.id)}
                className="text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-semibold"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}