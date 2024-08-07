export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate;
};

export const tanggalPDF = (tanggal) => {
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  
  const hari = tanggal.getDate();
  const bulanIndex = tanggal.getMonth();
  const tahun = tanggal.getFullYear();

  return `${hari} ${bulan[bulanIndex]} ${tahun}`;
};

