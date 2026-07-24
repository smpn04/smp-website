"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export default function DeleteButton({ id }: Props) {
  const router = useRouter();

  async function hapusGuru() {
    const konfirmasi = confirm(
      "Yakin ingin menghapus data guru ini?"
    );

    if (!konfirmasi) return;

    try {
      const res = await fetch(`/api/admin/guru/${id}`, {
        method: "DELETE",
      });

      const hasil = await res.json();

      if (!hasil.success) {
        alert("Gagal menghapus guru.");
        return;
      }

      alert("Guru berhasil dihapus.");

      router.refresh();

    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    }
  }

  return (
    <button
      onClick={hapusGuru}
      className="rounded bg-red-600 px-3 py-2 text-white"
    >
      Hapus
    </button>
  );
}