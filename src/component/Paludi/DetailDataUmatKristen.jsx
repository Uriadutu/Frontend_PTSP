import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetailDataUmatKristen = () => {
  const [umatData, setUmatData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getUmatById = async (idUmat) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/data-umat-kristen/${idUmat}`
      );
      setUmatData(response.data);
    } catch (error) {
      console.error("Error fetching Umat Kristen data:", error);
    }
  };

  useEffect(() => {
    getUmatById(id);
  }, [id]);

  if (!umatData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contain">
      <h2 className="judul">Detail Data Umat Kristen</h2>
      <button className="btn-back" onClick={() => navigate(-1)}>
        Kembali
      </button>
      <div className="p-6 grid grid-cols-2 gap-4 bg-white shadow-lg rounded-lg mt-2">
        <div>
          <strong>Nama Gereja:</strong>
          <p>{umatData.nama_gereja}</p>
        </div>
        <div>
          <strong>Nama Pimpinan:</strong>
          <p>{umatData.nama_pimpinan}</p>
        </div>
        <div>
          <strong>Denominasi:</strong>
          <p>{umatData.demonisasi}</p>
        </div>
        <div>
          <strong>Jumlah Umat:</strong>
          <p>{umatData.jumlah_umat}</p>
        </div>
        <div>
          <strong>Jumlah Pria:</strong>
          <p>{umatData.jumlah_pria}</p>
        </div>
        <div>
          <strong>Jumlah Wanita:</strong>
          <p>{umatData.jumlah_wanita}</p>
        </div>
        <div>
          <strong>Nama Desa:</strong>
          <p>{umatData.nama_desa}</p>
        </div>
        <div>
          <strong>Kecamatan:</strong>
          <p>{umatData.kecamatan}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailDataUmatKristen;
