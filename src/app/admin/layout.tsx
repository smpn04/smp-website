import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 p-6 text-white">
        <h1 className="mb-8 text-2xl font-bold">
          Admin SMP
        </h1>

        <nav className="space-y-3">
          <Link
            href="/admin/dashboard"
            className="block hover:text-yellow-300"
          >
            🏠 Dashboard
          </Link>

          <Link
            href="/admin/profil"
            className="block hover:text-yellow-300"
          >
            📄 Profil
          </Link>

          <Link
            href="/admin/guru"
            className="block hover:text-yellow-300"
          >
            👨‍🏫 Guru
          </Link>

          <Link
            href="/admin/akademik"
            className="block hover:text-yellow-300"
          >
            📚 Akademik
          </Link>

          <Link
            href="/admin/prestasi"
            className="block hover:text-yellow-300"
          >
            🏆 Prestasi
          </Link>

          <Link
            href="/admin/ppdb"
            className="block hover:text-yellow-300"
          >
            📝 PPDB
          </Link>

          <Link
            href="/admin/berita"
            className="block hover:text-yellow-300"
          >
            📰 Berita
          </Link>

          <Link
            href="/admin/gallery"
            className="block hover:text-yellow-300"
          >
            🖼 Galeri
          </Link>

          <Link
            href="/admin/kontak"
            className="block hover:text-yellow-300"
          >
            ☎ Kontak
          </Link>
        </nav>
      </aside>

      {/* Isi Halaman */}
      <main className="flex-1 bg-gray-100 p-8">
        {children}
      </main>
    </div>
  );
}