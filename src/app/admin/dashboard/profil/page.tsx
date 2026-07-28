"use client";

import { useState, useEffect } from "react";

export default function AdminProfilPage() {
  const [loading, setLoading] = useState(false);
  const [sukses, setSukses] = useState(false);

  const [formData, setFormData] = useState({
    namaSekolah: "UPT SMP Negeri 4 Duampanua",
    kepalaSekolah: "Nama Kepala Sekolah, S.Pd., M.Pd.",
    fotoKepsek: "", // Menyimpan foto dalam bentuk Data URL / Base64
    sambutan:
      "Assalamu’alaikum Warahmatullahi Wabarakatuh. Selamat datang di website resmi UPT SMP Negeri 4 Duampanua.",
    visi: "Terwujudnya peserta didik yang berprestasi, berkarakter, unggul, dan berwawasan lingkungan.",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("profilSekolah");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fungsi untuk handle upload foto
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          fotoKepsek: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    localStorage.setItem("profilSekolah", JSON.stringify(formData));

    setTimeout(() => {
      setLoading(false);
      setSukses(true);
      setTimeout(() => setSukses(false), 3000);
    }, 500);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Edit Profil & Sambutan
        </h1>
        <p className="text-sm text-gray-500">
          Ubah teks dan foto kepala sekolah yang akan tampil di Halaman Depan.
        </p>
      </div>

      {sukses && (
        <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg text-sm font-medium">
          ✅ Berhasil disimpan! Foto & Teks sudah diperbarui di Halaman Home.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl bg-white p-6 shadow-sm border border-gray-100"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Foto Kepala Sekolah
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        {/* Preview Foto Jika Ada */}
        {formData.fotoKepsek && (
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">
              Preview Foto:
            </label>
            <img
              src={formData.fotoKepsek}
              alt="Preview"
              className="h-32 w-28 object-cover rounded-lg border-2 border-blue-900 shadow-sm"
            />
          </div>
        )}

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

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50 transition"
          >
            {loading ? "Menyimpan..." : "💾 Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}