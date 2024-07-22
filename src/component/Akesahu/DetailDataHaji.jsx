import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetailDataHaji = () => {
  const [hajiData, setHajiData] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();

  const getHajiByid = async (idHaji) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/haji/${idHaji}`
        );
        setHajiData(response.data);
      } catch (error) {
        console.error("Error fetching Haji data:", error);
      }
    };
  useEffect(() => {
    getHajiByid(id);
  }, [id]);

  if (!hajiData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contain ">
      <h2 className="judul">Detail Data Haji</h2>
      <button className="btn-back" onClick={() => navigate(-1)}>
        Kembali
      </button>
      <div className="p-6 grid grid-cols-2 gap-4  bg-white shadow-lg rounded-lg mt-2">
        <div>
          <strong>Nomor Porsi:</strong>
          <p>{hajiData.nomor_porsi}</p>
        </div>
        <div>
          <strong>Tanggal Daftar:</strong>
          <p>{hajiData.tanggal_porsi}</p>
        </div>
        <div>
          <strong>Nama Jamaah:</strong>
          <p>{hajiData.nama_jamaah}</p>
        </div>
        <div>
          <strong>Jenis Kelamin:</strong>
          <p>{hajiData.jenis_kelamin}</p>
        </div>
        <div>
          <strong>Pekerjaan:</strong>
          <p>{hajiData.pekerjaan}</p>
        </div>
        <div>
          <strong>Tempat Lahir:</strong>
          <p>{hajiData.tempat_lahir}</p>
        </div>
        <div>
          <strong>Tanggal Lahir:</strong>
          <p>{hajiData.tanggal_lahir}</p>
        </div>
        <div>
          <strong>Nama Desa:</strong>
          <p>{hajiData.nama_desa}</p>
        </div>
        <div>
          <strong>Kecamatan:</strong>
          <p>{hajiData.kecamatan}</p>
        </div>
        <div>
          <strong>Bank:</strong>
          <p>{hajiData.bank}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailDataHaji;
