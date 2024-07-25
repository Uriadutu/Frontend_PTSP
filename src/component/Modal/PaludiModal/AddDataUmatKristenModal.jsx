import React, { useState } from "react";
import axios from "axios";

const AddDataUmatKristenModal = ({ setIsOpenModalAdd, getDataUmatKristen }) => {
  const [namaGereja, setNamaGereja] = useState("");
  const [namaPimpinan, setNamaPimpinan] = useState("");
  const [denominasi, setDenominasi] = useState("");
  const [jumlahUmat, setJumlahUmat] = useState("");
  const [jumlahPria, setJumlahPria] = useState("");
  const [jumlahWanita, setJumlahWanita] = useState("");
  const [namaDesa, setNamaDesa] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [lainnya, setLainnya] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        nama_gereja: namaGereja,
        nama_pimpinan: namaPimpinan,
        demonisasi: denominasi === "lainnya" ? lainnya : denominasi,
        jumlah_umat: jumlahUmat,
        jumlah_pria: jumlahPria,
        jumlah_wanita: jumlahWanita,
        nama_desa: namaDesa,
        kecamatan,
      };
      await axios.post("http://localhost:5000/data-umat-kristen", newData);
      getDataUmatKristen();
      setIsOpenModalAdd(false);
    } catch (error) {
      console.error("Failed to add data umat Kristen:", error);
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
        <div className="w-full bg-white rounded-lg shadow-lg h-full inline-block">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Tambah Data Umat Kristen
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
          <div className="p-4 space-y-4 inline-block">
            <div className="flex grid grid-cols-2 gap-4 items-center">
              <label className="text-gray-700 font-medium">Nama Gereja:</label>
              <input
                type="text"
                value={namaGereja}
                onChange={(e) => setNamaGereja(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="flex grid grid-cols-2 gap-4 items-center">
              <label className="text-gray-700 font-medium">
                Nama Pimpinan Gereja:
              </label>
              <input
                type="text"
                value={namaPimpinan}
                onChange={(e) => setNamaPimpinan(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="flex grid grid-cols-2 gap-4 items-center">
              <label className="text-gray-700 font-medium">Denominasi:</label>
              <div>
                <label className="mr-4">
                  <input
                    type="radio"
                    value="GMIH"
                    checked={denominasi === "GMIH"}
                    onChange={(e) => setDenominasi(e.target.value)}
                    className="mr-2"
                  />
                  GMIH
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    value="GKPMI"
                    checked={denominasi === "GKPMI"}
                    onChange={(e) => setDenominasi(e.target.value)}
                    className="mr-2"
                  />
                  GKPMI
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    value="ADVENT"
                    checked={denominasi === "ADVENT"}
                    onChange={(e) => setDenominasi(e.target.value)}
                    className="mr-2"
                  />
                  ADVENT
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    value="lainnya"
                    checked={denominasi === "lainnya"}
                    onChange={(e) => setDenominasi(e.target.value)}
                    className="mr-2"
                  />
                  Lainnya
                </label>
              </div>
            </div>
            <div className="flex grid grid-cols-2 gap-4 items-center">
              <div className=""></div>
              {denominasi === "lainnya" && (
                <div className="flex grid grid-cols-2 gap-4 items-center">
                  <div className="">
                    <label> Lainnya : </label>
                  </div>

                  <input
                    type="text"
                    value={lainnya}
                    onChange={(e) => setLainnya(e.target.value)}
                    className="input mt-2"
                  />
                </div>
              )}
            </div>
            <div className="flex grid grid-cols-2 gap-4 items-center">
              <label className="text-gray-700 font-medium">Jumlah Umat:</label>
              <input
                type="number"
                value={jumlahUmat}
                onChange={(e) => setJumlahUmat(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="flex grid grid-cols-2 gap-4 items-center">
              <label className="text-gray-700 font-medium">Jumlah Pria:</label>
              <input
                type="number"
                value={jumlahPria}
                onChange={(e) => setJumlahPria(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="flex grid grid-cols-2 gap-4 items-center">
              <label className="text-gray-700 font-medium">
                Jumlah Wanita:
              </label>
              <input
                type="number"
                value={jumlahWanita}
                onChange={(e) => setJumlahWanita(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="flex grid grid-cols-2 gap-4 items-center">
              <label className="text-gray-700 font-medium">Nama Desa:</label>
              <input
                type="text"
                value={namaDesa}
                onChange={(e) => setNamaDesa(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="flex grid grid-cols-2 gap-4 items-center">
              <label className="text-gray-700 font-medium">Kecamatan:</label>
              <input
                type="text"
                value={kecamatan}
                onChange={(e) => setKecamatan(e.target.value)}
                className="input"
                required
              />
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
        </div>
      </form>
    </div>
  );
};

export default AddDataUmatKristenModal;
