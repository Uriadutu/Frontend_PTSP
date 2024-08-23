import React, { useState } from "react";
import axios from "axios";

const AddGerejaModal = ({ setIsOpenModalAdd, getGereja }) => {
  const [namaGereja, setNamaGereja] = useState("");
  const [noLapor, setNoLapor] = useState("");
  const [statusIjin, setStatusIjin] = useState("");
  const [nomorIbm, setNomorIbm] = useState("");
  const [statusGedung, setStatusGedung] = useState("");
  const [statusTanah, setStatusTanah] = useState("");
  const [luasBangunan, setLuasBangunan] = useState("");
  const [luasTanah, setLuasTanah] = useState("");
  const [tahunBerdiri, setTahunBerdiri] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/gereja", {
        nama_gereja: namaGereja,
        no_lapor: noLapor,
        status_ijin: statusIjin,
        nomor_ibm: nomorIbm,
        status_gedung: statusGedung,
        status_tanah: statusTanah,
        luas_bangunan: luasBangunan,
        luas_tanah: luasTanah,
        tahun_berdiri: tahunBerdiri,
      });

      setIsOpenModalAdd(false);
      getGereja();
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
              Tambah Data Gereja
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
                <label htmlFor="namaGereja" className="label-input">
                  Nama Gereja
                </label>
                <input
                  id="namaGereja"
                  className="w-full input"
                  value={namaGereja}
                  onChange={(e) => setNamaGereja(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="noLapor" className="label-input">
                  Nomor Lapor
                </label>
                <input
                  id="noLapor"
                  className="w-full input"
                  value={noLapor}
                  onChange={(e) => setNoLapor(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="statusIjin" className="label-input">
                  Status Ijin
                </label>
                <select
                  id="statusIjin"
                  className="w-full input"
                  value={statusIjin}
                  onChange={(e) => setStatusIjin(e.target.value)}
                >
                  <option value="" disabled hidden>Pilih Status Izin</option>
                  <option value="IMB">IMB</option>
                  <option value="Belum IMB">Belum IMB</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="nomorIbm" className="label-input">
                  Nomor IMB
                </label>
                <input
                  id="nomorIbm"
                  className="w-full input"
                  value={nomorIbm}
                  onChange={(e) => setNomorIbm(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="statusGedung" className="label-input">
                  Status Gedung
                </label>
                <select
                  id="statusGedung"
                  className="w-full input"
                  value={statusGedung}
                  onChange={(e) => setStatusGedung(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Pilih Status Gedung
                  </option>
                  <option value="Semi permanen">Semi permanen</option>
                  <option value="Darurat">Darurat</option>
                  <option value="Sewa">Sewa</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="statusTanah" className="label-input">
                  Status Tanah
                </label>
                <select
                  id="statusTanah"
                  className="w-full input"
                  value={statusTanah}
                  onChange={(e) => setStatusTanah(e.target.value)}
                >
                  <option value="" disabled hidden >Pilih Status Tanah</option>
                  <option value="Sertifikat">Sertifikat</option>
                  <option value="Belum Sertifikat">Belum Sertifikat</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="luasBangunan" className="label-input">
                  Luas Bangunan
                </label>
                <input
                  id="luasBangunan"
                  className="w-full input"
                  value={luasBangunan}
                  onChange={(e) => setLuasBangunan(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="luasTanah" className="label-input">
                  Luas Tanah
                </label>
                <input
                  id="luasTanah"
                  className="w-full input"
                  value={luasTanah}
                  onChange={(e) => setLuasTanah(e.target.value)}
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

export default AddGerejaModal;
