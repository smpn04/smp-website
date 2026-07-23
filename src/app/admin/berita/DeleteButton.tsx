"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  async function hapusBerita() {
    const yakin = confirm(
      "Apakah Anda yakin ingin menghapus berita ini?"
    );

    if (!yakin) return;

    const res = await fetch(`/api/admin/berita/${id}`, {
      method: "DELETE",
    });

    const hasil = await res.json();

    if (!res.ok || !hasil.success) {
      alert("Gagal menghapus berita");
      return;
    }

    alert("Berita berhasil dihapus");

    router.refresh();
  }

  return (
    <button
      onClick={hapusBerita}
      className="rounded bg-red-600 px-3 py-2 text-white"
    >
      Hapus
    </button>
  );
}