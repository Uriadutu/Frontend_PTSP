import axios from "axios";
import React, { useEffect, useState } from "react";

const EditPegawaiModal = ({ setIsOpenModalEdit, getPegawai, selectedPegawai }) => {
  const [jabatanOption, setJabatanOption] = useState([]);
  const [satker, setSatker] = useState([]);
  const [JenisPegawai, setJenisPegawai] = useState("");
  const [NIP, setNIP] = useState("");
  const [NamaPegawai, setNamaPegawai] = useState("");
  const [PangkatGolongan, setPangkatGolongan] = useState("");
  const [TMTSKPangkat, setTMTSKPangkat] = useState("");
  const [Jabatan, setJabatan] = useState("");
  const [TMTPengangkatan, setTMTPengangkatan] = useState("");
  const [TMTPensiun, setTMTPensiun] = useState("");
  const [PendidikanTerakhir, setPendidikanTerakhir] = useState("");
  const [JurusanProdi, setJurusanProdi] = useState("");
  const [TahunLulus, setTahunLulus] = useState("");
  const [JenisKelamin, setJenisKelamin] = useState("");
  const [TempatLahir, setTempatLahir] = useState("");
  const [TanggalLahir, setTanggalLahir] = useState("");
  const [Agama, setAgama] = useState("");
  const [SatuanKerja, setSatuanKerja] = useState("");

  useEffect(() => {
    if (selectedPegawai) {
      setJenisPegawai(selectedPegawai.jenis_pegawai);
      setNIP(selectedPegawai.NIP);
      setNamaPegawai(selectedPegawai.nama_pegawai);
      setPangkatGolongan(selectedPegawai.pangkat_gol);
      setTMTSKPangkat(selectedPegawai.tmt_terakhir);
      setJabatan(selectedPegawai.jabatan);
      setTMTPengangkatan(selectedPegawai.tmt_pengangkatan);
      setTMTPensiun(selectedPegawai.tmt_pensiun);
      setPendidikanTerakhir(selectedPegawai.pend_terakhir);
      setJurusanProdi(selectedPegawai.jurusan);
      setTahunLulus(selectedPegawai.tahun_lulus);
      setJenisKelamin(selectedPegawai.jenis_kelamin);
      setTempatLahir(selectedPegawai.temp_lahir);
      setTanggalLahir(selectedPegawai.tgl_lahir);
      setAgama(selectedPegawai.agama);
      setSatuanKerja(selectedPegawai.satuan_kerja);
    }
  }, [selectedPegawai]);

  console.log(selectedPegawai, "id-peg");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/pegawai/${selectedPegawai.id}`, {
        jenis_pegawai: JenisPegawai,
        NIP: NIP,
        nama_pegawai: NamaPegawai,
        pangkat_gol: PangkatGolongan,
        tmt_terakhir: TMTSKPangkat,
        jabatan: Jabatan,
        tmt_pengangkatan: TMTPengangkatan,
        tmt_pensiun: TMTPensiun,
        pend_terakhir: PendidikanTerakhir,
        jurusan: JurusanProdi,
        tahun_lulus: TahunLulus,
        jenis_kelamin: JenisKelamin,
        temp_lahir: TempatLahir,
        tgl_lahir: TanggalLahir,
        agama: Agama,
        satuan_kerja: SatuanKerja,
      });

      setIsOpenModalEdit(false);
      getPegawai();
    } catch (error) {
      console.log(error);
    }
  };

  const getJabatan = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jabatan");
      setJabatanOption(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSatker = async () => {
    try {
      const response = await axios.get("http://localhost:5000/satker");
      setSatker(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJabatan();
    getSatker();
  }, []);

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
              Edit Data Pegawai
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
                <label htmlFor="jenisPegawai" className="label-input">
                  Jenis Pegawai
                </label>
                <select
                  className="input py-0"
                  value={JenisPegawai}
                  onChange={(e) => setJenisPegawai(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Jenis Pegawai
                  </option>
                  <option value="PNS">PNS</option>
                  <option value="PPPK">PPPK</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="nip" className="label-input">
                  NIP
                </label>
                <input
                  value={NIP}
                  onChange={(e) => setNIP(e.target.value)}
                  type="number"
                  id="nip"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="namaPegawai" className="label-input">
                  Nama Pegawai
                </label>
                <input
                  value={NamaPegawai}
                  onChange={(e) => setNamaPegawai(e.target.value)}
                  type="text"
                  id="namaPegawai"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="pangkatGolongan" className="label-input">
                  Pangkat/Golongan
                </label>
                <select
                  className="input py-0"
                  value={PangkatGolongan}
                  onChange={(e) => setPangkatGolongan(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Pangkat/Golongan
                  </option>
                  <option value="Juru Muda, I/a">Juru Muda, I/a</option>
                  <option value="Juru Muda Tingkat I, I/b">
                    Juru Muda Tingkat I, I/b
                  </option>
                  <option value="Juru, I/c">Juru, I/c</option>
                  <option value="Juru Tingkat I, I/d">
                    Juru Tingkat I, I/d
                  </option>
                  <option value="Pengatur Muda, II/a">
                    Pengatur Muda, II/a
                  </option>
                  <option value="Pengatur Muda Tingkat I, II/b">
                    Pengatur Muda Tingkat I, II/b
                  </option>
                  <option value="Pengatur, II/c">Pengatur, II/c</option>
                  <option value="Pengatur Tingkat I, II/d">
                    Pengatur Tingkat I, II/d
                  </option>
                  <option value="Penata Muda, III/a">Penata Muda, III/a</option>
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
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="tmtSKPangkat" className="label-input">
                  TMT SK Pangkat
                </label>
                <input
                  value={TMTSKPangkat}
                  onChange={(e) => setTMTSKPangkat(e.target.value)}
                  type="date"
                  id="tmtSKPangkat"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jabatan" className="label-input">
                  Jabatan
                </label>
                <select
                  className="input py-0"
                  value={Jabatan}
                  onChange={(e) => setJabatan(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Jabatan
                  </option>
                  {jabatanOption.map((jabatan) => (
                    <option key={jabatan.id} value={jabatan.nama_jabatan}>
                      {jabatan.nama_jabatan}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="tmtPengangkatan" className="label-input">
                  TMT Pengangkatan
                </label>
                <input
                  value={TMTPengangkatan}
                  onChange={(e) => setTMTPengangkatan(e.target.value)}
                  type="date"
                  id="tmtPengangkatan"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="tmtPensiun" className="label-input">
                  TMT Pensiun
                </label>
                <input
                  value={TMTPensiun}
                  onChange={(e) => setTMTPensiun(e.target.value)}
                  type="date"
                  id="tmtPensiun"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="pendidikanTerakhir" className="label-input">
                  Pendidikan Terakhir
                </label>
                <input
                  value={PendidikanTerakhir}
                  onChange={(e) => setPendidikanTerakhir(e.target.value)}
                  type="text"
                  id="pendidikanTerakhir"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jurusanProdi" className="label-input">
                  Jurusan/Prodi
                </label>
                <input
                  value={JurusanProdi}
                  onChange={(e) => setJurusanProdi(e.target.value)}
                  type="text"
                  id="jurusanProdi"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="tahunLulus" className="label-input">
                  Tahun Lulus
                </label>
                <input
                  value={TahunLulus}
                  onChange={(e) => setTahunLulus(e.target.value)}
                  type="number"
                  id="tahunLulus"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jenisKelamin" className="label-input">
                  Jenis Kelamin
                </label>
                <select
                  className="input py-0"
                  value={JenisKelamin}
                  onChange={(e) => setJenisKelamin(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Jenis Kelamin
                  </option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="tempatLahir" className="label-input">
                  Tempat Lahir
                </label>
                <input
                  value={TempatLahir}
                  onChange={(e) => setTempatLahir(e.target.value)}
                  type="text"
                  id="tempatLahir"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="tanggalLahir" className="label-input">
                  Tanggal Lahir
                </label>
                <input
                  value={TanggalLahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                  type="date"
                  id="tanggalLahir"
                  className="w-full input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="agama" className="label-input">
                  Agama
                </label>
                <select
                  className="input py-0"
                  value={Agama}
                  onChange={(e) => setAgama(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Agama
                  </option>
                  <option value="Islam">Islam</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Konghucu">Konghucu</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="satuanKerja" className="label-input">
                  Satuan Kerja
                </label>
                <select
                  className="input py-0"
                  value={SatuanKerja}
                  onChange={(e) => setSatuanKerja(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Satuan Kerja
                  </option>
                  {satker.map((s) => (
                    <option key={s.id} value={s.nama_satker}>
                      {s.nama_satker}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b">
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Simpan
            </button>
            <button
              onClick={() => setIsOpenModalEdit(false)}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPegawaiModal;
