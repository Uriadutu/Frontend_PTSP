import React, { useState } from "react";
import axios from "axios";

const AddGuruPakModal = ({ setIsOpenModalAdd, getGuruPak }) => {
  const [idSekolah, setIdSekolah] = useState("");
  const [statusPegawai, setStatusPegawai] = useState("");
  const [kategoriGuru, setKategoriGuru] = useState("");
  const [jenisGuru, setJenisGuru] = useState("");
  const [namaGuru, setNamaGuru] = useState("");
  const [nipGuru, setNipGuru] = useState("");
  const [pangkatGol, setPangkatGol] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tglMulaiKerja, setTglMulaiKerja] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [pendidikanTerakhir, setPendidikanTerakhir] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [tahunLulus, setTahunLulus] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/gurupak", {
        id_sekolah: idSekolah,
        status_pegawai: statusPegawai,
        kategori_guru: kategoriGuru,
        jenis_guru: jenisGuru,
        nama_guru: namaGuru,
        nip_guru: nipGuru,
        pangkat_gol: pangkatGol,
        jabatan: jabatan,
        tgl_mulai_kerja: tglMulaiKerja,
        tempat_lahir: tempatLahir,
        tanggal_lahir: tanggalLahir,
        jenis_kelamin: jenisKelamin,
        pendidikan_terakhir: pendidikanTerakhir,
        jurusan: jurusan,
        tahun_lulus: tahunLulus,
        no_telp: noTelp,
        email: email,
      });

      setIsOpenModalAdd(false);
      getGuruPak();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-full h-full max-w-2xl md:h-auto"
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Tambah Guru PAK
            </h3>
            <button
              type="button"
              onClick={() => setIsOpenModalAdd(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-5 mb-2">
              <label htmlFor="idSekolah" className="label-input">
                ID Sekolah
              </label>
              <input
                id="idSekolah"
                className="w-full input"
                value={idSekolah}
                onChange={(e) => setIdSekolah(e.target.value)}
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
              <label htmlFor="statusPegawai" className="label-input">
                Status Pegawai
              </label>
              <input
                id="statusPegawai"
                className="w-full input"
                value={statusPegawai}
                onChange={(e) => setStatusPegawai(e.target.value)}
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
              <label htmlFor="kategoriGuru" className="label-input">
                Kategori Guru
              </label>
              <input
                id="kategoriGuru"
                className="w-full input"
                value={kategoriGuru}
                onChange={(e) => setKategoriGuru(e.target.value)}
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
              <label htmlFor="jenisGuru" className="label-input">
                Jenis Guru
              </label>
              <input
                id="jenisGuru"
                className="w-full input"
                value={jenisGuru}
                onChange={(e) => setJenisGuru(e.target.value)}
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
              <label htmlFor="namaGuru" className="label-input">
                Nama Guru
              </label>
              <input
                id="namaGuru"
                className="w-full input"
                value={namaGuru}
                onChange={(e) => setNamaGuru(e.target.value)}
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
              <label htmlFor="nipGuru" className="label-input">
                NIP Guru
              </label>
              <input
                id="nipGuru"
                className="w-full input"
                value={nipGuru}
                onChange={(e) => setNipGuru(e.target.value)}
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
              <label htmlFor="pangkatGol" className="label-input">
                Pangkat Gol
              </label>
              <input
                id="pangkatGol"
                className="w-full input"
                value={pangkatGol}
                onChange={(e) => setPangkatGol(e.target.value)}
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
              <label htmlFor="jabatan" className="label-input">
                Jabatan
              </label>
              <input
                id="jabatan"
                className="w-full input"
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
              <label htmlFor="tglMulaiKerja" className="label-input">
                Tanggal Mulai Kerja
              </label>
              <input
                id="tglMulaiKerja"
                className="w-full input"
                value={tglMulaiKerja}
                onChange={(e) => setTglMulaiKerja(e.target.value)}
                type="text"
              />
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
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
              <label htmlFor="jenisKelamin" className="label-input">
                Jenis Kelamin
              </label>
              <input
                id="jenisKelamin"
                className="w-full input"
                value={jenisKelamin}
                onChange={(e) => setJenisKelamin(e.target.value)}
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
              <label htmlFor="pendidikanTerakhir" className="label-input">
                Pendidikan Terakhir
              </label>
              <input
                id="pendidikanTerakhir"
                className="w-full input"
                value={pendidikanTerakhir}
                onChange={(e) => setPendidikanTerakhir(e.target.value)}
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
              <label htmlFor="jurusan" className="label-input">
                Jurusan
              </label>
              <input
                id="jurusan"
                className="w-full input"
                value={jurusan}
                onChange={(e) => setJurusan(e.target.value)}
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
              <label htmlFor="tahunLulus" className="label-input">
                Tahun Lulus
              </label>
              <input
                id="tahunLulus"
                className="w-full input"
                value={tahunLulus}
                onChange={(e) => setTahunLulus(e.target.value)}
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
              <label htmlFor="noTelp" className="label-input">
                No. Telp
              </label>
              <input
                id="noTelp"
                className="w-full input"
                value={noTelp}
                onChange={(e) => setNoTelp(e.target.value)}
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
              <label htmlFor="email" className="label-input">
                Email
              </label>
              <input
                id="email"
                className="w-full input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>
          </div>
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => setIsOpenModalAdd(false)}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
            >
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddGuruPakModal;

