"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export default function DeleteButton({ id }: Props) {
  const router = useRouter();

  async function hapusGallery() {
    const konfirmasi = confirm(
      "Yakin ingin menghapus foto ini?"
    );

    if (!konfirmasi) return;

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      });

      const hasil = await res.json();

      if (!hasil.success) {
        alert("Gagal menghapus foto.");
        return;
      }

      alert("Foto berhasil dihapus.");

      router.refresh();

    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    }
  }

  return (
    <button
      type="button"
      onClick={hapusGallery}
      className="rounded bg-red-600 px-3 py-2 text-white"
    >
      Hapus
    </button>
  );
}