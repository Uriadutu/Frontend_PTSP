import React, { useState } from "react";
import axios from "axios";

const AddSekolahMingguModal = ({ setIsOpenModalAdd, getSekolahMinggu }) => {
  const [nama, setNama] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [jumlahSiswa, setJumlahSiswa] = useState("");
  const [namaPengajar, setNamaPengajar] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/sekolahMinggu", {
        nama,
        lokasi,
        jumlah_siswa: jumlahSiswa,
        nama_pengajar: namaPengajar,
      });

      setIsOpenModalAdd(false);
      getSekolahMinggu();
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
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Tambah Sekolah Minggu
            </h3>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto"
              data-modal-toggle="default-modal"
            >
              <svg
                aria-hidden="true"
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M13.77 1.23a.75.75 0 0 0-1.06 0L7 6.94 1.29 1.23A.75.75 0 0 0 .23 2.29l5.71 5.71-5.71 5.71a.75.75 0 1 0 1.06 1.06L7 8.06l5.71 5.71a.75.75 0 0 0 1.06-1.06L8.06 7l5.71-5.71a.75.75 0 0 0 0-1.06z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="w-full">
                <label
                  htmlFor="nama"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="nama"
                  className="input w-full"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lokasi"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Lokasi
                </label>
                <input
                  type="text"
                  id="lokasi"
                  className="input w-full"
                  value={lokasi}
                  onChange={(e) => setLokasi(e.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="jumlah_siswa"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Jumlah Siswa
                </label>
                <input
                  type="number"
                  id="jumlah_siswa"
                  className="input w-full"
                  value={jumlahSiswa}
                  onChange={(e) => setJumlahSiswa(e.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="nama_pengajar"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nama Pengajar
                </label>
                <input
                  type="text"
                  id="nama_pengajar"
                  className="input w-full"
                  value={namaPengajar}
                  onChange={(e) => setNamaPengajar(e.target.value)}
                  required
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
              type="submit"
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

export default AddSekolahMingguModal;
