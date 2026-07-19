import Link from "next/link";
import school from "../../data/school";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">

        <div>
          <h2 className="text-2xl font-bold">
            {school.name}
          </h2>

          <p className="mt-4 text-blue-100">
            {school.slogan}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Menu
          </h3>

          <ul className="mt-4 space-y-2">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/profil">Profil</Link></li>
            <li><Link href="/guru">Guru</Link></li>
            <li><Link href="/akademik">Akademik</Link></li>
            <li><Link href="/berita">Berita</Link></li>
            <li><Link href="/galeri">Galeri</Link></li>
            <li><Link href="/kontak">Kontak</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Kontak
          </h3>

          <p className="mt-4">
            📍 {school.address}
          </p>

          <p className="mt-2">
            ☎ {school.phone}
          </p>

          <p className="mt-2">
            ✉ {school.email}
          </p>
        </div>

      </div>

      <div className="border-t border-blue-800 py-5 text-center text-blue-200">
        © {new Date().getFullYear()} {school.name}. All Rights Reserved.
      </div>
    </footer>
  );
}