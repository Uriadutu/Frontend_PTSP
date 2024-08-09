import React, { useEffect, useState } from "react";
import axios from "axios";

const AddTpqModal = ({ setIsOpenModalAdd, getTpqs }) => {
  const [idKecamatan, setIdKecamatan] = useState("");
  const [namaDesa, setNamaDesa] = useState("");
  const [jumlahSantri, setJumlahSantri] = useState("");
  const [jumlahSantriwati, setJumlahSantriwati] = useState("");
  const [jumlahUstad, setJumlahUstad] = useState("");
  const [jumlahUstadzah, setJumlahUstadzah] = useState("");

  const [dataKec, setDataKec] = useState([]);

  const getKecamatan = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kecamatan");
      setDataKec(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getKecamatan();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/tpq", {
        id_kecamatan: idKecamatan,
        nama_desa: namaDesa,
        jumlah_santri: jumlahSantri,
        jumlah_santriwati: jumlahSantriwati,
        jumlah_ustad: jumlahUstad,
        jumlah_ustadzah: jumlahUstadzah,
      });

      setIsOpenModalAdd(false);
      getTpqs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 z-top bg-opacity-30"
    >
      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">Tambah TPQ</h3>
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
          <div className="p-4 space-y-4">
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="idKecamatan" className="label-input">
                  Kecamatan
                </label>
                <select
                  value={idKecamatan}
                  onChange={(e) => setIdKecamatan(e.target.value)}
                  type="text"
                  id="idKecamatan"
                  className="w-full input"
                >
                  <option value="" disabled>
                    Pilih Kecamatan
                  </option>
                  {dataKec.map((item, index) => (
                    <option key={index} value={item && item.id}>
                      {item && item.nama_kecamatan}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="namaDesa" className="label-input">
                  Nama Desa
                </label>
                <input
                  value={namaDesa}
                  onChange={(e) => setNamaDesa(e.target.value)}
                  type="text"
                  id="namaDesa"
                  className="w-full input"
                />{" "}
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jumlahSantri" className="label-input">
                  Jumlah Santri
                </label>
                <input
                  value={jumlahSantri}
                  onChange={(e) => setJumlahSantri(e.target.value)}
                  type="number"
                  id="jumlahSantri"
                  className="w-full input"
                />{" "}
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jumlahSantriwati" className="label-input">
                  Jumlah Santriwati
                </label>
                <input
                  value={jumlahSantriwati}
                  onChange={(e) => setJumlahSantriwati(e.target.value)}
                  type="number"
                  id="jumlahSantriwati"
                  className="w-full input"
                />{" "}
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jumlahUstad" className="label-input">
                  Jumlah Ustad
                </label>
                <input
                  value={jumlahUstad}
                  onChange={(e) => setJumlahUstad(e.target.value)}
                  type="number"
                  id="jumlahUstad"
                  className="w-full input"
                />{" "}
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jumlahUstadzah" className="label-input">
                  Jumlah Ustadzah
                </label>
                <input
                  value={jumlahUstadzah}
                  onChange={(e) => setJumlahUstadzah(e.target.value)}
                  type="number"
                  id="jumlahUstadzah"
                  className="w-full input"
                />{" "}
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

export default AddTpqModal;
