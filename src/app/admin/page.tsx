import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function AdminLoginPage() {
  return (
    <>
      <Header />

      <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-6">
        <div className="w-full rounded-xl border p-8 shadow-lg">
          <h1 className="mb-6 text-center text-3xl font-bold">
            Login Admin
          </h1>

          <form className="space-y-5">
            <div>
              <label className="block font-semibold">
                Username
              </label>

              <input
                type="text"
                className="mt-2 w-full rounded-lg border p-3"
                placeholder="Masukkan username"
              />
            </div>

            <div>
              <label className="block font-semibold">
                Password
              </label>

              <input
                type="password"
                className="mt-2 w-full rounded-lg border p-3"
                placeholder="Masukkan password"
              />
            </div>

            <button
              className="w-full rounded-lg bg-blue-900 py-3 text-white hover:bg-blue-800"
            >
              Login
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}