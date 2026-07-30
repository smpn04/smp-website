"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image?: string | null;
}

export default function AdminBeritaPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/admin/berita");
      const data = await res.json();
      if (Array.isArray(data)) {
        setNewsList(data);
      } else if (data?.data && Array.isArray(data.data)) {
        setNewsList(data.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data berita:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Hapus Berita
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;

    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/berita/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setNewsList((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("Gagal menghapus berita!");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan jaringan!");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Berita</h1>
        <Link
          href="/admin/berita/tambah"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Tambah Berita
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300 text-gray-700 text-sm">
              <th className="p-3 border-r border-gray-200 text-center w-12">No</th>
              <th className="p-3 border-r border-gray-200 text-center w-36">Foto</th>
              <th className="p-3 border-r border-gray-200">Judul</th>
              <th className="p-3 border-r border-gray-200 w-36">Tanggal</th>
              <th className="p-3 text-center w-48">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-400">
                  Memuat data berita...
                </td>
              </tr>
            ) : newsList.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  Belum ada berita.
                </td>
              </tr>
            ) : (
              newsList.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 text-sm">
                  <td className="p-3 border-r border-gray-200 text-center font-medium">
                    {index + 1}
                  </td>
                  <td className="p-3 border-r border-gray-200 text-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-16 object-cover rounded mx-auto border"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="p-3 border-r border-gray-200 font-medium text-gray-800">
                    {item.title}
                  </td>
                  <td className="p-3 border-r border-gray-200 text-gray-600">
                    {item.date ? new Date(item.date).toLocaleDateString("id-ID") : "-"}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        href={`/admin/berita/edit/${item.id}`}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded transition"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        disabled={actionLoading === item.id}
                        onClick={() => handleDelete(item.id)}
                        className={`px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded transition ${
                          actionLoading === item.id ? "opacity-50" : ""
                        }`}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}