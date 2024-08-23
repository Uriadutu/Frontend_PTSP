import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetailSiswa = () => {
  const [siswaData, setSiswaData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getSiswaById = async (idSiswa) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/siswa/${idSiswa}`
      );
      setSiswaData(response.data);
    } catch (error) {
      console.error("Error fetching Siswa data:", error);
    }
  };

  useEffect(() => {
    getSiswaById(id);
  }, [id]);

  if (!siswaData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="judul">Detail Data Siswa</h2>
      <button className="btn-back" onClick={() => navigate(-1)}>
        Kembali
      </button>
      <div className="p-6 grid grid-cols-2 gap-4 bg-white shadow-lg rounded-lg mt-2">
        <div>
          <strong>Asal Sekolah:</strong>
          <p>{siswaData && siswaData.Sekolah && siswaData.Sekolah.nama_sekolah}</p>

        </div>
        <div>
          <strong>Tahun Ajaran:</strong>
          <p>{siswaData.tahun_ajaran}</p>
        </div>
        <div>
          <strong>Jenjang Sekolah:</strong>
          <p>{siswaData.jenjang_sekolah}</p>
        </div>
        <div>
          <strong>Nomor Induk:</strong>
          <p>{siswaData.nomor_induk}</p>
        </div>
        <div>
          <strong>NISN:</strong>
          <p>{siswaData.NISN}</p>
        </div>
        <div>
          <strong>Kelas:</strong>
          <p>{siswaData.kelas}</p>
        </div>
        <div>
          <strong>Nama Siswa:</strong>
          <p>{siswaData.nama_siswa}</p>
        </div>
        <div>
          <strong>Jenis Kelamin:</strong>
          <p>{siswaData.jenis_kelamin}</p>
        </div>
        <div>
          <strong>Tempat Lahir:</strong>
          <p>{siswaData.tempat_lahir}</p>
        </div>
        <div>
          <strong>Tanggal Lahir:</strong>
          <p>{siswaData.tanggal_lahir}</p>
        </div>
        <div>
          <strong>Agama:</strong>
          <p>{siswaData.agama}</p>
        </div>
        <div>
          <strong>Nama Ayah:</strong>
          <p>{siswaData.nama_ayah}</p>
        </div>
        <div>
          <strong>Nama Ibu:</strong>
          <p>{siswaData.nama_ibu}</p>
        </div>
        <div>
          <strong>Pendidikan Ibu:</strong>
          <p>{siswaData.pendidikan_ibu}</p>
        </div>
        <div>
          <strong>Pekerjaan Ibu:</strong>
          <p>{siswaData.pekerjaan_ibu}</p>
        </div>
        <div>
          <strong>Alamat:</strong>
          <p>{siswaData.alamat}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailSiswa;
