"use client";

import { useEffect, useState } from "react";

export default function Statistics() {
  const [stats, setStats] = useState({
    jumlahSiswa: "350+",
    jumlahGuru: "25+",
    jumlahKelas: "12",
    jumlahPrestasi: "45+",
  });

  useEffect(() => {
    // Ambil data langsung dari API Server agar konsisten di semua HP & Laptop
    async function fetchProfil() {
      try {
        const res = await fetch("/api/admin/profil", { cache: "no-store" });
        if (res.ok) {
          const result = await res.json();
          const data = result.data || result;
          
          setStats({
            jumlahSiswa: data.jumlahSiswa || "350+",
            jumlahGuru: data.jumlahGuru || "25+",
            jumlahKelas: data.jumlahKelas || "12",
            jumlahPrestasi: data.jumlahPrestasi || "45+",
          });
        }
      } catch (error) {
        console.error("Gagal mengambil data statistik:", error);
      }
    }

    fetchProfil();
  }, []);

  const items = [
    { label: "Siswa Aktif", value: stats.jumlahSiswa, icon: "👨‍🎓" },
    { label: "Guru & Staf", value: stats.jumlahGuru, icon: "👩‍🏫" },
    { label: "Rombongan Belajar", value: stats.jumlahKelas, icon: "🏫" },
    { label: "Prestasi Diraih", value: stats.jumlahPrestasi, icon: "🏆" },
  ];

  return (
    <section className="bg-blue-900 py-12 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((item, index) => (
            <div
              key={index}
              className="space-y-2 p-4 rounded-xl bg-blue-800/40 border border-blue-700/50"
            >
              <div className="text-4xl">{item.icon}</div>
              <div className="text-3xl md:text-4xl font-extrabold text-yellow-400">
                {item.value}
              </div>
              <div className="text-xs md:text-sm font-medium text-slate-200">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}