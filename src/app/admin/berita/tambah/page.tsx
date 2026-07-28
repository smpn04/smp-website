const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Baca file langsung di client-side sebagai Base64
  const reader = new FileReader();

  reader.onload = (event) => {
    const base64String = event.target?.result as string;
    if (base64String) {
      setImage(base64String); // Simpan string gambar langsung ke state
    }
  };

  reader.onerror = () => {
    alert("Gagal membaca file foto.");
  };

  reader.readAsDataURL(file);
};