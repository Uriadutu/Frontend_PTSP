import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetailMesjid = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [mesjid, setMesjid] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log(mesjid);

   const getMasjidbyId = async (idmasjid) => {
     try {
       const response = await axios.get(
         `http://localhost:5000/rumah-ibadah-islam/${idmasjid}`
       );
       setMesjid(response.data);
     } catch (error) {
       setError(error.message);
     } finally {
       setLoading(false);
     }
   };
  useEffect(() => {
    getMasjidbyId(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!mesjid) return <p>Masjid tidak ditemukan</p>;

  return (
    
     
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detail Masjid</h1>
      <button onClick={()=> navigate(-1)} className="btn-back">Kembali</button>
      <div className="bg-white mt-3 shadow-md rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>ID Masjid:</strong>
          </div>
          <div>{mesjid.id_mesjid}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Nama Masjid:</strong>
          </div>
          <div>{mesjid.nama_masjid}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Kecamatan:</strong>
          </div>
          <div>{mesjid.kecamatan}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Tipologi:</strong>
          </div>
          <div>{mesjid.tipologi}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Alamat:</strong>
          </div>
          <div>{mesjid.alamat}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Status Tanah:</strong>
          </div>
          <div>{mesjid.status_tanah}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Luas Tanah:</strong>
          </div>
          <div>{mesjid.luas_tanah}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Luas Bangunan:</strong>
          </div>
          <div>{mesjid.luas_bangunan}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Tahun Berdiri:</strong>
          </div>
          <div>{mesjid.tahun_berdiri}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailMesjid;
