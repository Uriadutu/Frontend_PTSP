import React, { useEffect, useState } from "react";
import axios from "axios";

const InfoPengawasModal = ({ setIsOpenModalAdd, Pengawas }) => {
  const [pengawas, setPengawas] = useState([]);
  const getPengawasByid = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/peta/${Pengawas.id}`
      );
      setPengawas(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(Pengawas, "Select");
  console.log(pengawas, "Get");
  

  useEffect(() => {
    getPengawasByid();
  }, []);
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 z-top bg-opacity-30"
    >
      <form>
        <div className="w-full bg-white rounded-lg shadow-lg h-full inline-block">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Info Hak Akses
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
              <label className="text-gray-700 font-medium">NIP/Nama:</label>
              <h1>
                {Pengawas && Pengawas.Pegawai && Pengawas.Pegawai.NIP} - 
                {Pengawas && Pengawas.Pegawai && Pengawas.Pegawai.nama_pegawai}
              </h1>
            </div>
            <div className="flex grid grid-cols-2 gap-4 items-center">
              <label className="text-gray-700 font-medium">Jabatan:</label>
              <h1>
                {Pengawas && Pengawas.Pegawai && Pengawas.Pegawai.jabatan}
              </h1>
            </div>
            <div className="flex grid grid-cols-2 gap-4 items-center">
              <label className="text-gray-700 font-medium">Satuan Kerja:</label>
              <h1>
                {Pengawas && Pengawas.Pegawai && Pengawas.Pegawai.satuan_kerja}
              </h1>
            </div>
            <div className="flex grid grid-cols-2 gap-4 items-start">
              <label className="text-gray-700 font-medium">
                Wilayah Mengawas:
              </label>
              <div>
                {pengawas &&
                pengawas.wilayamengawas &&
                pengawas.wilayamengawas.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {pengawas.wilayamengawas.map((item, index) => (
                      <h1 key={index} className="">
                        - {item.nama_wilayah}{" "}
                      </h1>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">Terdapat Kesalahan</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InfoPengawasModal;
