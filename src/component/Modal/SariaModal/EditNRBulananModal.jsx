import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditNRBulananModal = ({ setIsOpenModalEdit, getNRData, initialData }) => {
  const { namaBulan, no } = useParams();
  const [namaKecamatan, setNamaKecamatan] = useState(initialData.nama_kecamatan || "");
  const [jumlahNikah, setJumlahNikah] = useState(initialData.jumlahNikah || 0);
  const [isbatNikah, setIsbatNikah] = useState(initialData.isbatNikah || 0);
  const [rujuk, setRujuk] = useState(initialData.rujuk || 0);
  const [kantor, setKantor] = useState(initialData.kantor || 0);
  const [luarKantor, setLuarKantor] = useState(initialData.luarKantor || 0);
  const [nasab, setNasab] = useState(initialData.nasab || 0);
  const [hakim, setHakim] = useState(initialData.hakim || 0);
  const [campuran, setCampuran] = useState(initialData.campuran || 0);
  const [poligami, setPoligami] = useState(initialData.poligami || 0);
  const [priaA, setPriaA] = useState(initialData.priaA || 0);
  const [priaB, setPriaB] = useState(initialData.priaB || 0);
  const [priaC, setPriaC] = useState(initialData.priaC || 0);
  const [wanitaA, setWanitaA] = useState(initialData.wanitaA || 0);
  const [wanitaB, setWanitaB] = useState(initialData.wanitaB || 0);
  const [wanitaC, setWanitaC] = useState(initialData.wanitaC || 0);
  const [suamiSD, setSuamiSD] = useState(initialData.suamiSD || 0);
  const [istriSD, setIstriSD] = useState(initialData.istriSD || 0);
  const [suamiSMP, setSuamiSMP] = useState(initialData.suamiSMP || 0);
  const [istriSMP, setIstriSMP] = useState(initialData.istriSMP || 0);
  const [suamiSMA, setSuamiSMA] = useState(initialData.suamiSMA || 0);
  const [istriSMA, setIstriSMA] = useState(initialData.istriSMA || 0);
  const [suamiS1, setSuamiS1] = useState(initialData.suamiS1 || 0);
  const [istriS1, setIstriS1] = useState(initialData.istriS1 || 0);
  const [suamiS1Plus, setSuamiS1Plus] = useState(initialData.suamiS1Plus || 0);
  const [istriS1Plus, setIstriS1Plus] = useState(initialData.istriS1Plus || 0);
  const [totalPNBP, setTotalPNBP] = useState(initialData.totalPNBP || 0);
  const [kecamatanOption, setKecamatanOption] = useState([]);

  const getKecamatan = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kecamatan");
      setKecamatanOption(response.data);
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
      await axios.put(`http://localhost:5000/nikahrujuk/${initialData.id}`, {
        namaBulan: namaBulan + no,
        nama_kecamatan: namaKecamatan,
        jumlahNikah,
        isbatNikah,
        rujuk,
        kantor,
        luarKantor,
        nasab,
        hakim,
        campuran,
        poligami,
        priaA,
        priaB,
        priaC,
        wanitaA,
        wanitaB,
        wanitaC,
        suamiSD,
        istriSD,
        suamiSMP,
        istriSMP,
        suamiSMA,
        istriSMA,
        suamiS1,
        istriS1,
        suamiS1Plus,
        istriS1Plus,
        totalPNBP,
      });

      setIsOpenModalEdit(false);
      getNRData(namaBulan+no);
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
              Edit Data Nikah & Rujuk
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
                  onChange={(e) => setNamaKecamatan(e.target.value)}
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
                <label htmlFor="jumlahNikah" className="label-input">
                  Jumlah Nikah
                </label>
                <input
                  id="jumlahNikah"
                  className="w-full input"
                  value={jumlahNikah}
                  onChange={(e) => setJumlahNikah(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Isbat Nikah */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="isbatNikah" className="label-input">
                  Isbat Nikah
                </label>
                <input
                  id="isbatNikah"
                  className="w-full input"
                  value={isbatNikah}
                  onChange={(e) => setIsbatNikah(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Rujuk */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="rujuk" className="label-input">
                  Rujuk
                </label>
                <input
                  id="rujuk"
                  className="w-full input"
                  value={rujuk}
                  onChange={(e) => setRujuk(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Kantor */}
              <label className="label-input mt-4 pt-4">Tempat Nikah :</label>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="kantor" className="label-input">
                  Kantor
                </label>
                <input
                  id="kantor"
                  className="w-full input"
                  value={kantor}
                  onChange={(e) => setKantor(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Luar Kantor */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="luarKantor" className="label-input">
                  Luar Kantor
                </label>
                <input
                  id="luarKantor"
                  className="w-full input"
                  value={luarKantor}
                  onChange={(e) => setLuarKantor(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Nasab */}
              <label className="label-input mt-4 pt-4">Nasab :</label>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="nasab" className="label-input">
                  Nasab
                </label>
                <input
                  id="nasab"
                  className="w-full input"
                  value={nasab}
                  onChange={(e) => setNasab(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Hakim */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="hakim" className="label-input">
                  Hakim
                </label>
                <input
                  id="hakim"
                  className="w-full input"
                  value={hakim}
                  onChange={(e) => setHakim(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Campuran */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="campuran" className="label-input">
                  Campuran
                </label>
                <input
                  id="campuran"
                  className="w-full input"
                  value={campuran}
                  onChange={(e) => setCampuran(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Poligami */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="poligami" className="label-input">
                  Poligami
                </label>
                <input
                  id="poligami"
                  className="w-full input"
                  value={poligami}
                  onChange={(e) => setPoligami(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              <label className="label-input mt-4 pt-4">Umur :</label>
              {/* Field untuk Pria A */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="priaA" className="label-input">
                  Pria {"< 21"} Tahun
                </label>
                <input
                  id="priaA"
                  className="w-full input"
                  value={priaA}
                  onChange={(e) => setPriaA(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Pria B */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="priaB" className="label-input">
                  Pria 21-25 Tahun
                </label>
                <input
                  id="priaB"
                  className="w-full input"
                  value={priaB}
                  onChange={(e) => setPriaB(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Pria C */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="priaC" className="label-input">
                  Pria {"> 25"} Tahun
                </label>
                <input
                  id="priaC"
                  className="w-full input"
                  value={priaC}
                  onChange={(e) => setPriaC(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Wanita A */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="wanitaA" className="label-input">
                  Wanita {"< 21"} Tahun
                </label>
                <input
                  id="wanitaA"
                  className="w-full input"
                  value={wanitaA}
                  onChange={(e) => setWanitaA(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Wanita B */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="wanitaB" className="label-input">
                  Wanita 21-25 Tahun
                </label>
                <input
                  id="wanitaB"
                  className="w-full input"
                  value={wanitaB}
                  onChange={(e) => setWanitaB(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Wanita C */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="wanitaC" className="label-input">
                  Wanita {"> 25"} Tahun
                </label>
                <input
                  id="wanitaC"
                  className="w-full input"
                  value={wanitaC}
                  onChange={(e) => setWanitaC(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              <label className="label-input mt-4 pt-4">Pendidikan :</label>
              {/* Field untuk Suami SD */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="suamiSD" className="label-input">
                  Suami SD
                </label>
                <input
                  id="suamiSD"
                  className="w-full input"
                  value={suamiSD}
                  onChange={(e) => setSuamiSD(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Istri SD */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="istriSD" className="label-input">
                  Istri SD
                </label>
                <input
                  id="istriSD"
                  className="w-full input"
                  value={istriSD}
                  onChange={(e) => setIstriSD(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Suami SMP */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="suamiSMP" className="label-input">
                  Suami SMP
                </label>
                <input
                  id="suamiSMP"
                  className="w-full input"
                  value={suamiSMP}
                  onChange={(e) => setSuamiSMP(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Istri SMP */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="istriSMP" className="label-input">
                  Istri SMP
                </label>
                <input
                  id="istriSMP"
                  className="w-full input"
                  value={istriSMP}
                  onChange={(e) => setIstriSMP(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Suami SMA */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="suamiSMA" className="label-input">
                  Suami SMA
                </label>
                <input
                  id="suamiSMA"
                  className="w-full input"
                  value={suamiSMA}
                  onChange={(e) => setSuamiSMA(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Istri SMA */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="istriSMA" className="label-input">
                  Istri SMA
                </label>
                <input
                  id="istriSMA"
                  className="w-full input"
                  value={istriSMA}
                  onChange={(e) => setIstriSMA(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Suami S1 */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="suamiS1" className="label-input">
                  Suami S1
                </label>
                <input
                  id="suamiS1"
                  className="w-full input"
                  value={suamiS1}
                  onChange={(e) => setSuamiS1(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Istri S1 */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="istriS1" className="label-input">
                  Istri S1
                </label>
                <input
                  id="istriS1"
                  className="w-full input"
                  value={istriS1}
                  onChange={(e) => setIstriS1(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Suami S1 Plus */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="suamiS1Plus" className="label-input">
                  Suami S1+
                </label>
                <input
                  id="suamiS1Plus"
                  className="w-full input"
                  value={suamiS1Plus}
                  onChange={(e) => setSuamiS1Plus(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Istri S1 Plus */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="istriS1Plus" className="label-input">
                  Istri S1+
                </label>
                <input
                  id="istriS1Plus"
                  className="w-full input"
                  value={istriS1Plus}
                  onChange={(e) => setIstriS1Plus(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              {/* Field untuk Total PNBP */}
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="totalPNBP" className="label-input">
                  Total PNBP
                </label>
                <input
                  id="totalPNBP"
                  className="w-full input"
                  value={totalPNBP}
                  onChange={(e) => setTotalPNBP(e.target.value)}
                  type="text"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
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
      </form>
    </div>
  );
};

export default EditNRBulananModal;
