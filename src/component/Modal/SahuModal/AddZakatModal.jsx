import React, { useEffect, useState } from "react";
import axios from "axios";

const kategoriOptions = ["Penerima", "Penyaluran"];
const sumberOptions = ["Muzzaki", "Mustahiq"];
const jenisZakatOptions = ["Zakat Fitrah", "Zakat Maal"];

const AddZakatModal = ({ setIsOpenModalAdd, getZakat }) => {
  const [namaKecamatan, setNamaKecamatan] = useState("");
  const [kategoriZakat, setKategoriZakat] = useState("");
  const [sumberZakat, setSumberZakat] = useState("");
  const [jumlahSumberZakat, setJumlahSumberZakat] = useState("");
  const [jenisZakat, setJenisZakat] = useState("");
  const [beras, setBeras] = useState("");
  const [uang, setUang] = useState("");
  const [nominalUang, setNominalUang] = useState("");
  const [infaqSedekah, setInfaqSedekah] = useState("");
  const [jumlahZakat, setJumlahZakat] = useState("");
  const [tahunZakat, setTahunZakat] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);

  const handleJenisZakatChange = (e) => {
    const selectedJenisZakat = e.target.value;
    setJenisZakat(selectedJenisZakat);

    // Set default values based on selected jenis zakat
    if (selectedJenisZakat === "Zakat Fitrah") {
      setNominalUang("-");
      setBeras("");
      setUang("");
    } else if (selectedJenisZakat === "Zakat Maal") {
      setBeras("-");
      setUang("-");
      setNominalUang("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/zakat", {
        id_kecamatan: namaKecamatan,
        kategori: kategoriZakat,
        sumber: sumberZakat,
        jumlah_sumber: jumlahSumberZakat,
        jenis: jenisZakat,
        beras: beras,
        uang: uang,
        nominal_uang: nominalUang,
        sedekah: infaqSedekah,
        jumlah_zakat: jumlahZakat,
        tahun_zakat : tahunZakat
      });

      setIsOpenModalAdd(false);
      getZakat();
    } catch (error) {
      console.log(error);
    }
  };

  const getKecamatan = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kecamatan");
      setKecamatan(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKecamatan();
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
              Tambah Data Zakat
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
          <div className="p-4 space-y-4 inline-block">
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="namaKecamatan" className="label-input">
                  Nama Kecamatan
                </label>
                <select
                  id="namaKecamatan"
                  className="w-full input"
                  value={namaKecamatan}
                  onChange={(e) => setNamaKecamatan(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Kecamatan
                  </option>
                  {kecamatan.map((item, index) => (
                    <option key={index + 1} value={item.id}>
                      {item.nama_kecamatan}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="kategoriZakat" className="label-input">
                  Kategori Zakat
                </label>
                <select
                  id="kategoriZakat"
                  className="w-full input"
                  value={kategoriZakat}
                  onChange={(e) => setKategoriZakat(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Kategori Zakat
                  </option>
                  {kategoriOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="sumberZakat" className="label-input">
                  Sumber Zakat
                </label>
                <select
                  id="sumberZakat"
                  className="w-full input"
                  value={sumberZakat}
                  onChange={(e) => setSumberZakat(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Sumber Zakat
                  </option>
                  {sumberOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jumlahSumberZakat" className="label-input">
                  Jumlah Sumber Zakat
                </label>
                <input
                  id="jumlahSumberZakat"
                  className="w-full input"
                  value={jumlahSumberZakat}
                  onChange={(e) => setJumlahSumberZakat(e.target.value)}
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jenisZakat" className="label-input">
                  Jenis Zakat
                </label>
                <select
                  id="jenisZakat"
                  className="w-full input"
                  value={jenisZakat}
                  onChange={handleJenisZakatChange}
                >
                  <option value="" disabled>
                    Pilih Jenis Zakat
                  </option>
                  {jenisZakatOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {jenisZakat === "Zakat Fitrah" && (
                <>
                  <div className="grid grid-cols-2 gap-5 mb-2">
                    <label htmlFor="beras" className="label-input">
                      Nominal Beras
                    </label>
                    <input
                      id="beras"
                      className="w-full input"
                      value={beras}
                      onChange={(e) => setBeras(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5 mb-2">
                    <label htmlFor="uang" className="label-input">
                      Nominal Uang
                    </label>
                    <input
                      id="uang"
                      className="w-full input"
                      value={uang}
                      onChange={(e) => setUang(e.target.value)}
                      type="text"
                    />
                  </div>
                </>
              )}
              {jenisZakat === "Zakat Maal" && (
                <>
                  <div className="grid grid-cols-2 gap-5 mb-2">
                    <label htmlFor="nominalUang" className="label-input">
                      Nominal Uang
                    </label>
                    <input
                      id="nominalUang"
                      className="w-full input"
                      value={nominalUang}
                      onChange={(e) => setNominalUang(e.target.value)}
                      type="text"
                    />
                  </div>
                </>
              )}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="infaqSedekah" className="label-input">
                  Infaq Sedekah
                </label>
                <input
                  id="infaqSedekah"
                  className="w-full input"
                  value={infaqSedekah}
                  onChange={(e) => setInfaqSedekah(e.target.value)}
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jumlahZakat" className="label-input">
                  Jumlah Zakat
                </label>
                <input
                  id="jumlahZakat"
                  className="w-full input"
                  value={jumlahZakat}
                  onChange={(e) => setJumlahZakat(e.target.value)}
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jumlahZakat" className="label-input">
                  Tahun Zakat
                </label>
                <input
                  id="jumlahZakat"
                  className="w-full input"
                  value={tahunZakat}
                  onChange={(e) => setTahunZakat(e.target.value)}
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => setIsOpenModalAdd(false)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ms-2"
            >
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddZakatModal;
