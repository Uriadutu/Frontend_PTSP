import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddSekolahModal = ({ setIsOpenModalAdd, getSekolah }) => {
  const [NamaSekolah, setNamaSekolah] = useState("");
  const [NSS, setNSS] = useState("");
  const [Npsn, setNpsn] = useState("");
  const [Alamat, setAlamat] = useState("");
  const [NomorTelepon, setNomorTelepon] = useState("");
  const [TahunBerdiri, setTahunBerdiri] = useState("");
  const [StatusAkreditasi, setStatusAkreditasi] = useState("");
  const [StatusBangunan, setStatusBangunan] = useState("");
  const [skIzin, setSkIzin] = useState("");
  const [NoHerRegistrasiPendirian, setNoHerRegistrasiPendirian] = useState("");
  const [JumlahRombel, setJumlahRombel] = useState("");
  const [NamaKepalaSekolah, setNamaKepalaSekolah] = useState("");
  const [NIP, setNIP] = useState("");

  // const { sub } = useParams();
  const { jenjang, status } = useParams();
  const statusSekolah = jenjang + status;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/sekolah", {
        nama_sekolah: NamaSekolah,
        jenjang_sekolah: jenjang,
        status_sekolah: status,
        nss: NSS,
        npsn: Npsn,
        alamat: Alamat,
        no_telp: NomorTelepon,
        tahun_berdiri: TahunBerdiri,
        status_akreditasi: StatusAkreditasi,
        status_bangunan: StatusBangunan,
        sk_izin: skIzin,
        req_pendirian: NoHerRegistrasiPendirian,
        jumlah_rombel: JumlahRombel,
        nama_kepsek: NamaKepalaSekolah,
        nip_kepsek: NIP,
      });

      setIsOpenModalAdd(false);
      getSekolah(statusSekolah);
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
              Tambah Data Sekolah
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
                <label htmlFor="namaSekolah" className="label-input">
                  Nama Sekolah
                </label>
                <input
                  value={NamaSekolah}
                  onChange={(e) => setNamaSekolah(e.target.value)}
                  type="text"
                  id="namaSekolah"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="nss" className="label-input">
                  NSS 
                </label>
                <input
                  value={NSS}
                  onChange={(e) => setNSS(e.target.value)}
                  type="text"
                  id="nss"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="nss" className="label-input">
                  NPSN
                </label>
                <input
                  value={Npsn}
                  onChange={(e) => setNpsn(e.target.value)}
                  type="text"
                  id="npsn"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="alamat" className="label-input">
                  Alamat
                </label>
                <input
                  value={Alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  type="text"
                  id="alamat"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="nomorTelepon" className="label-input">
                  Nomor Telepon
                </label>
                <input
                  value={NomorTelepon}
                  onChange={(e) => setNomorTelepon(e.target.value)}
                  type="number"
                  id="nomorTelepon"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="tahunBerdiri" className="label-input">
                  Tahun Berdiri
                </label>
                <input
                  value={TahunBerdiri}
                  onChange={(e) => setTahunBerdiri(e.target.value)}
                  type="number"
                  id="tahunBerdiri"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="statusAkreditasi" className="label-input">
                  Status Akreditasi
                </label>
                <select
                  className="input py-0"
                  value={StatusAkreditasi}
                  onChange={(e) => setStatusAkreditasi(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Akreditasi
                  </option>
                  <option value="Belum Akreditasi">Belum Akreditasi</option>
                  <option value="Akreditasi A">Akreditasi A</option>
                  <option value="Akreditasi B">Akreditasi B</option>
                  <option value="Akreditasi C">Akreditasi C</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="statusBangunan" className="label-input">
                  Status Bangunan
                </label>
                <select
                  className="input py-0"
                  value={StatusBangunan}
                  onChange={(e) => setStatusBangunan(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Status Bangunan
                  </option>
                  <option value="Milik Sendiri">Milik Sendiri</option>
                  <option value="Sewa">Sewa</option>
                  <option value="Hibah">Hibah</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label
                  htmlFor="skizinPendirian"
                  className="label-input"
                >
                  Sk Izin Pedirian
                </label>
                <input
                  value={skIzin}
                  onChange={(e) => setSkIzin(e.target.value)}
                  type="text"
                  id="skizinPendirian"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label
                  htmlFor="noHerRegistrasiPendirian"
                  className="label-input"
                >
                  No. Her Registrasi Pendirian
                </label>
                <input
                  value={NoHerRegistrasiPendirian}
                  onChange={(e) => setNoHerRegistrasiPendirian(e.target.value)}
                  type="text"
                  id="noHerRegistrasiPendirian"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jumlahRombel" className="label-input">
                  Jumlah Rombel
                </label>
                <input
                  value={JumlahRombel}
                  onChange={(e) => setJumlahRombel(e.target.value)}
                  type="number"
                  id="jumlahRombel"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="namaKepalaSekolah" className="label-input">
                  Nama Kepala Sekolah
                </label>
                <input
                  value={NamaKepalaSekolah}
                  onChange={(e) => setNamaKepalaSekolah(e.target.value)}
                  type="text"
                  id="namaKepalaSekolah"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="nip" className="label-input">
                  NIP Kepala Sekolah
                </label>
                <input
                  value={NIP}
                  onChange={(e) => setNIP(e.target.value)}
                  type="number"
                  id="NIP"
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

export default AddSekolahModal;
