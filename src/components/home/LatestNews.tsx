"use client";

import { useEffect, useState } from "react";

export default function LatestNews() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewsFromDatabase() {
      try {
        const res = await fetch("/api/admin/berita");
        if (res.ok) {
          const result = await res.json();
          // Menangani jika response berupa { success: true, data: [...] } atau array langsung
          const data = result.data || result;
          if (Array.isArray(data)) {
            // Hanya ambil berita yang statusnya sudah PUBLISHED
            const publishedOnly = data.filter((item) => item.published === true);
            setNewsList(publishedOnly);
          }
        }
      } catch (err) {
        console.error("Gagal mengambil data berita dari database:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNewsFromDatabase();
  }, []);

  // Data Fallback jika database belum ada berita yang di-publish
  const defaultBerita = [
    {
      id: 1,
      title: "Kegiatan MPLS Tahun Ajaran Baru",
      date: "2026-07-13",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=60",
      excerpt: "Pelaksanaan Masa Pengenalan Lingkungan Sekolah UPT SMPN 4 Duampanua.",
    },
    {
      id: 2,
      title: "Pelayanan Public dan Administrasi Sekolah",
      date: "2026-06-27",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=60",
      excerpt: "Peningkatan kualitas layanan administrasi dan informasi publik sekolah.",
    },
  ];

  // Gunakan data dari Prisma jika ada, jika belum ada tampilkan default
  const displayData = newsList.length > 0 ? newsList : defaultBerita;

  return (
    <section className="py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900">Berita Terbaru</h2>
          <p className="mt-2 text-sm text-slate-600">
            Informasi terbaru mengenai kegiatan dan prestasi sekolah.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            Memuat berita terbaru...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayData.slice(0, 3).map((item, index) => {
              const imgSrc =
                item.image ||
                item.foto ||
                item.gambar ||
                item.imageUrl;

              return (
                <div
                  key={item.id || index}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition"
                >
                  <div>
                    <div className="h-52 w-full bg-slate-200 overflow-hidden relative">
                      {imgSrc && imgSrc.trim() !== "" ? (
                        <img
                          src={imgSrc}
                          alt={item.title || item.judul}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm font-semibold">
                          📷 Foto Berita
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <span className="text-xs font-semibold text-slate-400">
                        {item.date || item.tanggal}
                      </span>
                      <h3 className="mt-2 text-lg font-bold text-slate-800 leading-snug">
                        {item.title || item.judul}
                      </h3>
                      {(item.excerpt || item.content || item.ringkasan) && (
                        <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                          {item.excerpt || item.content || item.ringkasan}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button className="rounded-lg bg-blue-900 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800 transition">
                      Baca Selengkapnya
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}