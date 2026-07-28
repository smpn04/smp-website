"use client";

import { useEffect, useState } from "react";

export default function Gallery() {
  const [galeriList, setGaleriList] = useState<any[]>([]);

  useEffect(() => {
    const saved =
      localStorage.getItem("galeriSekolah") ||
      localStorage.getItem("galeri") ||
      localStorage.getItem("galleryData");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setGaleriList(parsed);
        }
      } catch (e) {
        console.error("Gagal membaca galeri:", e);
      }
    }
  }, []);

  const defaultGaleri = [
    { id: 1, gambar: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=60", judul: "Kegiatan Belajar" },
    { id: 2, gambar: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=60", judul: "Ruang Kelas" },
    { id: 3, gambar: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&auto=format&fit=crop&q=60", judul: "Upacara Bendera" },
    { id: 4, gambar: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=60", judul: "Ekstrakurikuler" },
    { id: 5, gambar: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=60", judul: "Fasilitas Perpustakaan" },
    { id: 6, gambar: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=60", judul: "Olahraga" },
  ];

  const displayGaleri = galeriList.length > 0 ? galeriList : defaultGaleri;

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900">Galeri Sekolah</h2>
          <p className="mt-2 text-sm text-slate-600">
            Dokumentasi berbagai kegiatan dan fasilitas sekolah.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayGaleri.map((item, index) => {
            const imgSrc =
              item.foto ||
              item.gambar ||
              item.url ||
              item.imageUrl;

            return (
              <div
                key={item.id || index}
                className="h-56 rounded-2xl overflow-hidden shadow-sm border border-slate-200 group relative bg-slate-100"
              >
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={item.judul || `Galeri ${index + 1}`}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs">
                    Foto Tidak Tersedia
                  </div>
                )}
                {item.judul && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-xs font-semibold">
                    {item.judul}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}