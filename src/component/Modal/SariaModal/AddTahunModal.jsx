import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddTahunModal = ({ setIsOpenModalAdd, getTahun }) => {
  const [tahun, setTahun] = useState("");
  const [msg, setMsg] = useState("")
const {no} = useParams()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/bulantahun", {
        id : tahun + no,
        no : no,
        nama_bulan: tahun,
      });

      setIsOpenModalAdd(false);
      getTahun(no);
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg)
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
          <div className="p-4">
            <div className="mb-2 w-full">
              <div className="flex justify-between gap-4">
                <label htmlFor="tahun" className="label-input">
                  Tahun
                </label>
                <input
                  id="tahun"
                  className="w-full input"
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  type="number"
                  min="1900"
                  max="2100"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between p-3 items-center  border-t border-gray-200 rounded-b">
            <p>{msg}</p>
            <div className="flex items-center justify-end space-x-3">
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

export default AddTahunModal;
