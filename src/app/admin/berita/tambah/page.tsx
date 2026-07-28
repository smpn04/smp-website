"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TambahBeritaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // Indikator status upload file ke Vercel Blob

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(""); // Menyimpan URL hasil upload Vercel Blob
  const [fileName, setFileName] = useState("");

  // Handler Upload Foto langsung ke API Vercel Blob
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Panggil API Upload Vercel Blob kamu
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok && result.success && result.url) {
        setImage(result.url); // 🎯 MASUKKAN URL HASIL UPLOAD KE STATE
        console.log("Upload berhasil, URL:", result.url);
      } else {
        alert(`Gagal upload foto: ${result.message || "Terjadi kesalahan"}`);
        setImage("");
      }
    } catch (error: any) {
      alert(`Error saat upload foto: ${error.message}`);
      setImage("");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("Judul berita harus diisi!");
      return;
    }

    if (uploading) {
      alert("Proses upload foto belum selesai. Mohon tunggu sebentar!");
      return;
    }

    setLoading(true);

    try {
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
          image, // URL dari Vercel Blob dikirim ke database Prisma
          published: false,
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        alert("Berita dan foto berhasil disimpan!");
        router.push("/admin/berita");
        router.refresh();
      } else {
        alert(`Gagal menyimpan: ${result.message || "Terjadi kesalahan server"}`);
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
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
              onChange={handleFileSelect}
              className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {uploading && (
              <p className="text-xs text-blue-600 mt-1 font-medium animate-pulse">
                ⏳ Mengunggah foto ke server...
              </p>
            )}
            {fileName && !uploading && image && (
              <p className="text-xs text-green-600 mt-1 font-medium">
                ✓ Foto berhasil diunggah!
              </p>
            )}
          </div>
        </div>

        {image && !uploading && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Preview Foto (Siap Simpan):</p>
            <img
              src={image}
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
          disabled={loading || uploading}
          className="rounded-lg bg-blue-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-800 disabled:opacity-50 transition"
        >
          {loading ? "Menyimpan Berita..." : uploading ? "Mengunggah Foto..." : "Simpan Berita"}
        </button>
      </form>
    </div>
  );
}