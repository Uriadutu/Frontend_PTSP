import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetailGuru = () => {
  const [guruData, setGuruData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getGuruById = async (idGuru) => {
    try {
      const response = await axios.get(`http://localhost:5000/guru/${idGuru}`);
      setGuruData(response.data);
    } catch (error) {
      console.error("Error fetching Guru data:", error);
    }
  };

  useEffect(() => {
    getGuruById(id);
  }, [id]);

  if (!guruData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="judul">Detail Data Guru</h2>
      <button className="btn-back" onClick={() => navigate(-1)}>
        Kembali
      </button>
      <div className="p-6 grid grid-cols-2 gap-4 bg-white shadow-lg rounded-lg mt-2">
        <div>
          <strong>Tempat Tugas:</strong>
          <p>{guruData && guruData.Sekolah && guruData.Sekolah.nama_sekolah}</p>
        </div>
        <div>
          <strong>NIP:</strong>
          <p>{guruData.NIP}</p>
        </div>
        <div>
          <strong>Nama Guru:</strong>
          <p>{guruData.nama_guru}</p>
        </div>
        <div>
          <strong>Status Pegawai:</strong>
          <p>{guruData.status_pegawai}</p>
        </div>
        <div>
          <strong>Kategori Guru:</strong>
          <p>{guruData.kategori_guru}</p>
        </div>
        <div>
          <strong>Jenis Guru:</strong>
          <p>{guruData.jenis_guru}</p>
        </div>
        <div>
          <strong>Pangkat:</strong>
          <p>{guruData.pangkat}</p>
        </div>
        <div>
          <strong>Jabatan:</strong>
          <p>{guruData.jabatan}</p>
        </div>
        <div>
          <strong>Tanggal Mulai:</strong>
          <p>{guruData.tgl_mulai}</p>
        </div>
        <div>
          <strong>Tempat Lahir:</strong>
          <p>{guruData.tempat_lahir}</p>
        </div>
        <div>
          <strong>Tanggal Lahir:</strong>
          <p>{guruData.tanggal_lahir}</p>
        </div>
        <div>
          <strong>Jenis Kelamin:</strong>
          <p>{guruData.jenis_kelamin}</p>
        </div>
        <div>
          <strong>Agama:</strong>
          <p>{guruData.agama}</p>
        </div>
        <div>
          <strong>Pendidikan Terakhir:</strong>
          <p>{guruData.pendidikan_terakhir}</p>
        </div>
        <div>
          <strong>Jurusan:</strong>
          <p>{guruData.juruan}</p>
        </div>
        <div>
          <strong>Tahun Lulus:</strong>
          <p>{guruData.tahun_lulus}</p>
        </div>
        <div>
          <strong>No Telepon:</strong>
          <p>{guruData.no_telp}</p>
        </div>
        <div>
          <strong>Email:</strong>
          <p>{guruData.email}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailGuru;
