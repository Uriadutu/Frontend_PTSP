import React, { useState, useEffect } from "react";
import axios from "axios";

const EditStatusModal = ({ setIsOpenModalEdit, hajiData, getHaji }) => {
  const [statusKeberangkatan, setStatusKeberangkatan] = useState("-");
  const [tahunKeberangkatan, setTahunKeberangkatan] = useState(" ");

  useEffect(() => {
    if (hajiData) {
      setStatusKeberangkatan(hajiData.status_keberangkatan || "");
      setTahunKeberangkatan(hajiData.tgl_berangkat === "-" ? " " : "" || "");
    }
  }, [hajiData]);

  const handleSave = async (e) => {
    e.preventDefault();

    const updatedTahunKeberangkatan =
      statusKeberangkatan === "Batal Berangkat" ? "-" : tahunKeberangkatan;

    try {
      await axios.patch(
        `http://localhost:5000/haji/berangkat/${hajiData.nomor_porsi}`,
        {
          status_keberangkatan: statusKeberangkatan,
          tgl_berangkat: updatedTahunKeberangkatan,
        }
      );
      alert("Berhasil Di Update");
      setIsOpenModalEdit(false);
      getHaji();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 z-top bg-opacity-30 "
    >
      <form onSubmit={handleSave} className=" inline-block">
        <div className="w-full bg-white rounded-lg shadow-lg h-full">
          <div className="flex items-center justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900">
              Edit Status Keberangkatan
            </h3>
            <button
              onClick={() => setIsOpenModalEdit(false)}
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
                <label htmlFor="statusKeberangkatan" className="label-input">
                  Status Keberangkatan
                </label>
                <select
                  id="statusKeberangkatan"
                  className="input py-0"
                  value={statusKeberangkatan}
                  onChange={(e) => setStatusKeberangkatan(e.target.value)}
                >
                  <option value="-" disabled>
                    Pilih Status
                  </option>
                  <option value="Berangkat">Berangkat</option>
                  <option value="Batal Berangkat">Batal Berangkat</option>
                </select>
              </div>
              {statusKeberangkatan === "Berangkat" && (
                <div className="grid grid-cols-2 gap-5 mb-2">
                  <label htmlFor="tahunKeberangkatan" className="label-input">
                    Tahun Keberangkatan
                  </label>
                  <input
                    type="date"
                    id="tahunKeberangkatan"
                    className="w-full input"
                    value={tahunKeberangkatan}
                    onChange={(e) => setTahunKeberangkatan(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
            <button type="submit" className="btn btn-simpan">
              Simpan
            </button>
            <button
              onClick={() => setIsOpenModalEdit(false)}
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

export default EditStatusModal;
