import { prisma } from "@/lib/prisma";

export default async function PrincipalWelcome() {
  // Ambil data profil dari database
  // @ts-ignore
  const profil = await prisma.profilSekolah.findFirst();

  const kepalaSekolah = profil?.kepalaSekolah || "Nama Kepala Sekolah, S.Pd., M.Pd.";
  const sambutan = profil?.sambutan || "Selamat datang di website resmi UPT SMP Negeri 4 Duampanua.";
  const fotoKepsek = profil?.fotoKepsek;

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* FOTO KEPALA SEKOLAH */}
          <div className="w-full md:w-1/3 flex justify-center">
            {fotoKepsek ? (
              <img
                src={fotoKepsek}
                alt={kepalaSekolah}
                className="w-64 h-80 object-cover rounded-2xl shadow-lg border-4 border-white"
              />
            ) : (
              <div className="w-64 h-80 bg-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-500 text-center p-4 border-2 border-dashed border-gray-300">
                <span className="text-4xl mb-2">👨‍🏫</span>
                <p className="text-xs">Belum ada foto. Upload melalui Admin Profil.</p>
              </div>
            )}
          </div>

          {/* TEKS SAMBUTAN */}
          <div className="w-full md:w-2/3 space-y-4">
            <h2 className="text-3xl font-bold text-slate-800 border-b-4 border-blue-900 pb-2 inline-block">
              Sambutan Kepala Sekolah
            </h2>
            <p className="text-slate-600 italic text-lg leading-relaxed">
              "{sambutan}"
            </p>
            <div>
              <h3 className="text-xl font-bold text-blue-900">{kepalaSekolah}</h3>
              <p className="text-sm text-slate-500">Kepala UPT SMPN 4 Duampanua</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}