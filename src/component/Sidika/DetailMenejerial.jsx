import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetailMenejerial = () => {
  const [menejerialData, setMenejerialData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getMenejerialById = async (idMenejerial) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/menejerial/${idMenejerial}`
      );
      setMenejerialData(response.data);
    } catch (error) {
      console.error("Error fetching Menejerial data:", error);
    }
  };

  useEffect(() => {
    getMenejerialById(id);
  }, [id]);

  if (!menejerialData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contain">
      <h2 className="judul">Detail Menejerial</h2>
      <button className="btn-back" onClick={() => navigate(-1)}>
        Kembali
      </button>
      <div className="p-6 grid grid-cols-2 gap-4 bg-white shadow-lg rounded-lg mt-2">
        <div>
          <strong>NIP:</strong>
          <p>{menejerialData.Pegawai.NIP}</p>
        </div>
        <div>
          <strong>Nama Pengawas:</strong>
          <p>{menejerialData.Pegawai.nama_pegawai}</p>
        </div>
        <div>
          <strong>Nama Sekolah:</strong>
          <p>{menejerialData.nama_sekolah}</p>
        </div>
        <div>
          <strong>Nama Kepala Sekolah:</strong>
          <p>{menejerialData.nama_kepsek}</p>
        </div>
        <div>
          <strong>Status Sertifikat:</strong>
          <p>{menejerialData.status_sertifikat}</p>
        </div>
        <div>
          <strong>Status Pegawai:</strong>
          <p>{menejerialData.status_pegawai}</p>
        </div>
        <div>
          <strong>Keterangan:</strong>
          <p>{menejerialData.keterangan}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailMenejerial;
