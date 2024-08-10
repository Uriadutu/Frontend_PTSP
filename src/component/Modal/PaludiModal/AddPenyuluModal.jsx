import React, { useState } from "react";
import axios from "axios";

const AddPenyuluModal = ({ setIsOpenModalAdd, getPenyulu }) => {
  const [statusPegawai, setStatusPegawai] = useState("");
  const [nama, setNama] = useState("");
  const [tempatTugas, setTempatTugas] = useState("");
  const [jumlahBinaan, setJumlahBinaan] = useState(0);
  const [kelompokBinaan, setKelompokBinaan] = useState([""]);

  const handleAddKelompok = () => {
    setKelompokBinaan([...kelompokBinaan, ""]);
  };

  const handleRemoveKelompok = (index) => {
    setKelompokBinaan(kelompokBinaan.filter((_, i) => i !== index));
  };

  const handleKelompokChange = (index, value) => {
    const newKelompokBinaan = kelompokBinaan.map((kelompok, i) =>
      i === index ? value : kelompok
    );
    setKelompokBinaan(newKelompokBinaan);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/penyulu", {
        status_pegawai: statusPegawai,
        nama: nama,
        tempat_tugas: tempatTugas,
        jumlah_binaan: jumlahBinaan,
        kelompok_binaan: kelompokBinaan,
      });

      setIsOpenModalAdd(false);
      getPenyulu();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(kelompokBinaan, "data");
  
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
              Tambah Data Penyulu
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
                <label htmlFor="statusPegawai" className="label-input">
                  Status Pegawai
                </label>
                <select
                  id="statusPegawai"
                  className="w-full input"
                  value={statusPegawai}
                  onChange={(e) => setStatusPegawai(e.target.value)}
                >
                  <option value="">Pilih Status</option>
                  <option value="Non PNS">Non PNS</option>
                  <option value="PPPK">PPPK</option>
                  <option value="PNS">PNS</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="nama" className="label-input">
                  Nama
                </label>
                <input
                  id="nama"
                  className="w-full input"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="tempatTugas" className="label-input">
                  Tempat Tugas
                </label>
                <input
                  id="tempatTugas"
                  className="w-full input"
                  value={tempatTugas}
                  onChange={(e) => setTempatTugas(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jumlahBinaan" className="label-input">
                  Jumlah Kelompok Binaan
                </label>
                <input
                  id="jumlahBinaan"
                  className="w-full input"
                  value={jumlahBinaan}
                  onChange={(e) => setJumlahBinaan(e.target.value)}
                  type="number"
                />
              </div>
              <div className="mb-2">
                <label className="label-input">Nama Kelompok Binaan</label>
                {kelompokBinaan.map((kelompok, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      className="w-full input"
                      value={kelompok}
                      onChange={(e) =>
                        handleKelompokChange(index, e.target.value)
                      }
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        className="ml-2 text-red-500"
                        onClick={() => handleRemoveKelompok(index)}
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={handleAddKelompok}
                >
                  Tambah Kelompok
                </button>
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

export default AddPenyuluModal;
