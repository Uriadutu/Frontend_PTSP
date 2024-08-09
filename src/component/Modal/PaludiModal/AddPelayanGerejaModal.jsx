import React, { useEffect, useState } from "react";
import axios from "axios";

const AddPelayanGerejaModal = ({ setIsOpenModalAdd, getPelayanGereja }) => {
  const [namaGereja, setNamaGereja] = useState("");
  const [namaPelayan, setNamaPelayan] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [pendidikanTerakhir, setPendidikanTerakhir] = useState("");
  const [jabatanPelayan, setJabatanPelayan] = useState("");
  const [jabatanBPHJ, setJabatanBPHJ] = useState("");
  const [jabatanBidang, setJabatanBidang] = useState("");
  const [gereja, setGereja] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/pelayangereja", {
        nama_gereja: namaGereja && namaGereja.nama_gereja,
        nama_pelayan: namaPelayan,
        jenis_kelamin: jenisKelamin,
        pendidikan_terakhir: pendidikanTerakhir,
        jabatan_pelayan: jabatanPelayan,
        jabatan_bphj: jabatanBPHJ,
        jabatan_bidang: jabatanBidang,
        gerejaId: namaGereja && namaGereja.id,
      });

      setIsOpenModalAdd(false);
      getPelayanGereja();
    } catch (error) {
      console.error(error);
    }
  };

  const getGereja = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/gereja"
      );
      setGereja(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGereja();
  }, []);

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
              Tambah Pelayan Gereja
            </h3>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto"
              data-modal-toggle="default-modal"
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
                <label htmlFor="name" className="label-input">
                  Nama Gereja
                </label>
                <select
                  value={namaGereja?.id || ""}
                  onChange={(e) =>
                    setNamaGereja(
                      gereja.find((item) => item.id === +e.target.value)
                    )
                  }
                  className="input"
                  required
                >
                  <option value="" disabled>
                    Pilih Gereja
                  </option>
                  {gereja.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.nama_gereja}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label
                  htmlFor="nama_pelayan"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nama Pelayan
                </label>
                <input
                  type="text"
                  id="nama_pelayan"
                  className="input w-full"
                  value={namaPelayan}
                  onChange={(e) => setNamaPelayan(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label
                  htmlFor="jenis_kelamin"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Jenis Kelamin
                </label>
                <select
                  id="jenis_kelamin"
                  className="input w-full"
                  value={jenisKelamin}
                  onChange={(e) => setJenisKelamin(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Pilih Jenis Kelamin
                  </option>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label
                  htmlFor="pendidikan_terakhir"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Pendidikan Terakhir
                </label>
                <input
                  type="text"
                  id="pendidikan_terakhir"
                  className="input w-full"
                  value={pendidikanTerakhir}
                  onChange={(e) => setPendidikanTerakhir(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label
                  htmlFor="jabatan_pelayan"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Jabatan Pelayan
                </label>
                <select
                  id="jabatan_pelayan"
                  className="input w-full"
                  value={jabatanPelayan}
                  onChange={(e) => setJabatanPelayan(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Pilih Jabatan Pelayan
                  </option>
                  <option value="Pendeta">Pendeta</option>
                  <option value="Pendeta Pelayan">Pendeta Pelayan</option>
                  <option value="Penatua">Penatua</option>
                  <option value="Diaken">Diaken</option>
                  <option value="Kolekta">Kolekta</option>
                  <option value="Musik">Musik</option>
                  <option value="Prokantor/Singer">Prokantor/Singer</option>
                  <option value="Kostor">Kostor</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label
                  htmlFor="jabatan_bphj"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Jabatan BPHJ
                </label>
                <select
                  id="jabatan_bphj"
                  className="input w-full"
                  value={jabatanBPHJ}
                  onChange={(e) => setJabatanBPHJ(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Pilih Jabatan BPHJ
                  </option>
                  <option value="Ketua">Ketua</option>
                  <option value="Wakil Ketua">Wakil Ketua</option>
                  <option value="Sekretaris">Sekretaris</option>
                  <option value="Bendahara">Bendahara</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label
                  htmlFor="jabatan_bidang"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Jabatan Bidang
                </label>
                <select
                  id="jabatan_bidang"
                  className="input w-full"
                  value={jabatanBidang}
                  onChange={(e) => setJabatanBidang(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Pilih Jabatan Bidang
                  </option>
                  <option value="Bidang Lansia">Bidang Lansia</option>
                  <option value="Kaum Bapak">Kaum Bapak</option>
                  <option value="Kaum Ibu">Kaum Ibu</option>
                  <option value="Kaum Bapak">Pemuda</option>
                  <option value="Remaja">Remaja</option>
                  <option value="Anak">Anak</option>
                </select>
              </div>
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

export default AddPelayanGerejaModal;
