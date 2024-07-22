import React, { useState } from "react";
import axios from "axios";

const InfoHaji = () => {
  const [nomorPorsi, setNomorPorsi] = useState("");
  const [hajiData, setHajiData] = useState(null);
  const [searchDone, setSearchDone] = useState(false);
  const [statusKeberangkatan, setStatusKeberangkatan] = useState("");
  const [tahunKeberangkatan, setTahunKeberangkatan] = useState("");

  const handleSearch = async () => {
    setSearchDone(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/haji/porsi/${nomorPorsi}`
      );
      setHajiData(response.data);
    } catch (error) {
      console.error("Data tidak ditemukan", error);
      setHajiData(null);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const updatedTahunKeberangkatan =
      statusKeberangkatan === "Batal Berangkat" ? "-" : tahunKeberangkatan;

    try {
      await axios.patch(
        `http://localhost:5000/haji/berangkat/${hajiData.nomor_porsi}`,
        {
          status_keberangkatan: statusKeberangkatan,
          tgl_berangkat: updatedTahunKeberangkatan,
        }
      );
      alert("Berhasil Di Update");
      handleSearch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contain">
      <h1 className="judul">Info Haji</h1>
      <div className="input bg-white inline-block">
        <input
          type="text"
          placeholder="Cari Nomor Porsi"
          value={nomorPorsi}
          onChange={(e) => setNomorPorsi(e.target.value)}
          className="inp-fokus outline-none"
        />
        <button onClick={handleSearch} className="btn-search">
          Cari
        </button>
      </div>
      {hajiData ? (
        <div className="mt-3">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-left">
                  Nomor Porsi
                </th>
                <th className="border border-gray-300 p-2 text-left">Nama</th>
                <th className="border border-gray-300 p-2 text-left">
                  Tanggal Daftar
                </th>
                <th className="border border-gray-300 p-2 text-left">Alamat</th>
                <th className="border border-gray-300 p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 ">
                  {hajiData.nomor_porsi}
                </td>
                <td className="border border-gray-300 p-2 ">
                  {hajiData.nama_jamaah}
                </td>
                <td className="border border-gray-300 p-2 ">
                  {hajiData.tanggal_porsi}
                </td>
                <td className="border border-gray-300 p-2 ">
                  {hajiData.kecamatan} - {hajiData.nama_desa}
                </td>
                <td className="border border-gray-300 p-2 ">
                  {hajiData.status_keberangkatan || "-"}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4 w-1/2">
            <form onSubmit={handleSave}>
              <div className="mb-4 grid grid-cols-2 gap-3">
                <label htmlFor="statusKeberangkatan" className="label-input">
                  Status Keberangkatan
                </label>
                <select
                  id="statusKeberangkatan"
                  className="input"
                  value={statusKeberangkatan}
                  onChange={(e) => setStatusKeberangkatan(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Status
                  </option>
                  <option value="Berangkat">Berangkat</option>
                  <option value="Batal Berangkat">Batal Berangkat</option>
                </select>
              </div>

              {statusKeberangkatan === "Berangkat" && (
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <label htmlFor="tahunKeberangkatan" className="label-input">
                    Tahun Keberangkatan
                  </label>
                  <input
                    type="text"
                    id="tahunKeberangkatan"
                    className="input"
                    value={tahunKeberangkatan}
                    onChange={(e) => setTahunKeberangkatan(e.target.value)}
                    required
                  />
                </div>
              )}
              <button type="submit" className="btn-simpan">
                Simpan
              </button>
            </form>
          </div>
        </div>
      ) : searchDone ? (
        <div className="mt-3">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Nomor Porsi</th>
                <th className="border border-gray-300 p-2">Tanggal Daftar</th>
                <th className="border border-gray-300 p-2">Nama</th>
                <th className="border border-gray-300 p-2">Alamat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="text-center p-2">
                  Data Tidak Ditemukan
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default InfoHaji;
