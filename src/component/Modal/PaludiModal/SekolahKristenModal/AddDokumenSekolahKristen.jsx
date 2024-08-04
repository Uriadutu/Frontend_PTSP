import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddDokumenSekolahKristen = ({
  setIsOpenModalAdd,
  getDokumenSekolahBySekolah,
  id_sekolah
}) => {
    const [skIzinFile, setSkIzinFile] = useState(null);
    const [noRegFile, setNoRegFile] = useState(null);
    const [akreditasiFile, setAkreditasiFile] = useState(null);
    const [nssFile, setNssFile] = useState(null);
    const [sertiTanahFile, setSertiTanahFile] = useState(null);



  const loadFile = (e, setFile) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const tambahDokumen = async (e) => {
    e.preventDefault();
    if (
      !skIzinFile ||
      !noRegFile ||
      !akreditasiFile ||
      !nssFile ||
      !sertiTanahFile
    ) {
      console.log("Pilih semua file terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("id_sekolah", id_sekolah);
    formData.append("sk_izin_file", skIzinFile);
    formData.append("no_reg_file", noRegFile);
    formData.append("akreditasi_file", akreditasiFile);
    formData.append("nss_file", nssFile);
    formData.append("serti_tanah_file", sertiTanahFile);

    try {
      await axios.post("http://localhost:5000/dokumen-sekolah-kristen", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      setIsOpenModalAdd(false);
      getDokumenSekolahBySekolah(id_sekolah);
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
      <form onSubmit={tambahDokumen}>
        <div className="w-full max-w-[60&] bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Tambah Dokumen Sekolah
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
          <div className="p-4 space-y-4">
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="sk_izin_file" className="label-input">
                  SK Izin File
                </label>
                <input
                  onChange={(e) => loadFile(e, setSkIzinFile)}
                  type="file"
                  id="sk_izin_file"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="no_reg_file" className="label-input">
                  No Reg File
                </label>
                <input
                  onChange={(e) => loadFile(e, setNoRegFile)}
                  type="file"
                  id="no_reg_file"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="akreditasi_file" className="label-input">
                  Akreditasi File
                </label>
                <input
                  onChange={(e) => loadFile(e, setAkreditasiFile)}
                  type="file"
                  id="akreditasi_file"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="nss_file" className="label-input">
                  NSS File
                </label>
                <input
                  onChange={(e) => loadFile(e, setNssFile)}
                  type="file"
                  id="nss_file"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="serti_tanah_file" className="label-input">
                  Serti Tanah File
                </label>
                <input
                  onChange={(e) => loadFile(e, setSertiTanahFile)}
                  type="file"
                  id="serti_tanah_file"
                  className="w-full input"
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

export default AddDokumenSekolahKristen;
