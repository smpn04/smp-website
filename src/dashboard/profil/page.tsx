import Link from "next/link";

// Memaksa Next.js selalu mengambil data paling segar dari database
export const dynamic = "force-dynamic";

export default function AdminProfilPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigasi */}
      <aside className="w-64 bg-blue-900 p-6 text-white">
        <h1 className="mb-10 text-2xl font-bold">Admin SMP</h1>
        <nav className="space-y-4">
          <Link href="/admin/dashboard" className="block hover:text-blue-200">
            🏠 Dashboard
          </Link>
          <Link href="/admin/dashboard/profil" className="block font-bold text-blue-300">
            📄 Profil
          </Link>
          <Link href="/admin/dashboard/guru" className="block hover:text-blue-200">
            👨‍🏫 Guru
          </Link>
          <Link href="/admin/dashboard/berita" className="block hover:text-blue-200">
            📰 Berita
          </Link>
        </nav>
      </aside>

      {/* Konten Utama Admin Profil */}
      <main className="flex-1 p-10">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Kelola Profil Sekolah</h1>
            <p className="mt-1 text-sm text-gray-500">
              Ubah informasi Visi, Misi, dan Sambutan Kepala Sekolah yang tampil di halaman depan.
            </p>
          </div>
        </div>

        {/* Form Pengaturan Profil */}
        <form className="mt-8 max-w-4xl space-y-6 rounded-2xl bg-white p-8 shadow-sm">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Sambutan Kepala Sekolah
            </label>
            <textarea
              rows={4}
              className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              placeholder="Tuliskan sambutan kepala sekolah di sini..."
              defaultValue="Selamat datang di UPT SMP Negeri 4 Duampanua..."
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Visi Sekolah
              </label>
              <textarea
                rows={5}
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                placeholder="Tuliskan visi sekolah..."
                defaultValue="Terwujudnya peserta didik yang bertakwa, berprestasi, dan berbudaya lingkungan."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Misi Sekolah
              </label>
              <textarea
                rows={5}
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                placeholder="Tuliskan misi sekolah..."
                defaultValue="1. Menyelenggarakan pembelajaran berkualitas.&#10;2. Mengembangkan potensi bakat siswa."
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              className="rounded-lg bg-blue-900 px-6 py-2.5 font-medium text-white shadow hover:bg-blue-800 focus:outline-none"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}