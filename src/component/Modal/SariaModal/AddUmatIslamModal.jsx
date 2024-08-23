import React, { useState } from "react";
import axios from "axios";

const AddUmatIslamModal = ({ setIsOpenModalAdd, getUmatIslam }) => {
  const [namaDesa, setNamaDesa] = useState("");
  const [jumlahAliran, setJumlahAliran] = useState("");
  const [jumlahPenduduk, setJumlahPenduduk] = useState("");
  const [jumlahPendudukIslam, setJumlahPendudukIslam] = useState("");
  const [jumlahMesjid, setJumlahMesjid] = useState("");
  const [kecamatan, setKecamatan] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/umat-islam", {
        nama_desa: namaDesa,
        jumlah_aliran: jumlahAliran,
        jumlah_penduduk: jumlahPenduduk,
        jumlah_penduduk_islam: jumlahPendudukIslam,
        jumlah_mesjid: jumlahMesjid,
        kecamatan: kecamatan,
      });

      setIsOpenModalAdd(false);
      getUmatIslam();
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
              Tambah Data Umat Islam
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
                <label htmlFor="namaDesa" className="label-input">
                  Nama Desa
                </label>
                <input
                  id="namaDesa"
                  className="w-full input"
                  value={namaDesa}
                  onChange={(e) => setNamaDesa(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jumlahAliran" className="label-input">
                  Jumlah Aliran Kepercayaan
                </label>
                <input
                  id="jumlahAliran"
                  className="w-full input"
                  value={jumlahAliran}
                  onChange={(e) => setJumlahAliran(e.target.value)}
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jumlahPenduduk" className="label-input">
                  Jumlah Penduduk
                </label>
                <input
                  id="jumlahPenduduk"
                  className="w-full input"
                  value={jumlahPenduduk}
                  onChange={(e) => setJumlahPenduduk(e.target.value)}
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jumlahPendudukIslam" className="label-input">
                  Jumlah Penduduk agama Islam
                </label>
                <input
                  id="jumlahPendudukIslam"
                  className="w-full input"
                  value={jumlahPendudukIslam}
                  onChange={(e) => setJumlahPendudukIslam(e.target.value)}
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jumlahMesjid" className="label-input">
                  Jumlah Masjid
                </label>
                <input
                  id="jumlahMesjid"
                  className="w-full input"
                  value={jumlahMesjid}
                  onChange={(e) => setJumlahMesjid(e.target.value)}
                  type="number"
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

export default AddUmatIslamModal;
