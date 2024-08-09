import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetailPelayanGereja = () => {
  const [pelayanGerejaData, setPelayanGerejaData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getPelayanGerejaById = async (idPelayan) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/pelayangereja/${idPelayan}`
      );
      setPelayanGerejaData(response.data);
    } catch (error) {
      console.error("Error fetching Pelayan Gereja data:", error);
    }
  };

  useEffect(() => {
    getPelayanGerejaById(id);
  }, [id]);

  if (!pelayanGerejaData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contain">
      <h2 className="judul">Detail Pelayan Gereja</h2>
      <button className="btn-back" onClick={() => navigate(-1)}>
        Kembali
      </button>
      <div className="p-6 grid grid-cols-2 gap-4 bg-white shadow-lg rounded-lg mt-2">
        <div>
          <strong>Nama Gereja:</strong>
          <p>{pelayanGerejaData.Gereja.nama_gereja}</p>
        </div>
        <div>
          <strong>Nama Pelayan:</strong>
          <p>{pelayanGerejaData.nama_pelayan}</p>
        </div>
        <div>
          <strong>Jenis Kelamin:</strong>
          <p>{pelayanGerejaData.jenis_kelamin}</p>
        </div>
        <div>
          <strong>Pendidikan Terakhir:</strong>
          <p>{pelayanGerejaData.pendidikan_terakhir}</p>
        </div>
        <div>
          <strong>Jabatan Pelayan:</strong>
          <p>{pelayanGerejaData.jabatan_pelayan}</p>
        </div>
        <div>
          <strong>Jabatan BPHJ:</strong>
          <p>{pelayanGerejaData.jabatan_bphj}</p>
        </div>
        <div>
          <strong>Jabatan Bidang:</strong>
          <p>{pelayanGerejaData.jabatan_bidang}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPelayanGereja;
