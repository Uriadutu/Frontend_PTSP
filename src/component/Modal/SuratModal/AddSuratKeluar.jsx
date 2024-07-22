import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddSuratKeluarModal = ({ setIsOpenModalAdd, getSuratKeluarBySub }) => {
  const [KodeSurat, setKodeSurat] = useState("");
  const [SifatSurat, setSifatSurat] = useState("");
  const [PerihalSurat, setPerihalSurat] = useState("");
  const [AsalSurat, setAsalSurat] = useState("");
  const [Kepada, setKepada] = useState("");
  const [Tempat, setTempat] = useState("");
  const [Tanggal, setTanggal] = useState("");
  const [Pejabat, setPejabat] = useState("");
  const [File, setFile] = useState("");

  const { sub } = useParams();
  console.log(sub);
 
  const loadFile = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };


  const tambahSurat = async (e) => {
    e.preventDefault();
    if (!File) {
      console.log("Pilih file terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("fitur_surat", sub);
    formData.append("kode_surat", KodeSurat);
    formData.append("sifat_surat", SifatSurat);
    formData.append("perihal_surat", PerihalSurat);
    formData.append("asal_surat", AsalSurat);
    formData.append("kepada", Kepada);
    formData.append("tempat", Tempat);
    formData.append("tanggal", Tanggal);
    formData.append("pejabat", Pejabat);
    formData.append("file", File);

    try {
      await axios.post("http://localhost:5000/suratkeluar", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      setIsOpenModalAdd(false)
      getSuratKeluarBySub(sub);

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
      <form onSubmit={tambahSurat}>
        <div className="w-full max-w-[60&] bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Tambah Surat Keluar
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
                <label htmlFor="name" className="label-input">
                  Kode Surat
                </label>
                <input
                  value={KodeSurat}
                  onChange={(e) => setKodeSurat(e.target.value)}
                  type="text"
                  id="name"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="name" className="label-input">
                  {" "}
                  <br />
                  Sifat Surat
                </label>
                <select
                  className="input py-0"
                  value={SifatSurat}
                  onChange={(e) => setSifatSurat(e.target.value)}
                >

                  <option value="" disabled>Pilih Sifat Surat</option>
                  <option value="Biasa">Biasa</option>
                  <option value="Rahasia">Rahasia</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="name" className="label-input">
                  Perihal Surat
                </label>
                <input
                  value={PerihalSurat}
                  onChange={(e) => setPerihalSurat(e.target.value)}
                  type="text"
                  id="name"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="name" className="label-input">
                  Asal Surat
                </label>
                <input
                  value={AsalSurat}
                  onChange={(e) => setAsalSurat(e.target.value)}
                  type="text"
                  id="name"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="name" className="label-input">
                  Diajukan Kepada
                </label>
                <input
                  value={Kepada}
                  onChange={(e) => setKepada(e.target.value)}
                  type="text"
                  id="name"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="name" className="label-input">
                  Tempat
                </label>
                <input
                  value={Tempat}
                  onChange={(e) => setTempat(e.target.value)}
                  type="text"
                  id="name"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="name" className="label-input">
                  Tanggal
                </label>
                <input
                  value={Tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  type="date"
                  id="name"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="name" className="label-input">
                  Nama Penenda Tangan
                </label>
                <input
                  value={Pejabat}
                  onChange={(e) => setPejabat(e.target.value)}
                  type="text"
                  id="name"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="name" className="label-input">
                  Upload Surat
                </label>
                <input
                  name ="file"
                  onChange={loadFile}
                  type="file"
                  id="name"
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

export default AddSuratKeluarModal;
