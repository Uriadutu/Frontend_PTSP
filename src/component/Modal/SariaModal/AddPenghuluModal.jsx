import React, { useEffect, useState } from "react";
import axios from "axios";

const AddPenghuluModal = ({ setIsOpenModalAdd, getPenghulu }) => {
  const [idPegawai, setIdPegawai] = useState("");
  const [filteredPegawai, setFilteredPegawai] = useState([]);
  const [pegawai, setPegawai] = useState([]);
  const [msg, setMsg] = useState("");
  const getPegawai = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pegawai");
      setPegawai(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPegawai();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await axios.post("http://localhost:5000/penghulu", {
        id_pegawai: idPegawai,
      });
      setIsOpenModalAdd(false);
      getPenghulu();
    } catch (error) {
      console.error("Failed to add Penghulu:", error);
      setMsg(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (idPegawai.trim() !== "") {
      const filtered = pegawai.filter((item) =>
        item.NIP.toLowerCase().startsWith(idPegawai.toLowerCase())
      );
      setFilteredPegawai(filtered);
    } else {
      setFilteredPegawai([]);
    }
  }, [idPegawai, pegawai]);
  const handleSelectNIP = (selectedNIP) => {
    setIdPegawai(selectedNIP);
    setFilteredPegawai([]); // Clear suggestions after selection
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 z-top bg-opacity-30"
    >
      <form
        onSubmit={handleSubmit}
        className=" bg-white rounded-lg shadow-lg inline"
      >
        <div className="">
          <div className="w-full h-full  ">
            <div className="flex items-center justify-between p-4 border-b  rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Tambah Penghulu
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
            <div className="p-4 inline-block w-full">
              <div className="flex grid mb-1 grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">
                  NIP Pegawai:
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    className="input w-full"
                    value={idPegawai}
                    onChange={(e) => setIdPegawai(e.target.value)}
                    required
                  />
                  {filteredPegawai.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {filteredPegawai.map((item, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSelectNIP(item.NIP)}
                        >
                          {item.NIP} - {item.nama_pegawai}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
             
              
             
              <div className="flex items-center justify-between p-4 space-x-3 border-t border-gray-200 rounded-b">
                <h1>{msg}</h1>
                <div className="flex gap-3">
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPenghuluModal;
