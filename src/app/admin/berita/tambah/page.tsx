"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TambahBeritaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("Judul berita wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      let finalImageUrl = "";

      // TAHAP 1: UPLOAD GAMBAR
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadResult = await uploadRes.json();

        // 🔍 DEBUG ALERT 1
        if (!uploadRes.ok || !uploadResult.success) {
          alert(`[GAGAL DI TAHAP 1 - UPLOAD API]\nPesan: ${uploadResult.message || "Gagal upload ke Vercel Blob"}`);
          setLoading(false);
          return;
        }

        finalImageUrl = uploadResult.url;
        alert(`[TAHAP 1 BERHASIL]\nURL Gambar: ${finalImageUrl}`);
      }

      // TAHAP 2: SIMPAN KE DATABASE
      const res = await fetch("/api/admin/berita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          date,
          excerpt,
          content,
          image: finalImageUrl,
          published: false,
        }),
      });

      const result = await res.json();

      // 🔍 DEBUG ALERT 2
      if (res.ok && result.success) {
        alert("Berita Berhasil Disimpan ke Database!");
        router.push("/admin/berita");
        router.refresh();
      } else {
        alert(`[GAGAL DI TAHAP 2 - PRISMA DB]\nPesan: ${result.message || "Gagal menyimpan ke database"}`);
      }
    } catch (error: any) {
      alert(`[ERROR SYSTEM]: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-900">Tambah Berita Baru</h1>
        <Link
          href="/admin/berita"
          className="rounded bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-600 transition"
        >
          Kembali
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Judul Berita *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Masukkan judul berita..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Tanggal *
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded border p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Foto Berita
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        {previewUrl && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Preview Foto Terpilih:</p>
            <img
              src={previewUrl}
              alt="Preview"
              className="h-36 w-auto rounded border object-cover shadow-sm"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Ringkasan Berita
          </label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full rounded border p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Ringkasan singkat berita..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Isi Berita Lengkap
          </label>
          <textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded border p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Tuliskan berita lengkap di sini..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-800 disabled:opacity-50 transition"
        >
          {loading ? "Proses..." : "Simpan Berita"}
        </button>
      </form>
    </div>
  );
}