import React, { useEffect, useState } from "react";
import axios from "axios";

const AddSekolahMingguModal = ({ setIsOpenModalAdd, getSekolahMinggu }) => {
  const [lokasi, setLokasi] = useState(null); // Menggunakan null sebagai nilai awal
  const [jumlahSiswa, setJumlahSiswa] = useState("");
  const [namaPengajar, setNamaPengajar] = useState("");
  const [gereja, setGereja] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/sekolahminggu", {
        nama_gereja: lokasi?.nama_gereja,
        jumlah_anak: jumlahSiswa,
        nama_pengasuh: namaPengajar,
        gerejaId: lokasi?.id,
      });

      setIsOpenModalAdd(false);
      getSekolahMinggu();
    } catch (error) {
      console.error(error);
    }
  };

  const getGereja = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/gereja"
      );
      setGereja(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGereja();
  }, []);

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
              Tambah Sekolah Minggu
            </h3>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto"
              data-modal-toggle="default-modal"
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
          <div className="p-4 space-y-4 inline-block h-[75%] overflow-y-scroll">
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="name" className="label-input">
                  Nama Gereja
                </label>
                <select
                  value={lokasi?.id || ""}
                  onChange={(e) =>
                    setLokasi(gereja.find((item) => item.id === +e.target.value))
                  }
                  className="input"
                  required
                >
                  <option value="" disabled>
                    Pilih Gereja
                  </option>
                  {gereja.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.nama_gereja}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label
                  htmlFor="nama_pengajar"
                  className="label-input"
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
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="name" className="label-input">
                  Jumlah Anak
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

export default AddSekolahMingguModal;
