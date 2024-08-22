import React, { useEffect, useState } from "react";
import axios from "axios";

const AddMenejerialModal = ({ setIsOpenModalAdd, getAkademik }) => {
  const [idPegawai, setIdPegawai] = useState("");
  const [idPengawas, setIdPengawas] = useState("");
  const [namaPegawai, setNamaPegawai] = useState("");
  const [filteredPegawai, setFilteredPegawai] = useState([]);
  const [pegawai, setPegawai] = useState([]);
  const [filteredWilayah, setFilteredWilayah] = useState([]);
  const [statusPegawai, setStatusPegawai] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [statusSertifikat, setStatusSertifikat] = useState(0);
  const [msg, setMsg] = useState("");
  const [namaSekolah, setNamaSekolah] = useState("");
  const [dataSekolah, setDataSekolah] = useState({});
  const [isFocused, setIsFocused] = useState(false);


  const getPegawai = async () => {
    try {
      const response = await axios.get("http://localhost:5000/peta");
      setPegawai(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPengawasAndWilayah = async (id) => {
    try {
      const responsePengawas = await axios.get(
        `http://localhost:5000/peta/pengawas/${id}`
      );
      setIdPengawas(responsePengawas.data.id);
      setNamaPegawai(responsePengawas.data.Pegawai.nama_pegawai);
    } catch (error) {
      console.log(error);
    }
  };

  const getSekolahByNama = async (nama) => {
    try {
      const sekolah = await axios.get(`http://localhost:5000/sekolahsidika/${nama}`);
      setDataSekolah(sekolah.data);
    } catch (error) {
      console.log(error);
    }
  };



  const getWilayahPengawas = async (id) => {
    try {
      const responseWilayah = await axios.get(
        `http://localhost:5000/peta/wilayah/${id}`
      );
      setFilteredWilayah(responseWilayah.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPegawai();
    if (idPengawas) {
      getWilayahPengawas(idPengawas);
    }
    if (namaSekolah) {
      getSekolahByNama(namaSekolah);
    }
  }, [idPengawas, namaSekolah]);

  useEffect(() => {
    if (idPegawai.trim() !== "") {
      const filtered = pegawai.filter((item) =>
        item?.Pegawai?.NIP.toLowerCase().startsWith(idPegawai.toLowerCase())
      );
      setFilteredPegawai(filtered);
    } else {
      setFilteredPegawai([]);
    }
  }, [idPegawai, pegawai]);

  const handleSelectNIP = (selectedNIP, id) => {
    setIdPegawai(selectedNIP);
    getPengawasAndWilayah(id);
    setFilteredPegawai([]);
    setIsFocused(false);
  };

  const handleBlur = () => {
    if (idPegawai) {
      const selectedPegawai = pegawai.find(
        (item) => item?.Pegawai?.NIP === idPegawai
      );
      if (selectedPegawai) {
        handleSelectNIP(idPegawai, selectedPegawai.Pegawai.id);
      }
    }
  };

  const handleSaveMenejerial = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/menejerial", {
        id_pegawai: idPegawai, // Kirim pegawaiId ke backend
        nama_sekolah: namaSekolah,
        nama_kepsek: dataSekolah?.nama_kepsek,
        status_sertifikat: statusSertifikat,
        status_pegawai: statusPegawai ,
        keterangan : keterangan ? keterangan : "-",
      });
      setIsOpenModalAdd(false);
      getAkademik();
    } catch (error) {
      console.error("Failed to add Akademik:", error);
      setMsg(error.response.data.msg);
    }
  } 

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 z-top bg-opacity-30"
    >
      <form
        onSubmit={handleSaveMenejerial}
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
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                    required
                  />
                  {isFocused && filteredPegawai?.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {filteredPegawai.map((item, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onMouseDown={() =>
                            handleSelectNIP(
                              item?.Pegawai?.NIP,
                              item?.Pegawai?.id
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
                  Nama Pengawas:
                </label>
                <input
                  type="text"
                  className="input w-full"
                  value={namaPegawai}
                  disabled
                />
              </div>
              <div className="flex grid mb-1 grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">
                  Nama Sekolah:
                </label>
                <select
                  className="input w-full"
                  value={namaSekolah}
                  onChange={(e) => setNamaSekolah(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Nama Sekolah
                  </option>
                  {filteredWilayah?.length > 0 &&
                    filteredWilayah.map((item) => (
                      <option key={item.id} value={item.nama_wilayah}>
                        {item.nama_wilayah}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex grid mb-1 grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">
                  Nama Kepala Sekolah:
                </label>
                <input
                  type="text"
                  className="input w-full"
                  value={dataSekolah?.nama_kepsek}
                  disabled
                />
              </div>
              <div className="flex grid mb-1 grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">
                  Sertifikat Kumad
                </label>
                <select
                  type="text"
                  className="input w-full"
                  value={statusSertifikat}
                  onChange={(e) => setStatusSertifikat(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Status
                  </option>
                  <option value="Belum">Belum</option>
                  <option value="Sudah">Sudah</option>
                </select>
              </div>
              <div className="flex grid mb-1 grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">
                  Status Pegawai:
                </label>
                <select
                  type="text"
                  className="input w-full"
                  value={statusPegawai}
                  onChange={(e) => setStatusPegawai(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Pilih Status
                  </option>
                  <option value="PNS">PNS</option>
                  <option value="Non PNS">Non PNS</option>
                </select>
              </div>

              <div className="flex grid mb-1 grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">Keterangan:</label>
                <textarea
                  type="text"
                  className="input w-full"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                />
              </div>
              <p className="text-red-700 my-2">{msg}</p>
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

export default AddMenejerialModal;
