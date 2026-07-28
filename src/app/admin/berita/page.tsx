<td className="border p-3 text-center">
  <img
    src={item.image}
    alt={item.title || "Berita"}
    className="mx-auto h-16 w-24 rounded object-cover border shadow-sm"
    loading="lazy"
    onError={(e) => {
      // Jika image gagal load, tampilkan pesan error visual
      e.currentTarget.style.display = "none";
      e.currentTarget.nextElementSibling?.classList.remove("hidden");
    }}
  />
  <span className="hidden text-xs text-red-500 font-bold">Gambar Rusak/Blocked</span>
</td>