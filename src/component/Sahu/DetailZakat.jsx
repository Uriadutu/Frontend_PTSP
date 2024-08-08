import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetailZakat = () => {
  const [zakatData, setZakatData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getZakatById = async (idZakat) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/zakat/${idZakat}`
      );
      setZakatData(response.data);
    } catch (error) {
      console.error("Error fetching Zakat data:", error);
    }
  };

  useEffect(() => {
    getZakatById(id);
  }, [id]);

  if (!zakatData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contain">
      <h2 className="judul">Detail Data Zakat</h2>
      <button className="btn-back" onClick={() => navigate(-1)}>
        Kembali
      </button>
      <div className="p-6 grid grid-cols-2 gap-4 bg-white shadow-lg rounded-lg mt-2">
        <div>
          <strong>Kecamatan:</strong>
          <p>{zakatData.Kecamatan.nama_kecamatan}</p>
        </div>
        <div>
          <strong>Kategori:</strong>
          <p>{zakatData.kategori}</p>
        </div>
        <div>
          <strong>Sumber:</strong>
          <p>{zakatData.sumber}</p>
        </div>
        <div>
          <strong>Jumlah Sumber:</strong>
          <p>{zakatData.jumlah_sumber}</p>
        </div>
        <div>
          <strong>Jenis:</strong>
          <p>{zakatData.jenis}</p>
        </div>
        <div>
          <strong>Beras:</strong>
          <p>{zakatData.beras}</p>
        </div>
        <div>
          <strong>Uang:</strong>
          <p>{zakatData.uang}</p>
        </div>
        <div>
          <strong>Nominal Uang:</strong>
          <p>{zakatData.nominal_uang}</p>
        </div>
        <div>
          <strong>Sedekah:</strong>
          <p>{zakatData.sedekah}</p>
        </div>
        <div>
          <strong>Jumlah Zakat:</strong>
          <p>{zakatData.jumlah_zakat}</p>
        </div>
        <div>
          <strong>Tahun Zakat:</strong>
          <p>{zakatData.tahun_zakat}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailZakat;
