import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const totalBerita = await prisma.news.count();
  const totalGuru = await prisma.teacher.count();
  const totalGaleri = await prisma.gallery.count();
  const totalPPDB = await prisma.pPDB.count();

  return (
    <>
      <h1 className="text-4xl font-bold">
        Dashboard Admin
      </h1>

      <p className="mt-2 text-gray-600">
        Selamat datang di Panel Admin Website UPT SMP Negeri 4 Duampanua.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl bg-blue-600 p-6 text-white shadow-lg">
          <h2 className="text-lg font-semibold">
            📰 Total Berita
          </h2>

          <p className="mt-4 text-5xl font-bold">
            {totalBerita}
          </p>
        </div>

        <div className="rounded-xl bg-green-600 p-6 text-white shadow-lg">
          <h2 className="text-lg font-semibold">
            👨‍🏫 Total Guru
          </h2>

          <p className="mt-4 text-5xl font-bold">
            {totalGuru}
          </p>
        </div>

        <div className="rounded-xl bg-purple-600 p-6 text-white shadow-lg">
          <h2 className="text-lg font-semibold">
            🖼 Total Galeri
          </h2>

          <p className="mt-4 text-5xl font-bold">
            {totalGaleri}
          </p>
        </div>

        <div className="rounded-xl bg-orange-500 p-6 text-white shadow-lg">
          <h2 className="text-lg font-semibold">
            📝 Total PPDB
          </h2>

          <p className="mt-4 text-5xl font-bold">
            {totalPPDB}
          </p>
        </div>

      </div>
    </>
  );
}