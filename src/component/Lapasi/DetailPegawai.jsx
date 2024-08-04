import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const DetailPegawai = () => {
  const [pegawaiData, setPegawaiData] = useState(null);
  const [masaKerja, setMasaKerja] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getPegawaiById = async (idPegawai) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/pegawai/${idPegawai}`
      );
      setPegawaiData(response.data);
      calculateMasaKerja(response.data.tmt_pengangkatan);
    } catch (error) {
      console.error("Error fetching Pegawai data:", error);
    }
  };

  const calculateMasaKerja = (tmtPengangkatan) => {
    const tmtDate = dayjs(tmtPengangkatan);
    const now = dayjs();
    let diffYears = now.diff(tmtDate, "year");
    tmtDate.add(diffYears, "year");
    let diffMonths = now.diff(tmtDate, "month");

    if (diffMonths >= 12) {
      const extraYears = Math.floor(diffMonths / 12);
      diffYears += extraYears;
      diffMonths %= 12;
    }

    let result = "";
    if (diffYears > 0) {
      result += `${diffYears} tahun `;
    }
    if (diffMonths > 0) {
      result += `${diffMonths} bulan`;
    }

    setMasaKerja(result.trim());
  };

  useEffect(() => {
    getPegawaiById(id);
  }, [id]);

  if (!pegawaiData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contain">
      <h2 className="judul">Detail Data Pegawai</h2>
      <button className="btn-back" onClick={() => navigate(-1)}>
        Kembali
      </button>
      <div className="p-6 grid grid-cols-2 gap-4 bg-white shadow-lg rounded-lg mt-2">
        <div>
          <strong>NIP:</strong>
          <p>{pegawaiData.NIP}</p>
        </div>
        <div>
          <strong>Jenis Pegawai:</strong>
          <p>{pegawaiData.jenis_pegawai}</p>
        </div>
        <div>
          <strong>Nama Pegawai:</strong>
          <p>{pegawaiData.nama_pegawai}</p>
        </div>
        <div>
          <strong>Pangkat/Golongan:</strong>
          <p>{pegawaiData.pangkat_gol}</p>
        </div>
        <div>
          <strong>Jabatan:</strong>
          <p>{pegawaiData.jabatan}</p>
        </div>
        <div>
          <strong>TMT Terakhir:</strong>
          <p>{pegawaiData.tmt_terakhir}</p>
        </div>
        <div>
          <strong>TMT Pengangkatan:</strong>
          <p>{pegawaiData.tmt_pengangkatan}</p>
        </div>
        <div>
          <strong>Masa Kerja:</strong>
          <p>{masaKerja}</p>
        </div>
        <div>
          <strong>TMT Pensiun:</strong>
          <p>{pegawaiData.tmt_pensiun}</p>
        </div>
        <div>
          <strong>Pendidikan Terakhir:</strong>
          <p>{pegawaiData.pend_terakhir}</p>
        </div>
        <div>
          <strong>Jurusan:</strong>
          <p>{pegawaiData.jurusan}</p>
        </div>
        <div>
          <strong>Tahun Lulus:</strong>
          <p>{pegawaiData.tahun_lulus}</p>
        </div>
        <div>
          <strong>Jenis Kelamin:</strong>
          <p>{pegawaiData.jenis_kelamin}</p>
        </div>
        <div>
          <strong>Tempat Lahir:</strong>
          <p>{pegawaiData.temp_lahir}</p>
        </div>
        <div>
          <strong>Tanggal Lahir:</strong>
          <p>{pegawaiData.tgl_lahir}</p>
        </div>
        <div>
          <strong>Agama:</strong>
          <p>{pegawaiData.agama}</p>
        </div>
        <div>
          <strong>Satuan Kerja:</strong>
          <p>{pegawaiData.satuan_kerja}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPegawai;
