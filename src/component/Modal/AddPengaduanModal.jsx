import React, { useState } from "react";
import axios from "axios";

const AddPengaduanModal = ({ setIsOpenModalAdd, getPengaduan }) => {
  const [judulLaporan, setJudulLaporan] = useState("");
  const [tglKejadian, setTglKejadian] = useState("");
  const [lokasiKejadian, setLokasiKejadian] = useState("");
  const [kategori, setKategori] = useState("");
  const [kategoriLainnya, setKategoriLainnya] = useState("");
  const [deskripsiPengaduan, setDeskripsiPengaduan] = useState("");
  const [sifatLaporan, setSifatLaporan] = useState("rahasia");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/pengaduan", {
        judul_laporan: judulLaporan,
        tgl_kejadian: tglKejadian,
        lokasi_kejadian: lokasiKejadian,
        kategori_laporan: kategori === "Lainnya" ? kategoriLainnya : kategori,
        deskripsiPengaduan,
        sifat_laporan: sifatLaporan,
      });

      setIsOpenModalAdd(false);
      getPengaduan();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 z-top bg-opacity-30"
    >
      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Tambah Pengaduan
            </h3>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="mb-6">
              <label htmlFor="judulLaporan" className="label-input">
                Judul Laporan
              </label>
              <input
                value={judulLaporan}
                onChange={(e) => setJudulLaporan(e.target.value)}
                type="text"
                id="judulLaporan"
                className="w-full input"
              />

              <label htmlFor="tglKejadian" className="label-input">
                Tanggal Kejadian
              </label>
              <input
                value={tglKejadian}
                onChange={(e) => setTglKejadian(e.target.value)}
                type="date"
                id="tglKejadian"
                className="w-full input"
              />

              <label htmlFor="lokasiKejadian" className="label-input">
                Lokasi Kejadian
              </label>
              <input
                value={lokasiKejadian}
                onChange={(e) => setLokasiKejadian(e.target.value)}
                type="text"
                id="lokasiKejadian"
                className="w-full input"
              />

              <label htmlFor="kategori" className="label-input">
                Kategori Laporan
              </label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full input"
              >
                <option value="Agama">Agama</option>
                <option value="Ekonomi Dan Keuangan">Ekonomi Dan Keuangan</option>
                <option value="Kesetaraan Gender">Kesetaraan Gender</option>
                <option value="Teknologi Informasi Dan Komunikasi">
                  Teknologi Informasi Dan Komunikasi
                </option>
                <option value="Sosial Dan Kesejahteraan">
                  Sosial Dan Kesejahteraan
                </option>
                <option value="Ketentraman Dan Ketertiban Umum">
                  Ketentraman Dan Ketertiban Umum
                </option>
                <option value="Pendidikan Dan Kebudayaan">Pendidikan Dan Kebudayaan</option>
                <option value="Kekerasan Di Satuan Pendidikan">Kekerasan Di Satuan Pendidikan</option>
                <option value="Politik Dan Hukum">Politik Dan Hukum</option>
                <option value="Kependudukan">Kependudukan</option>
                <option value="Ketenagakerjaan">Ketenagakerjaan</option>
                <option value="Perhubungan">Perhubungan</option>
                <option value="Lainnya">Lainnya</option>
              </select>

              {kategori === "Lainnya" && (
                <div className="mt-4">
                  <label htmlFor="kategoriLainnya" className="label-input">
                    Lainnya
                  </label>
                  <input
                    value={kategoriLainnya}
                    onChange={(e) => setKategoriLainnya(e.target.value)}
                    type="text"
                    id="kategoriLainnya"
                    className="w-full input"
                  />
                </div>
              )}

              <label htmlFor="deskripsiPengaduan" className="label">
                Deskripsi Pengaduan
              </label>
              <textarea
                value={deskripsiPengaduan}
                onChange={(e) => setDeskripsiPengaduan(e.target.value)}
                id="deskripsiPengaduan"
                className="w-full input"
              />

              <label className="label-input">Sifat Laporan</label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="rahasia"
                    checked={sifatLaporan === "rahasia"}
                    onChange={(e) => setSifatLaporan(e.target.value)}
                    className="form-radio"
                  />
                  <span className="ml-2">Rahasia</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="Anonim"
                    checked={sifatLaporan === "Anonim"}
                    onChange={(e) => setSifatLaporan(e.target.value)}
                    className="form-radio"
                  />
                  <span className="ml-2">Anonim</span>
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
            <button type="submit" className="btn btn-simpan">
              Simpan
            </button>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="btn-batal"
            >
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPengaduanModal;
