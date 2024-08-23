import axios from "axios";
import React, { useEffect, useState } from "react";

const AddPegawaiModal = ({ setIsOpenModalAdd, getPegawai }) => {
  const [jabatanOption, setJabatanOption] = useState([])
  const [satker, setSatker] = useState([])
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
  const [msg, setMsg] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      await axios.post("http://localhost:5000/pegawai",
        {
          jenis_pegawai: JenisPegawai,
          NIP: NIP,
          nama_pegawai: NamaPegawai,
          pangkat_gol : PangkatGolongan,
          tmt_terakhir: TMTSKPangkat,
          jabatan : Jabatan,
          tmt_pengangkatan : TMTPengangkatan,
          tmt_pensiun : TMTPensiun,
          pend_terakhir : PendidikanTerakhir,
          jurusan : JurusanProdi,
          tahun_lulus :TahunLulus,
          jenis_kelamin :JenisKelamin,
          temp_lahir: TempatLahir,
          tgl_lahir : TanggalLahir,
          agama : Agama,
          satuan_kerja: SatuanKerja,
        }
      )

      setIsOpenModalAdd(false);
      getPegawai()
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg)
    }
  };

  const getJabatan = async()=> {
    try {
      const response = await axios.get("http://localhost:5000/jabatan")
      setJabatanOption(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const getSatker = async()=> {
    try {
      const response = await axios.get("http://localhost:5000/satker")
      setSatker(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    getJabatan()
    getSatker()
  },[])
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
              Tambah Data Pegawai
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
                  <option value="Pembina Muda, IV/c">Pembina Muda, IV/c</option>
                  <option value="Pembina Madya, IV/d">
                    Pembina Madya, IV/d
                  </option>
                  <option value="Pembina Utama, IV/e">
                    Pembina Utama, IV/e
                  </option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="tmtSKPangkat" className="label-input">
                  TMT SK Pangkat Terakhir
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
                  {jabatanOption.map((jabatan, index) => (
                    <option key={index} value={jabatan.nama_jabatan}>
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
                <select
                  className="input py-0"
                  value={PendidikanTerakhir}
                  onChange={(e) => setPendidikanTerakhir(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Pendidikan Terakhir
                  </option>
                  <option value="SD/MI/Sederajat">SD/MI/Sederajat</option>
                  <option value="SMP/MTs/Sederajat">SMP/MTs/Sederajat</option>
                  <option value="SMA/MA/Sederajat">SMA/MA/Sederajat</option>
                  <option value="Diploma I/DI">Diploma I/DI</option>
                  <option value="Diploma II/DII">Diploma II/DII</option>
                  <option value="Diploma III/DIII">Diploma III/DIII</option>
                  <option value="S1/DIV">S1/DIV</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-2">
                <label htmlFor="jurusanProdi" className="label-input">
                  Jurusan/Prodi Pendidikan
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
                  Tahun Lulus Pendidikan
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
                  <option value="Budha">Budha</option>
                  <option value="Kong Hu Cu">Kong Hu Cu</option>
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
                  {satker.map((satker) => (
                    <option key={satker.id} value={satker.nama_satker}>
                      {satker.nama_satker}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-center p-4 justify-between border-t border-gray-200 rounded-b">
            <h1>{msg}</h1>
            <div className="flex items-center justify-end space-x-3 ">
              <button type="submit" className="btn btn-simpan">
                Simpan
              </button>
              <button
                onClick={() => setIsOpenModalAdd(false)}
                type="submit"
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

export default AddPegawaiModal;
