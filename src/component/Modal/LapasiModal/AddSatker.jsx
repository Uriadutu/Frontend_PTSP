import React, { useState } from "react";
import axios from "axios";

const ModalAddSatker = ({ setIsOpenModalAdd, getSatker }) => {
  const [kodesatker, setKodeSatker] = useState("");
  const [name, setName] = useState("");
  const [alamat, setAlamat] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/satker", {
        kode_satker : kodesatker,
        nama_satker : name,
        alamat_satker : alamat,
      });

      setIsOpenModalAdd(false);
      getSatker();
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
            <h3 className="text-xl font-semibold text-gray-900">Tambah Satuan Kerja</h3>
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
          <div className="p-4 space-y-4">
            <div className="mb-6">
              <label htmlFor="name" className="label-input">
                Kode Satker
              </label>
              <input
                value={kodesatker}
                onChange={(e) => setKodeSatker(e.target.value)}
                type="text"
                id="name"
                className="w-full input"
              />
              <label htmlFor="name" className="label">
                Nama Satker
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                className="w-full input"
              />
              <label htmlFor="name" className="label">
                Alamat Satker
              </label>
              <input
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                type="text"
                id="name"
                className="w-full input"
              />
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

export default ModalAddSatker;
