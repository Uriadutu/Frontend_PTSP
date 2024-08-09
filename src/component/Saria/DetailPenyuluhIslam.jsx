import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetailPenyuluIslam = () => {
  const [penyuluData, setPenyuluData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getPenyuluById = async (idPenyulu) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/penyuluh/islam/${idPenyulu}`
      );
      setPenyuluData(response.data);
    } catch (error) {
      console.error("Error fetching Penyulu data:", error);
    }
  };

  useEffect(() => {
    getPenyuluById(id);
  }, [id]);

  if (!penyuluData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contain">
      <h2 className="judul">Detail Penyulu</h2>
      <button className="btn-back" onClick={() => navigate(-1)}>
        Kembali
      </button>
      <div className="p-6 grid grid-cols-2 gap-4 bg-white shadow-lg rounded-lg mt-2">
        <div>
          <strong>Nama Penyulu:</strong>
          <p>{penyuluData.nama}</p>
        </div>
        <div>
          <strong>Status Pegawai:</strong>
          <p>{penyuluData.status_pegawai}</p>
        </div>
        <div>
          <strong>Tempat Tugas:</strong>
          <p>{penyuluData.tempat_tugas}</p>
        </div>
        <div>
          <strong>Jumlah Kelompok:</strong>
          <p>{penyuluData.jumlah_binaan}</p>
        </div>
        <div>
          <strong>Kelompok Binaan:</strong>
          <div>
            {penyuluData.KelompokBinaanIslams &&
              penyuluData.KelompokBinaanIslams.map((item, index) => (
                <p key={index}>- {item.nama_kelompok}</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPenyuluIslam;
