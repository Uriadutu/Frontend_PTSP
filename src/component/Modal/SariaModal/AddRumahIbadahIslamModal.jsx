import React, { useState } from "react";
import axios from "axios";

const AddRumahIbadahIslamModal = ({ setIsOpenModalAdd, getRumahIbadah }) => {
  const [idMesjid, setIdMesjid] = useState("");
  const [namaMasjid, setNamaMasjid] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [tipologi, setTipologi] = useState("");
  const [alamat, setAlamat] = useState("");
  const [statusTanah, setStatusTanah] = useState("");
  const [luasTanah, setLuasTanah] = useState("");
  const [luasBangunan, setLuasBangunan] = useState("");
  const [tahunBerdiri, setTahunBerdiri] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/rumah-ibadah-islam", {
        id_mesjid: idMesjid,
        nama_masjid: namaMasjid,
        kecamatan: kecamatan,
        tipologi: tipologi,
        alamat: alamat,
        status_tanah: statusTanah,
        luas_tanah: luasTanah,
        luas_bangunan: luasBangunan,
        tahun_berdiri: tahunBerdiri,
      });

      setIsOpenModalAdd(false);
      getRumahIbadah();
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
      <form onSubmit={handleSubmit} className="h-[90%]">
        <div className="w-full bg-white rounded-lg shadow-lg h-full inline-block">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Tambah Data Rumah Ibadah Islam
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
          <div className="p-4 space-y-4 inline-block h-[75%] overflow-y-scroll">
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="idMesjid" className="label-input">
                  ID Mesjid
                </label>
                <input
                  id="idMesjid"
                  className="w-full input"
                  value={idMesjid}
                  onChange={(e) => setIdMesjid(e.target.value)}
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="namaMasjid" className="label-input">
                  Nama Masjid
                </label>
                <input
                  id="namaMasjid"
                  className="w-full input"
                  value={namaMasjid}
                  onChange={(e) => setNamaMasjid(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="kecamatan" className="label-input">
                  Kecamatan
                </label>
                <input
                  id="kecamatan"
                  className="w-full input"
                  value={kecamatan}
                  onChange={(e) => setKecamatan(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="tipologi" className="label-input">
                  Tipologi
                </label>
                <input
                  id="tipologi"
                  className="w-full input"
                  value={tipologi}
                  onChange={(e) => setTipologi(e.target.value)}
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
                <label htmlFor="statusTanah" className="label-input">
                  Status Tanah
                </label>
                <input
                  id="statusTanah"
                  className="w-full input"
                  value={statusTanah}
                  onChange={(e) => setStatusTanah(e.target.value)}
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

export default AddRumahIbadahIslamModal;
