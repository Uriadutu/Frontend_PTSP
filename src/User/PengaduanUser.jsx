import axios from "axios";
import React, { useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { LuGlobe } from "react-icons/lu";
import { FiMapPin } from "react-icons/fi";

const PengaduanUser = () => {
  const [judulLaporan, setJudulLaporan] = useState("");
  const [tglKejadian, setTglKejadian] = useState("");
  const [lokasiKejadian, setLokasiKejadian] = useState("");
  const [kategori, setKategori] = useState("");
  const [kategoriLainnya, setKategoriLainnya] = useState("");
  const [deskripsiPengaduan, setDeskripsiPengaduan] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/pengaduan-user", {
        judul_laporan: judulLaporan,
        tgl_kejadian: tglKejadian,
        lokasi_kejadian: lokasiKejadian,
        kategori_laporan: kategori === "Lainnya" ? kategoriLainnya : kategori,
        deskripsiPengaduan,
      });
      setJudulLaporan("");
      setTglKejadian("");
      setLokasiKejadian("");
      setKategori("");
      setDeskripsiPengaduan("");
      alert("Pengaduan Berhasil Terkirim");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-white w-full px-4 ">
      <h1 className="text-center mb-6 sm:mb-[100px] text-gray-700 font-medium pt-5 text-xl sm:text-2xl">
        Layanan Pengaduan
      </h1>
      <div className=" py-2 grid grid-cols-1 sm:grid-cols-2 items-start">
        <div className="">
          <div className="flex gap-2 items-center">
            <div className="bg-white p-3 rounded-lg border border-gray-600 shadow-md">
              <BsTelephone width={300} color="black" />
            </div>
            <div className="">
              <h1 className="text-black font-semibold ">No Hp</h1>
              <h1 className="text-gray-600 ">082190762241</h1>
            </div>
          </div>
          <div className="flex gap-2 items-center mt-6">
            <div className="bg-white p-3 rounded-lg border border-gray-600 shadow-md">
              <MdOutlineEmail width={300} color="black" />
            </div>
            <div className="">
              <h1 className="text-black font-semibold ">Email</h1>
              <h1 className="text-gray-600 ">humas.kemenaghalbar@gmail.com</h1>
            </div>
          </div>
          <div className="flex gap-2 items-center mt-6">
            <div className="bg-white p-3 rounded-lg border border-gray-600 shadow-md">
              <LuGlobe width={300} color="black" />
            </div>
            <div className="">
              <h1 className="text-black font-semibold ">Website</h1>
              <h1 className="text-gray-600 ">halmaherabarat.kemenag.go.id</h1>
            </div>
          </div>
          <div className="flex gap-2 items-center mt-6">
            <div className="bg-white p-3 rounded-lg border border-gray-600 shadow-md">
              <FiMapPin width={300} color="black" />
            </div>
            <Link
              className="cursor-pointer"
              target="_blank"
              to={
                "https://www.google.com/maps/place/Kemenag+Kab+Halmahera+Barat/@1.0802587,127.4756915,17z/data=!4m14!1m7!3m6!1s0x329b5aae06990d6d:0x46253c14beb3e371!2sKemenag+Kab+Halmahera+Barat!8m2!3d1.0802533!4d127.4782664!16s%2Fg%2F11clyd50hw!3m5!1s0x329b5aae06990d6d:0x46253c14beb3e371!8m2!3d1.0802533!4d127.4782664!16s%2Fg%2F11clyd50hw?entry=ttu"
              }
            >
              <h1 className="text-black font-semibold ">Alamat</h1>
              <h1 className="text-gray-600 ">
                Jl.Pengabdian, No.03, Kompleks Kantor Bupati, Jailolo, 97752
              </h1>
            </Link>
          </div>
        </div>
        <form className="mt-6 sm:mt-0" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="">
              <div className="mb-6">
                <input
                  placeholder="Judul Pengaduan"
                  value={judulLaporan}
                  onChange={(e) => setJudulLaporan(e.target.value)}
                  type="text"
                  id="judulLaporan"
                  className="w-full rounded p-1 mb-3 border border-gray-600  "
                />
                <label className="text-gray-400">Tanggal Pengaduan</label>
                <input
                  value={tglKejadian}
                  placeholder="Tanggal Pengaduan"
                  onChange={(e) => setTglKejadian(e.target.value)}
                  type="date"
                  id="tglKejadian"
                  className="w-full rounded p-1 mb-3 border border-gray-600 "
                />

                <input
                  placeholder="Lokasi Pengaduan"
                  value={lokasiKejadian}
                  onChange={(e) => setLokasiKejadian(e.target.value)}
                  type="text"
                  id="lokasiKejadian"
                  className="w-full rounded p-1 mb-3 border border-gray-600 "
                />

                <label className="text-gray-400">Kategori Pengaduan</label>
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full rounded p-1 mb-3 border border-gray-600 "
                >
                  <option value="Agama">Agama</option>
                  <option value="Ekonomi Dan Keuangan">
                    Ekonomi Dan Keuangan
                  </option>
                  <option value="Kesetaraan Gender">Kesetaraan Gender</option>
                  <option value="Teknologi Informasi Dan Komunikasi">
                    Teknologi Informasi Dan Komunikasi
                  </option>
                  <option value="Sosial Dan Kesejahteraan">
                    Sosial Dan Kesejahteraan
                  </option>
                  <option value="Ketentraman Dan Ketertiban Umum">
                    Ketentraman Dan Ketertiban Umum
                  </option>
                  <option value="Pendidikan Dan Kebudayaan">
                    Pendidikan Dan Kebudayaan
                  </option>
                  <option value="Kekerasan Di Satuan Pendidikan">
                    Kekerasan Di Satuan Pendidikan
                  </option>
                  <option value="Politik Dan Hukum">Politik Dan Hukum</option>
                  <option value="Kependudukan">Kependudukan</option>
                  <option value="Ketenagakerjaan">Ketenagakerjaan</option>
                  <option value="Perhubungan">Perhubungan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>

                {kategori === "Lainnya" && (
                  <div className="mt-4">
                    <input
                      placeholder="Lainnya"
                      value={kategoriLainnya}
                      onChange={(e) => setKategoriLainnya(e.target.value)}
                      type="text"
                      id="kategoriLainnya"
                      className="w-full rounded p-1 mb-3 border border-gray-600 "
                    />
                  </div>
                )}

                <textarea
                  placeholder="Deskripsi Pengaduan"
                  value={deskripsiPengaduan}
                  onChange={(e) => setDeskripsiPengaduan(e.target.value)}
                  id="deskripsiPengaduan"
                  className="w-full rounded p-1 mb-3 border border-gray-600 "
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
            <button type="submit" className="btn btn-simpan">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PengaduanUser;
