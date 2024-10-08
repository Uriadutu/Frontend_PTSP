import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddGuruPakModal = ({ setIsOpenModalAdd, getGuru }) => {
  const [statusPegawai, setStatusPegawai] = useState("");
  const [kategoriGuru, setKategoriGuru] = useState("");
  const [jenisGuru, setJenisGuru] = useState("");
  const [namaGuru, setNamaGuru] = useState("");
  const [nip, setNip] = useState("");
  const [pangkatGolongan, setPangkatGolongan] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tanggalMulaiKerja, setTanggalMulaiKerja] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [pendidikanTerakhir, setPendidikanTerakhir] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [tahunLulus, setTahunLulus] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [email, setEmail] = useState("");
  const { idsekolah, jenjang } = useParams();


  const handleStatusPegawaiChange = (e) => {
    setStatusPegawai(e.target.value);
    if (e.target.value === "PNS" || e.target.value === "PPPK") {
      // Fetch NIP and Pangkat/Golongan data if needed
    } else {
      setNip("-");
      setPangkatGolongan("-");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/gurupak", {
        id_sekolah: idsekolah,
        jenjang: jenjang,
        status_pegawai: statusPegawai,
        kategori_guru: kategoriGuru,
        jenis_guru: jenisGuru,
        nama_guru: namaGuru,
        nip_guru: nip,
        pangkat_gol: pangkatGolongan,
        jabatan: jabatan,
        tgl_mulai_kerja: tanggalMulaiKerja,
        tempat_lahir: tempatLahir,
        tanggal_lahir: tanggalLahir,
        jenis_kelamin: jenisKelamin,
        pendidikan_terakhir: pendidikanTerakhir,
        jurusan: jurusan,
        tahun_lulus: tahunLulus,
        no_telp: nomorTelepon,
        email: email,
      });

      setIsOpenModalAdd(false);
      getGuru(idsekolah);
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
              Tambah Data Guru PAK
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
                <label htmlFor="statusPegawai" className="label-input">
                  Status Pegawai
                </label>
                <select
                  id="statusPegawai"
                  className="input py-0"
                  value={statusPegawai}
                  onChange={handleStatusPegawaiChange}
                >
                  <option value="" disabled>
                    Pilih Status
                  </option>
                  <option value="PNS">PNS</option>
                  <option value="PPPK">PPPK</option>
                  <option value="Honorer">Honorer</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="kategoriGuru" className="label-input">
                  Kategori Guru
                </label>
                <select
                  id="kategoriGuru"
                  className="input py-0"
                  value={kategoriGuru}
                  onChange={(e) => setKategoriGuru(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  <option value="Guru Pemda">Guru Pemda</option>
                  <option value="Guru Kemenag">Guru Kemenag</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jenisGuru" className="label-input">
                  Jenis Guru
                </label>
                <select
                  id="jenisGuru"
                  className="input py-0"
                  value={jenisGuru}
                  onChange={(e) => setJenisGuru(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Jenis
                  </option>
                  <option value="Sertifikasi">Sertifikasi</option>
                  <option value="Non Sertifikasi">Non Sertifikasi</option>
                </select>
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
              {statusPegawai === "PNS" || statusPegawai === "PPPK" ? (
                <>
                  <div className="grid grid-cols-2 gap-5 mb-2">
                    <label htmlFor="nip" className="label-input">
                      NIP
                    </label>
                    <input
                      id="nip"
                      className="w-full input"
                      value={nip}
                      onChange={(e) => setNip(e.target.value)}
                      type="number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5 mb-2">
                    <label htmlFor="pangkatGolongan" className="label-input">
                      Pangkat/Golongan
                    </label>
                    <select
                      id="pangkatGolongan"
                      className="input py-0"
                      value={pangkatGolongan}
                      onChange={(e) => setPangkatGolongan(e.target.value)}
                    >
                      <option value="" disabled>
                        Pilih Pangkat/Golongan
                      </option>
                      <option value="Penata Muda, IX">Penata Muda, IX</option>
                      <option value="Penata Muda, III/a">
                        Penata Muda, III/a
                      </option>
                      <option value="Penata Muda Tingkat I, III/b">
                        Penata Muda Tingkat I, III/b
                      </option>
                      <option value="Penata, III/c">Penata, III/c</option>
                      <option value="Penata Tingkat I, III/d">
                        Penata Tingkat I, III/d
                      </option>
                      <option value="Pembina, IV/a">Pembina, IV/a</option>
                      <option value="Pembina Tingkat I, IV/b">
                        Pembina Tingkat I, IV/b
                      </option>
                      <option value="Pembina Utama Muda, IV/c">
                        Pembina Utama Muda, IV/c
                      </option>
                      <option value="Pembina Utama Madya, IV/d">
                        Pembina Utama Madya, IV/d
                      </option>
                      <option value="Pembina Utama, IV/e">
                        Pembina Utama, IV/e
                      </option>
                    </select>
                  </div>
                </>
              ) : null}
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
                <label htmlFor="tanggalMulaiKerja" className="label-input">
                  Tanggal Mulai Kerja
                </label>
                <input
                  id="tanggalMulaiKerja"
                  className="w-full input"
                  value={tanggalMulaiKerja}
                  onChange={(e) => setTanggalMulaiKerja(e.target.value)}
                  type="date"
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
                  type="date"
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
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
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
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="nomorTelepon" className="label-input">
                  Nomor Telepon
                </label>
                <input
                  id="nomorTelepon"
                  className="w-full input"
                  value={nomorTelepon}
                  onChange={(e) => setNomorTelepon(e.target.value)}
                  type="number"
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

export default AddGuruPakModal;
