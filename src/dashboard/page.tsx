import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">

      <aside className="w-64 bg-blue-900 p-6 text-white">

        <h1 className="mb-10 text-2xl font-bold">
          Admin SMP
        </h1>

        <nav className="space-y-4">

          <Link href="/admin/dashboard" className="block">
            🏠 Dashboard
          </Link>

          <Link href="/admin/profil" className="block">
            📄 Profil
          </Link>

          <Link href="/admin/guru" className="block">
            👨‍🏫 Guru
          </Link>

          <Link href="/admin/akademik" className="block">
            📚 Akademik
          </Link>

          <Link href="/admin/prestasi" className="block">
            🏆 Prestasi
          </Link>

          <Link href="/admin/ppdb" className="block">
            📝 PPDB
          </Link>

          <Link href="/admin/berita" className="block">
            📰 Berita
          </Link>

          <Link href="/admin/galeri" className="block">
            🖼️ Galeri
          </Link>

          <Link href="/admin/kontak" className="block">
            ☎ Kontak
          </Link>

        </nav>

      </aside>

      <main className="flex-1 bg-gray-100 p-10">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-3 text-gray-600">
          Selamat datang di Panel Admin Website UPT SMP Negeri 4 Duampanua.
        </p>

      </main>

    </div>
  );
}