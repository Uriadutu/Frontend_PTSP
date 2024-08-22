import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetailGereja = () => {
  const [gerejaData, setGerejaData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getGerejaById = async (idGereja) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/gereja/${idGereja}`
      );
      setGerejaData(response.data);
    } catch (error) {
      console.error("Error fetching Gereja data:", error);
    }
  };

  useEffect(() => {
    getGerejaById(id);
  }, [id]);

  if (!gerejaData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contain">
      <h2 className="judul">Detail Gereja</h2>
      <button className="btn-back" onClick={() => navigate(-1)}>
        Kembali
      </button>
      <div className="p-6 grid grid-cols-2 gap-4 bg-white shadow-lg rounded-lg mt-2">
        <div>
          <strong>Nama Gereja:</strong>
          <p>{gerejaData.nama_gereja}</p>
        </div>
        <div>
          <strong>Nomor Lapor:</strong>
          <p>{gerejaData.no_lapor}</p>
        </div>
        <div>
          <strong>Status Ijin:</strong>
          <p>{gerejaData.status_ijin}</p>
        </div>
        <div>
          <strong>Nomor IMB:</strong>
          <p>{gerejaData.nomor_ibm}</p>
        </div>
        <div>
          <strong>Status Gedung:</strong>
          <p>{gerejaData.status_gedung}</p>
        </div>
        <div>
          <strong>Status Tanah:</strong>
          <p>{gerejaData.status_tanah}</p>
        </div>
        <div>
          <strong>Luas Bangunan:</strong>
          <p>{gerejaData.luas_bangunan}</p>
        </div>
        <div>
          <strong>Luas Tanah:</strong>
          <p>{gerejaData.luas_tanah}</p>
        </div>
        <div>
          <strong>Tahun Berdiri:</strong>
          <p>{gerejaData.tahun_berdiri}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailGereja;
