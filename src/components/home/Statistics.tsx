import { prisma } from "@/lib/prisma";

export default async function Statistics() {
  // Ambil data profil dari database
  // @ts-ignore
  const profil = await prisma.profilSekolah.findFirst();

  const stats = [
    { label: "Siswa Aktif", value: profil?.jumlahSiswa || "350+", icon: "🎓" },
    { label: "Guru & Staf", value: profil?.jumlahGuru || "25+", icon: "👩‍🏫" },
    { label: "Rombongan Belajar", value: profil?.jumlahKelas || "12", icon: "🏫" },
    { label: "Prestasi Diraih", value: profil?.jumlahPrestasi || "45+", icon: "🏆" },
  ];

  return (
    <section className="bg-blue-900 py-12 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((item, index) => (
            <div key={index} className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="text-3xl font-extrabold">{item.value}</div>
              <div className="text-sm text-blue-100 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}