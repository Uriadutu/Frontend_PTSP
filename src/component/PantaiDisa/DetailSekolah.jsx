import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetailSekolah = () => {
  const [sekolahData, setSekolahData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getSekolahById = async (idSekolah) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/sekolah/${idSekolah}`
      );
      setSekolahData(response.data);
    } catch (error) {
      console.error("Error fetching Sekolah data:", error);
    }
  };

  useEffect(() => {
    getSekolahById(id);
  }, [id]);

  if (!sekolahData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contain">
      <h2 className="judul">Detail Data Sekolah</h2>
      <button className="btn-back" onClick={() => navigate(-1)}>
        Kembali
      </button>
      <div className="p-6 grid grid-cols-2 gap-4 bg-white shadow-lg rounded-lg mt-2">
        <div>
          <strong>Nama Sekolah:</strong>
          <p>{sekolahData.nama_sekolah}</p>
        </div>
        <div>
          <strong>Status Sekolah:</strong>
          <p>{sekolahData.s_sekolah}</p>
        </div>
        <div>
          <strong>Jenjang Sekolah:</strong>
          <p>{sekolahData.jenjang_sekolah}</p>
        </div>
        <div>
          <strong>NSS:</strong>
          <p>{sekolahData.nss}</p>
        </div>
        <div>
          <strong>Alamat:</strong>
          <p>{sekolahData.alamat}</p>
        </div>
        <div>
          <strong>No Telepon:</strong>
          <p>{sekolahData.no_telp}</p>
        </div>
        <div>
          <strong>Tahun Berdiri:</strong>
          <p>{sekolahData.tahun_berdiri}</p>
        </div>
        <div>
          <strong>Status Akreditasi:</strong>
          <p>{sekolahData.status_akreditasi}</p>
        </div>
        <div>
          <strong>Status Bangunan:</strong>
          <p>{sekolahData.status_bangunan}</p>
        </div>
        <div>
          <strong>No Her Registrasi Pendirian:</strong>
          <p>{sekolahData.req_pendirian}</p>
        </div>
        <div>
          <strong>Jumlah Rombel:</strong>
          <p>{sekolahData.jumlah_rombel}</p>
        </div>
        <div>
          <strong>Nama Kepala Sekolah:</strong>
          <p>{sekolahData.nama_kepsek}</p>
        </div>
        <div>
          <strong>NIP Kepala Sekolah:</strong>
          <p>{sekolahData.nip_kepsek}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailSekolah;
