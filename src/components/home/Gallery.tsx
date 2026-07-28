"use client";

import { useEffect, useState } from "react";

interface ItemGaleri {
  id?: number | string;
  judul?: string;
  foto?: string;
  gambar?: string;
  url?: string;
}

export default function Gallery() {
  const [galeriList, setGaleriList] = useState<ItemGaleri[]>([]);

  useEffect(() => {
    const saved =
      localStorage.getItem("galeriSekolah") ||
      localStorage.getItem("galeri") ||
      localStorage.getItem("galleryData");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setGaleriList(parsed);
        }
      } catch (e) {
        console.error("Error parsing galeri:", e);
      }
    }
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900">Galeri Sekolah</h2>
          <p className="mt-2 text-sm text-slate-600">
            Dokumentasi berbagai kegiatan dan fasilitas sekolah.
          </p>
        </div>

        {galeriList.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-56 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-4 text-center"
              >
                <span className="text-3xl mb-2">🖼️</span>
                <span className="text-xs text-slate-400 font-medium">
                  Foto Galeri #{i} (Kelola di Admin Galeri)
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {galeriList.map((item, index) => {
              const imageSrc = item.foto || item.gambar || item.url;
              return (
                <div
                  key={item.id || index}
                  className="h-56 rounded-2xl overflow-hidden shadow-sm border border-slate-200 group relative"
                >
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={item.judul || `Galeri ${index + 1}`}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
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
        )}
      </div>
    </section>
  );
}