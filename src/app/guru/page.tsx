import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

// Memaksa Next.js selalu mengambil data paling baru dari database setiap kali halaman dibuka
export const dynamic = "force-dynamic";

export default async function GuruPage() {
  const teachers = await prisma.teacher.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <>
      <Header />

      <section className="bg-blue-900 py-12 md:py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-3xl md:text-5xl font-bold">Data Guru</h1>

          <p className="mt-2 md:mt-4 text-sm md:text-lg text-blue-100">
            Tenaga pendidik UPT SMP Negeri 4 Duampanua.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-16">
        {teachers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border text-gray-500">
            Belum ada data guru.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="rounded-xl border bg-white p-4 text-center shadow-sm flex flex-col items-center justify-between transition hover:shadow-md"
              >
                {/* Frame Foto (Menggunakan img biasa agar aman dari Cloudinary) */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-slate-100 border-2 border-blue-900 shadow-inner flex items-center justify-center">
                  {teacher.photo ? (
                    <img
                      src={teacher.photo}
                      alt={teacher.name}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-slate-400">
                      <span className="text-3xl">👨‍🏫</span>
                      <span className="text-[10px]">Tanpa Foto</span>
                    </div>
                  )}
                </div>

                {/* Teks Nama & Jabatan (Warna dibuat Hitam Pekat Tajam) */}
                <div className="mt-4 w-full">
                  <h3 className="text-sm sm:text-lg font-extrabold text-slate-900 leading-snug break-words">
                    {teacher.name}
                  </h3>

                  <p className="mt-1.5 text-xs font-semibold text-blue-900 bg-blue-50 py-1 px-2 rounded-md inline-block max-w-full">
                    {teacher.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}