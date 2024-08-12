import React, { useEffect, useState } from "react";
import axios from "axios";

const AddAkademikModal = ({ setIsOpenModalAdd, getAkademik }) => {
  const [idPegawai, setIdPegawai] = useState("");
  const [pegawaiId, setPegawaiId] = useState(""); // State baru untuk menyimpan id pegawai
  const [filteredPegawai, setFilteredPegawai] = useState([]);
  const [pegawai, setPegawai] = useState([]);
  const [namaSekolah, setNamaSekolah] = useState("");
  const [filteredSekolah, setFilteredSekolah] = useState([]);
  const [sekolah, setSekolah] = useState([]);
  const [statusAkasemik, setStatusAkademik] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [jumlahPeserta, setJumlahPeserta] = useState(0);

  const [msg, setMsg] = useState("");

  const getPegawai = async () => {
    try {
      const response = await axios.get("http://localhost:5000/peta");
      setPegawai(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSekolah = async () => {
    try {
      const [responseKristen, responseUmum] = await Promise.all([
        axios.get("http://localhost:5000/sekolah-kristen"),
        axios.get("http://localhost:5000/sekolah"),
      ]);
      setSekolah([...responseKristen.data, ...responseUmum.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPegawai();
    getSekolah();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/akademik", {
        id_pegawai: pegawaiId, // Kirim pegawaiId ke backend
        nama_sekolah: namaSekolah,
        status_akademik: statusAkasemik,
        jumlah_peserta: jumlahPeserta,
        keterangan : keterangan ? keterangan : "-",
      });
      setIsOpenModalAdd(false);
      getAkademik();
    } catch (error) {
      console.error("Failed to add Akademik:", error);
      setMsg(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (idPegawai.trim() !== "") {
      const filtered = pegawai.filter((item) =>
        item.Pegawai.NIP.toLowerCase().startsWith(idPegawai.toLowerCase())
      );
      setFilteredPegawai(filtered);
    } else {
      setFilteredPegawai([]);
    }
  }, [idPegawai, pegawai]);

  useEffect(() => {
    if (namaSekolah.trim() !== "") {
      const filtered = sekolah.filter((item) =>
        item.nama_sekolah.toLowerCase().startsWith(namaSekolah.toLowerCase())
      );
      setFilteredSekolah(filtered);
    } else {
      setFilteredSekolah([]);
    }
  }, [namaSekolah, sekolah]);

  const handleSelectNIP = (selectedNIP, id) => {
    setIdPegawai(selectedNIP);
    setPegawaiId(id); // Simpan id pegawai yang dipilih
    setFilteredPegawai([]); // Clear suggestions after selection
  };

  const handleSelectSekolah = (selectedSekolah) => {
    setNamaSekolah(selectedSekolah);
    setFilteredSekolah([]); // Clear suggestions after selection
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 z-top bg-opacity-30"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg inline"
      >
        <div className="">
          <div className="w-full h-full">
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Tambah Akademik
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
            <div className="p-4 inline-block w-full">
              <div className="flex grid mb-1 grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">
                  NIP Pegawai:
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    className="input w-full"
                    value={idPegawai}
                    onChange={(e) => setIdPegawai(e.target.value)}
                    required
                  />
                  {filteredPegawai.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {filteredPegawai.map((item, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() =>
                            handleSelectNIP(
                              item?.Pegawai?.NIP,
                              item?.Pegawai?.id // Set id pegawai di sini
                            )
                          }
                        >
                          {item?.Pegawai?.NIP} - {item?.Pegawai?.nama_pegawai}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="flex grid mb-1 grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">
                  Nama Sekolah:
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    className="input w-full"
                    value={namaSekolah}
                    onChange={(e) => setNamaSekolah(e.target.value)}
                    required
                  />
                  {filteredSekolah.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {filteredSekolah.map((item, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSelectSekolah(item.nama_sekolah)}
                        >
                          {item.nama_sekolah}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="flex grid mb-1 grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">
                  Status Akademik:
                </label>
                <select
                  type="text"
                  className="input w-full"
                  value={statusAkasemik}
                  onChange={(e) => setStatusAkademik(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Pilih Status
                  </option>
                  <option value="Berkala">Berkala</option>
                  <option value="Non Berkala">Non Berkala</option>
                </select>
              </div>
              <div className="flex grid mb-1 grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">
                  Jumlah Peserta :
                </label>
                <input
                  type="number"
                  className="input w-full"
                  value={jumlahPeserta}
                  onChange={(e) => setJumlahPeserta(e.target.value)}
                  required
                />
              </div>
              <div className="flex grid mb-1 grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">Keterangan:</label>
                <textarea
                  className="input w-full"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                //   required
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 space-x-3 border-t border-gray-200 rounded-b">
              <h1>{msg}</h1>
              <div className="flex gap-3">
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAkademikModal;
