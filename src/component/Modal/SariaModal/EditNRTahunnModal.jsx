import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditNRTahunanModal = ({ setIsOpenModalEdit, getDataTahunan, selectedData }) => {
  const { tahun } = useParams();
  const [namaKecamatan, setNamaKecamatan] = useState("");
  const [diKantor, setDikantor] = useState(0);
  const [diLuarKantor, setDiLuarKantor] = useState(0);
  const [isbatNikah, setIsbatNikah] = useState(0);
  const [cerai, setCerai] = useState(0);
  const [totalNR, setTotalNR] = useState(0);
  const [totalPNBP, setTotalPNBP] = useState(0);
  const [kecamatanOption, setKecamatanOption] = useState([]);
  const [kodekec, setKodeKec] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // Mengambil opsi kecamatan
    const getKecamatan = async () => {
      try {
        const response = await axios.get("http://localhost:5000/kecamatan");
        setKecamatanOption(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getKecamatan();

    // Mengisi form dengan data yang dipilih
    if (selectedData) {
      setNamaKecamatan(selectedData.nama_kecamatan);
      setDikantor(selectedData.di_kantor);
      setDiLuarKantor(selectedData.di_luar_kantor);
      setIsbatNikah(selectedData.isbat_nikah);
      setCerai(selectedData.cerai);
      setTotalNR(selectedData.total_nr);
      setTotalPNBP(selectedData.total_pnbp);
      setKodeKec(selectedData.kode_kecamatan);
    }
  }, [selectedData]);

  const PilihKecamatan = (e) => {
    const selectedValue = e.target.value;
    setNamaKecamatan(selectedValue);

    const selectedKecamatan = kecamatanOption.find(
      (kecamatan) => kecamatan.nama_kecamatan === selectedValue
    );

    if (selectedKecamatan) {
      setKodeKec(selectedKecamatan.id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/nr-tahunan/${selectedData.id}`, {
        id: `${tahun}${kodekec}`,
        tahun: tahun,
        nama_kecamatan: namaKecamatan,
        di_kantor: diKantor,
        di_luar_kantor: diLuarKantor,
        isbat_nikah: isbatNikah,
        cerai: cerai,
        total_nr: totalNR,
        total_pnbp: totalPNBP,
      });

      setIsOpenModalEdit(false);
      getDataTahunan(tahun);
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg);
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
              Edit Data Rumah Ibadah Islam
            </h3>
            <button
              onClick={() => setIsOpenModalEdit(false)}
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
                <label className="label-input">Kecamatan</label>
                <select
                  className="input py-0"
                  value={namaKecamatan}
                  onChange={PilihKecamatan}
                >
                  <option disabled value="">
                    Pilih Kecamatan
                  </option>
                  {kecamatanOption.map((kecamatan, index) => (
                    <option key={index} value={kecamatan.nama_kecamatan}>
                      {kecamatan.nama_kecamatan}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label className="label-input">Di Kantor</label>
                <input
                  className="w-full input"
                  value={diKantor}
                  onChange={(e) => setDikantor(e.target.value)}
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="DiLuar" className="label-input">
                  Di Luar Kantor
                </label>
                <input
                  id="DiLuar"
                  className="w-full input"
                  value={diLuarKantor}
                  onChange={(e) => setDiLuarKantor(e.target.value)}
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label className="label-input">Isbat Nikah</label>
                <input
                  className="w-full input"
                  value={isbatNikah}
                  onChange={(e) => setIsbatNikah(e.target.value)}
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label className="label-input">Cerai</label>
                <input
                  className="w-full input"
                  value={cerai}
                  onChange={(e) => setCerai(e.target.value)}
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label className="label-input">Total NR</label>
                <input
                  className="w-full input"
                  value={totalNR}
                  onChange={(e) => setTotalNR(e.target.value)}
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label className="label-input">Total PNBP</label>
                <input
                  className="w-full input"
                  value={totalPNBP}
                  onChange={(e) => setTotalPNBP(e.target.value)}
                  type="number"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center p-4 border-t border-gray-200 rounded-b">
            <h1>{msg}</h1>
            <div className="flex items-center justify-end space-x-2 ">
              <button type="submit" className="btn btn-simpan">
                Simpan
              </button>
              <button
                onClick={() => setIsOpenModalEdit(false)}
                type="button"
                className="btn-batal"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditNRTahunanModal;
