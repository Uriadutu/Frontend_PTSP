import React, { useState } from "react";
import axios from "axios";

const AddHajiModal = ({ setIsOpenModalAdd, getHaji }) => {
  const [NomorPorsi, setNomorPorsi] = useState("");
  const [TanggalDaftar, setTanggalDaftar] = useState("");
  const [NamaJamaahHaji, setNamaJamaahHaji] = useState("");
  const [JenisKelamin, setJenisKelamin] = useState("");
  const [Pekerjaan, setPekerjaan] = useState("");
  const [TempatLahir, setTempatLahir] = useState("");
  const [TanggalLahir, setTanggalLahir] = useState("");
  const [Desa, setDesa] = useState("");
  const [Kecamatan, setKecamatan] = useState("");
  const [Bank, setBank] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/haji", {
        nomor_porsi: NomorPorsi,
        tanggal_porsi: TanggalDaftar,
        nama_jamaah: NamaJamaahHaji,
        jenis_kelamin: JenisKelamin,
        pekerjaan: Pekerjaan,
        tempat_lahir: TempatLahir,
        tanggal_lahir: TanggalLahir,
        nama_desa: Desa,
        kecamatan: Kecamatan,
        bank: Bank,
        status_keberangkatan: "-",
        tgl_berangkat: "-",
      });

      setIsOpenModalAdd(false);
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
      <form onSubmit={handleSubmit} className=" h-[90%]">
        <div className="w-full bg-white rounded-lg shadow-lg h-full inline-block">
          <div className="flex items-center justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900">
              Tambah Data Jamaah Haji
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
                <label htmlFor="nomorPorsi" className="label-input">
                  Nomor Porsi
                </label>
                <input
                  value={NomorPorsi}
                  onChange={(e) => setNomorPorsi(e.target.value)}
                  type="number"
                  id="nomorPorsi"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="tanggalDaftar" className="label-input">
                  Tanggal Daftar
                </label>
                <input
                  value={TanggalDaftar}
                  onChange={(e) => setTanggalDaftar(e.target.value)}
                  type="date"
                  id="tanggalDaftar"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="namaJamaahHaji" className="label-input">
                  Nama Jamaah Haji
                </label>
                <input
                  value={NamaJamaahHaji}
                  onChange={(e) => setNamaJamaahHaji(e.target.value)}
                  type="text"
                  id="namaJamaahHaji"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jenisKelamin" className="label-input">
                  Jenis Kelamin
                </label>
                <select
                  className="input py-0"
                  value={JenisKelamin}
                  onChange={(e) => setJenisKelamin(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Jenis Kelamin
                  </option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="pekerjaan" className="label-input">
                  Pekerjaan
                </label>
                <input
                  value={Pekerjaan}
                  onChange={(e) => setPekerjaan(e.target.value)}
                  type="text"
                  id="pekerjaan"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="tempatLahir" className="label-input">
                  Tempat Lahir
                </label>
                <input
                  value={TempatLahir}
                  onChange={(e) => setTempatLahir(e.target.value)}
                  type="text"
                  id="tempatLahir"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="tanggalLahir" className="label-input">
                  Tanggal Lahir
                </label>
                <input
                  value={TanggalLahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                  type="date"
                  id="tanggalLahir"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="desa" className="label-input">
                  Desa
                </label>
                <input
                  value={Desa}
                  onChange={(e) => setDesa(e.target.value)}
                  type="text"
                  id="desa"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="kecamatan" className="label-input">
                  Kecamatan
                </label>
                <input
                  value={Kecamatan}
                  onChange={(e) => setKecamatan(e.target.value)}
                  type="text"
                  id="kecamatan"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="bank" className="label-input">
                  Bank
                </label>
                <input
                  value={Bank}
                  onChange={(e) => setBank(e.target.value)}
                  type="text"
                  id="bank"
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

export default AddHajiModal;
