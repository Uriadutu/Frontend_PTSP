import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddSiswaModal = ({ setIsOpenModalAdd, getSiswa }) => {
  const [tahunAjaran, setTahunAjaran] = useState("");
  const [nomorInduk, setNomorInduk] = useState("");
  const [NISN, setNISN] = useState("");
  const [namaSiswa, setNamaSiswa] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [agama, setAgama] = useState("");
  const [kelas, setKelas] = useState("")
  const [namaAyah, setNamaAyah] = useState("");
 
  const [namaIbu, setNamaIbu] = useState("");
 
  const [alamat, setAlamat] = useState("");
  const [nomorTeleponOrtu, setNomorTeleponOrtu] = useState("");
  const { idsekolah, jenjang } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/siswa", {
        id_sekolah: idsekolah,
        tahun_ajaran: tahunAjaran,
        jenjang_sekolah: jenjang,
        nomor_induk: nomorInduk,
        NISN: NISN,
        nama_siswa: namaSiswa,
        jenis_kelamin: jenisKelamin,
        tempat_lahir: tempatLahir,
        tanggal_lahir: tanggalLahir,
        agama: agama,
        kelas : kelas,
        nama_ayah: namaAyah,
      
        nama_ibu: namaIbu,
       
        alamat: alamat,
        nomor_telepon_ortu: nomorTeleponOrtu,
      });

      setIsOpenModalAdd(false);
      getSiswa(idsekolah);
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
              Tambah Data Siswa
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
                <label htmlFor="tahunAjaran" className="label-input">
                  Tahun Ajaran
                </label>
                <input
                  id="tahunAjaran"
                  className="w-full input"
                  value={tahunAjaran}
                  onChange={(e) => setTahunAjaran(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="nomorInduk" className="label-input">
                  Nomor Induk
                </label>
                <input
                  id="nomorInduk"
                  className="w-full input"
                  value={nomorInduk}
                  onChange={(e) => setNomorInduk(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="NISN" className="label-input">
                  NISN
                </label>
                <input
                  id="NISN"
                  className="w-full input"
                  value={NISN}
                  onChange={(e) => setNISN(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="namaSiswa" className="label-input">
                  Nama Siswa
                </label>
                <input
                  id="namaSiswa"
                  className="w-full input"
                  value={namaSiswa}
                  onChange={(e) => setNamaSiswa(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jenisKelamin" className="label-input">
                  Jenis Kelamin
                </label>
                <select
                  id="jenisKelamin"
                  className="input py-0"
                  value={jenisKelamin}
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
                <label htmlFor="tempatLahir" className="label-input">
                  Tempat Lahir
                </label>
                <input
                  id="tempatLahir"
                  className="w-full input"
                  value={tempatLahir}
                  onChange={(e) => setTempatLahir(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="tanggalLahir" className="label-input">
                  Tanggal Lahir
                </label>
                <input
                  id="tanggalLahir"
                  className="w-full input"
                  value={tanggalLahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                  type="date"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="agama" className="label-input">
                  Agama
                </label>
                <select
                  id="agama"
                  className="input py-0"
                  value={agama}
                  onChange={(e) => setAgama(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Agama
                  </option>
                  <option value="Islam">Islam</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Konghucu">Konghucu</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="namaAyah" className="label-input">
                  Kelas
                </label>
                <input
                  id="namaAyah"
                  className="w-full input"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="namaAyah" className="label-input">
                  Nama Ayah
                </label>
                <input
                  id="namaAyah"
                  className="w-full input"
                  value={namaAyah}
                  onChange={(e) => setNamaAyah(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="namaIbu" className="label-input">
                  Nama Ibu
                </label>
                <input
                  id="namaIbu"
                  className="w-full input"
                  value={namaIbu}
                  onChange={(e) => setNamaIbu(e.target.value)}
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
                <label htmlFor="nomorTeleponOrtu" className="label-input">
                  Nomor Telepon Orang Tua
                </label>
                <input
                  id="nomorTeleponOrtu"
                  className="w-full input"
                  value={nomorTeleponOrtu}
                  onChange={(e) => setNomorTeleponOrtu(e.target.value)}
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

export default AddSiswaModal;
