import Image from "next/image";
import Link from "next/link";
import school from "../../data/school";

export default function Header() {
  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo Sekolah"
            width={56}
            height={56}
            priority
          />

          <div>
            <h1 className="text-2xl font-bold">
  {school.name}
</h1>

           <p className="text-sm text-blue-100">
  {school.slogan}
</p>
          </div>
        </div>

        <nav className="hidden gap-8 md:flex">
  <Link href="/">Home</Link>
  <Link href="/profil">Profil</Link>
  <Link href="/guru">Guru</Link>
  <Link href="/akademik">Akademik</Link>
  <Link href="/ppdb">PPDB</Link>
  <Link href="/berita">Berita</Link>
  <Link href="/galeri">Galeri</Link>
  <Link href="/kontak">Kontak</Link>
</nav><Link href="/prestasi">Prestasi</Link>

        <button className="rounded-lg bg-yellow-400 px-5 py-2 font-semibold text-blue-900">
          Daftar PPDB
        </button>

      </div>
    </header>
  );
}