import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetailLembagaKristen = () => {
  const [lembagaData, setLembagaData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getLembagaById = async (idLembaga) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/lembaga-kristen/${idLembaga}`
      );
      setLembagaData(response.data);
    } catch (error) {
      console.error("Error fetching Lembaga Kristen data:", error);
    }
  };

  useEffect(() => {
    getLembagaById(id);
  }, [id]);

  if (!lembagaData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contain">
      <h2 className="judul">Detail Lembaga Kristen</h2>
      <button className="btn-back" onClick={() => navigate(-1)}>
        Kembali
      </button>
      <div className="p-6 grid grid-cols-2 gap-4 bg-white shadow-lg rounded-lg mt-2">
        <div>
          <strong>Nama Lembaga:</strong>
          <p>{lembagaData.nama_lembaga}</p>
        </div>
        <div>
          <strong>Alamat:</strong>
          <p>{lembagaData.alamat}</p>
        </div>
        <div>
          <strong>Tahun Berdiri:</strong>
          <p>{lembagaData.tahun_berdiri}</p>
        </div>
        <div>
          <strong>Nama Pimpinan:</strong>
          <p>{lembagaData.nama_pimpinan}</p>
        </div>
        <div>
          <strong>Tahun Periode:</strong>
          <p>{lembagaData.tahun_periode}</p>
        </div>
        <div>
          <strong>Jumlah Bidang:</strong>
          <p>{lembagaData.jumlah_bidang}</p>
        </div>
        <div>
          <strong>Jumlah Anggota:</strong>
          <p>{lembagaData.jumlah_anggota}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailLembagaKristen;
