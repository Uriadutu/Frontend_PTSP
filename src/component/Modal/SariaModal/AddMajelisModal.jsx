import React, { useState } from "react";
import axios from "axios";

const AddMajelisModal = ({ setIsOpenModalAdd, getMajelis }) => {
  const [namaMajelis, setNamaMajelis] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tahunBerdiri, setTahunBerdiri] = useState("");
  const [namaPimpinan, setNamaPimpinan] = useState("");
  const [jumlahJamaah, setJumlahJamaah] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/majelis", {
        nama_majelis: namaMajelis,
        alamat: alamat,
        tahun_berdiri: tahunBerdiri,
        nama_pimpinan: namaPimpinan,
        jumlah_jamaah: jumlahJamaah,
      });

      setIsOpenModalAdd(false);
      getMajelis();
    } catch (error) {
      console.log(error);
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
              Tambah Data Majelis
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
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="namaMajelis" className="label-input">
                  Nama Majelis
                </label>
                <input
                  id="namaMajelis"
                  className="w-full input"
                  value={namaMajelis}
                  onChange={(e) => setNamaMajelis(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="alamat" className="label-input">
                  Alamat
                </label>
                <input
                  id="alamat"
                  className="w-full input"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="tahunBerdiri" className="label-input">
                  Tahun Berdiri
                </label>
                <input
                  id="tahunBerdiri"
                  className="w-full input"
                  value={tahunBerdiri}
                  onChange={(e) => setTahunBerdiri(e.target.value)}
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="namaPimpinan" className="label-input">
                  Nama Pimpinan
                </label>
                <input
                  id="namaPimpinan"
                  className="w-full input"
                  value={namaPimpinan}
                  onChange={(e) => setNamaPimpinan(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jumlahJamaah" className="label-input">
                  Jumlah Jamaah
                </label>
                <input
                  id="jumlahJamaah"
                  className="w-full input"
                  value={jumlahJamaah}
                  onChange={(e) => setJumlahJamaah(e.target.value)}
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

export default AddMajelisModal;
