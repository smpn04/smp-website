<div>
  <label className="block text-sm font-semibold text-gray-700 mb-1">
    Foto Berita (Bisa Pilih Banyak)
  </label>
  <input
    type="file"
    multiple
    onChange={handleFileChange}
    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
  />
  <p className="text-[11px] text-gray-500 mt-1">
    Tahan tombol <code className="font-bold">Ctrl</code> atau{" "}
    <code className="font-bold">Shift</code> saat memilih foto untuk memilih lebih dari 1 foto.
  </p>
</div>