import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetailPegawai = () => {
  const [pegawaiData, setPegawaiData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getPegawaiById = async (idPegawai) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/pegawai/${idPegawai}`
      );
      setPegawaiData(response.data);
    } catch (error) {
      console.error("Error fetching Pegawai data:", error);
    }
  };

const hitungMasaKerja = (tmt_pengangkatan, tmt_pensiun) => {
  if (!tmt_pengangkatan) return "";

  const today = new Date();
  const tmtDate = new Date(tmt_pengangkatan);
  const pensiunDate = new Date(tmt_pensiun);

  // Jika sudah pensiun
  if (today > pensiunDate) {
    return "Sudah Pensiun";
  }

  let years = today.getFullYear() - tmtDate.getFullYear();
  let months = today.getMonth() - tmtDate.getMonth();
  let days = today.getDate() - tmtDate.getDate();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    let prevMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
    let prevMonthDays = new Date(
      today.getFullYear(),
      prevMonth + 1,
      0
    ).getDate();
    days += prevMonthDays;
  }

  let weeks = Math.floor(days / 7);
  days = days % 7;

  let masaKerjaArray = [];
  if (years > 0) masaKerjaArray.push(`${years} tahun`);
  if (months > 0) masaKerjaArray.push(`${months} bulan`);
  if (weeks > 0) masaKerjaArray.push(`${weeks} minggu`);
  if (days > 0) masaKerjaArray.push(`${days} hari`);

  return masaKerjaArray.join(" ");
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
          <p>
            {hitungMasaKerja(
              pegawaiData.tmt_pengangkatan,
              pegawaiData.tmt_pensiun
            )}
          </p>
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
