import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function PPDBPage() {
  return (
    <>
      <Header />

      <section className="bg-blue-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold">
            PPDB Online
          </h1>

          <p className="mt-4 text-lg text-blue-100">
            Formulir Penerimaan Peserta Didik Baru
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <form className="space-y-6 rounded-xl border p-8 shadow-md">

          <div>
            <label className="block font-semibold">
              Nama Lengkap
            </label>

            <input
              type="text"
              className="mt-2 w-full rounded-lg border p-3"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label className="block font-semibold">
              NISN
            </label>

            <input
              type="text"
              className="mt-2 w-full rounded-lg border p-3"
              placeholder="Masukkan NISN"
            />
          </div>

          <div>
            <label className="block font-semibold">
              Tempat, Tanggal Lahir
            </label>

            <input
              type="text"
              className="mt-2 w-full rounded-lg border p-3"
              placeholder="Contoh: Pinrang, 12 Mei 2012"
            />
          </div>

          <div>
            <label className="block font-semibold">
              Jenis Kelamin
            </label>

            <select className="mt-2 w-full rounded-lg border p-3">
              <option>Laki-laki</option>
              <option>Perempuan</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">
              Alamat
            </label>

            <textarea
              className="mt-2 w-full rounded-lg border p-3"
              rows={4}
            />
          </div>

          <div>
            <label className="block font-semibold">
              Nama Orang Tua/Wali
            </label>

            <input
              type="text"
              className="mt-2 w-full rounded-lg border p-3"
              placeholder="Masukkan nama orang tua"
            />
          </div>

          <div>
            <label className="block font-semibold">
              Nomor HP
            </label>

            <input
              type="text"
              className="mt-2 w-full rounded-lg border p-3"
              placeholder="08xxxxxxxxxx"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-900 px-6 py-3 text-white hover:bg-blue-800"
          >
            Kirim Pendaftaran
          </button>

        </form>
      </section>

      <Footer />
    </>
  );
}