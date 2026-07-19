import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import school from "../../data/school";

export default function KontakPage() {
  return (
    <>
      <Header />

      <section className="bg-blue-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold">
            Kontak
          </h1>

          <p className="mt-4 text-lg text-blue-100">
            Hubungi UPT SMP Negeri 4 Duampanua.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 space-y-8">

        <div className="rounded-xl border p-6 shadow-md">
          <h2 className="text-2xl font-bold">Alamat</h2>
          <p className="mt-2 text-gray-700">
            {school.address}
          </p>
        </div>

        <div className="rounded-xl border p-6 shadow-md">
          <h2 className="text-2xl font-bold">Telepon</h2>
          <p className="mt-2 text-gray-700">
            {school.phone}
          </p>
        </div>

        <div className="rounded-xl border p-6 shadow-md">
          <h2 className="text-2xl font-bold">Email</h2>
          <p className="mt-2 text-gray-700">
            {school.email}
          </p>
        </div>

        <div className="rounded-xl border p-6 shadow-md">
          <h2 className="text-2xl font-bold">Website</h2>

          <a
            href={school.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-blue-700 hover:underline"
          >
            {school.website}
          </a>
        </div>

      </section>

      <Footer />
    </>
  );
}