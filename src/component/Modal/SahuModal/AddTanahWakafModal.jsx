import React, { useEffect, useState } from "react";
import axios from "axios";

const jenisWakafOptions = [
  "Masjid",
  "Musallah",
  "Pesantren",
  "Pendidikan",
  "Ibadah Sosial",
  "Rs/Klinik",
  "Kuburan"
];

const jenisTanahOptions = [
  "Bersertifikat",
  "Belum Bersertifikat"
];

const AddTanahWakafModal = ({ setIsOpenModalAdd, getTanahWakaf }) => {
  const [namaKecamatan, setNamaKecamatan] = useState("");
  const [jenisWakaf, setJenisWakaf] = useState("");
  const [jenisTanah, setJenisTanah] = useState("");
  const [luasTanah, setLuasTanah] = useState("");
  const [jumlahWakaf, setJumlahWakaf] = useState("");
  const [kecamatan, setKecamatan] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/tanah-wakaf", {
        nama_kecamatan: namaKecamatan,
        jenis_wakaf: jenisWakaf,
        jenis_tanah: jenisTanah,
        luas_tanah: luasTanah,
        jumlah_wakaf: jumlahWakaf
      });

      setIsOpenModalAdd(false);
      getTanahWakaf();
    } catch (error) {
      console.log(error);
    }
  };

  const getKecamatan = async () => {
    try {
      const response = await axios.get('http://localhost:5000/kecamatan')
      setKecamatan(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    getKecamatan()
  },[])

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 z-top bg-opacity-30"
    >
      <form onSubmit={handleSubmit}>
        <div className="w-full bg-white rounded-lg shadow-lg h-full inline-block">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Tambah Data Tanah Wakaf
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
          <div className="p-4 space-y-4 inline-block ">
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="namaKecamatan" className="label-input">
                  Nama Kecamatan
                </label>
                <select
                  id="namaKecamatan"
                  className="w-full input"
                  value={namaKecamatan}
                  onChange={(e) => setNamaKecamatan(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Kecamatan
                  </option>
                  {kecamatan.map((item, index) => (
                    <option key={index + 1} value={item && item.nama_kecamatan}>
                      {item && item.nama_kecamatan}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jenisWakaf" className="label-input">
                  Jenis Wakaf
                </label>
                <select
                  id="jenisWakaf"
                  className="w-full input"
                  value={jenisWakaf}
                  onChange={(e) => setJenisWakaf(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Jenis Wakaf
                  </option>
                  {jenisWakafOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jenisTanah" className="label-input">
                  Jenis Tanah
                </label>
                <select
                  id="jenisTanah"
                  className="w-full input"
                  value={jenisTanah}
                  onChange={(e) => setJenisTanah(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Jenis Tanah
                  </option>
                  {jenisTanahOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="luasTanah" className="label-input">
                  Luas Tanah (m²)
                </label>
                <input
                  id="luasTanah"
                  className="w-full input"
                  value={luasTanah}
                  onChange={(e) => setLuasTanah(e.target.value)}
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jumlahWakaf" className="label-input">
                  Jumlah Tanah Wakaf
                </label>
                <input
                  id="jumlahWakaf"
                  className="w-full input"
                  value={jumlahWakaf}
                  onChange={(e) => setJumlahWakaf(e.target.value)}
                  type="number"
                />
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

export default AddTanahWakafModal;
