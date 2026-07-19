import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import school from "../../data/school";

export default function ProfilPage() {
  return (
    <>
      <Header />

      <section className="bg-blue-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold">
            Profil Sekolah
          </h1>

          <p className="mt-4 text-lg text-blue-100">
            Mengenal lebih dekat UPT SMP Negeri 4 Duampanua.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">

        <h2 className="mb-4 text-3xl font-bold">
          Tentang Sekolah
        </h2>

        <p className="leading-8 text-gray-700">
          {school.description}
        </p>

        <h2 className="mt-12 mb-4 text-3xl font-bold">
          Visi
        </h2>

        <p className="leading-8 text-gray-700">
          {school.vision}
        </p>

        <h2 className="mt-12 mb-4 text-3xl font-bold">
          Misi
        </h2>

        <ul className="list-disc space-y-3 pl-6 text-gray-700">
          {school.missions.map((mission, index) => (
            <li key={index}>{mission}</li>
          ))}
        </ul>

      </section>

      <Footer />
    </>
  );
}