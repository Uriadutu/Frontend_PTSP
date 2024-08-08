import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../utils/helper";

const DetailPengaduan = () => {
  const [pengaduanData, setPengaduanData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getPengaduanById = async (idPengaduan) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/pengaduan/layanan/${idPengaduan}`
      );
      setPengaduanData(response.data);
    } catch (error) {
      console.error("Error fetching Pengaduan data:", error);
    }
  };

  useEffect(() => {
    getPengaduanById(id);
  }, [id]);

  if (!pengaduanData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="judul">Detail Pengaduan</h2>
      <button className="btn-back" onClick={() => navigate(-1)}>
        Kembali
      </button>
      <div className="p-6 grid grid-cols-2 gap-4 bg-white shadow-lg rounded-lg mt-2">
        <div>
          <strong>Judul Laporan:</strong>
          <p>{pengaduanData.judul_laporan}</p>
        </div>
        <div>
          <strong>Tanggal Kejadian:</strong>
          <p>{pengaduanData.tgl_kejadian}</p>
        </div>
        <div>
          <strong>Lokasi Kejadian:</strong>
          <p>{pengaduanData.lokasi_kejadian}</p>
        </div>
        <div>
          <strong>Kategori Laporan:</strong>
          <p>{pengaduanData.kategori_laporan}</p>
        </div>
        <div>
          <strong>Deskripsi Pengaduan:</strong>
          <p>{pengaduanData.deskripsiPengaduan}</p>
        </div>
        <div>
          <strong>Sifat Laporan:</strong>
          <p>{pengaduanData.sifat_laporan}</p>
        </div>
        <div>
          <strong>Nama Pegawai:</strong>
          <p>{pengaduanData.Pegawai?.nama_pegawai}</p>
        </div>
        <div>
          <strong>Tanggal Pengaduan:</strong>
          <p>{formatDate(pengaduanData.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPengaduan;
