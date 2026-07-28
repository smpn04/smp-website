"use client";

import { useState, useEffect } from "react";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  published: boolean;
}

export default function AdminBeritaPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Form State
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  // Ambil daftar berita saat halaman dimuat
  const fetchNews = async () => {
    try {
      const res = await fetch("/api/admin/berita");
      const result = await res.json();
      if (result.success && Array.isArray(result.data)) {
        setNewsList(result.data);
      } else if (Array.isArray(result)) {
        setNewsList(result);
      }
    } catch (err) {
      console.error("Gagal mengambil data berita:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Handler Upload Foto + Kompresi Otomatis
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        // Resize canvas untuk memperkecil resolusi foto
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const scale = MAX_WIDTH / img.width;

        if (scale < 1) {
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Kompres ke JPEG dengan kualitas 70% (ukuran jadi sangat kecil & aman untuk Prisma)
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        setImage(compressedBase64);
      };
    };
    reader.readAsDataURL(file);
  };

  // Submit Form Berita Baru
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert("Judul berita tidak boleh kosong!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/berita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          date,
          excerpt,
          content,
          image,
          published: false,
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        alert("Berita berhasil disimpan!");
        // Reset form
        setTitle("");
        setExcerpt("");
        setContent("");
        setImage("");
        fetchNews(); // Reload daftar berita
      } else {
        alert(`Gagal: ${result.message || "Terjadi kesalahan pada server"}`);
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Kelola Berita Sekolah
        </h1>
        <p className="text-sm text-slate-500">
          Tambah dan publikasikan berita terbaru UPT SMPN 4 Duampanua.
        </p>
      </div>

      {/* Form Tambah Berita */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4"
      >
        <h2 className="text-lg font-semibold text-slate-700 mb-2">
          Tambah Berita Baru
        </h2>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Judul Berita *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul berita..."
            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Tanggal *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Foto Berita
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        {/* Preview Foto Jika Ada */}
        {image && (
          <div className="mt-2">
            <span className="text-xs text-slate-500 block mb-1">Preview Foto:</span>
            <img
              src={image}
              alt="Preview"
              className="h-32 w-auto object-cover rounded-lg border"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Ringkasan Berita
          </label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Ringkasan singkat untuk ditampilkan di halaman depan..."
            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Isi Berita Lengkap
          </label>
          <textarea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tuliskan isi berita secara detail di sini..."
            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Berita"}
        </button>
      </form>

      {/* Tabel Daftar Berita */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">
          Daftar Berita Tersimpan
        </h2>

        {fetching ? (
          <p className="text-xs text-slate-400">Memuat berita...</p>
        ) : newsList.length === 0 ? (
          <p className="text-xs text-slate-400">Belum ada berita tersimpan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b">
                <tr>
                  <th className="py-3 px-4">Foto</th>
                  <th className="py-3 px-4">Judul</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {newsList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-10 w-14 object-cover rounded"
                        />
                      ) : (
                        <span className="text-xs text-slate-400">Tidak ada</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">
                      {item.title}
                    </td>
                    <td className="py-3 px-4 text-xs">{item.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-[10px] font-bold rounded-full ${
                          item.published
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.published ? "Published" : "Draft"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}