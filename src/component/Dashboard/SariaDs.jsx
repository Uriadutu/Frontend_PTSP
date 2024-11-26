import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const SariaDs = () => { 
  const [kua, setKua] = useState([]); 
  const [lembaga, setLembaga] = useState([]);
  const [organisasi, setOrganisasi] = useState([]);
  const [majelis, setMajelis] = useState([]);
  const [masjid, setMasjid] = useState([]);
  const [umat, setUmat] = useState([]);

  const getSaria = async (end, set) => {
    try {
      const response = await axios.get(`http://localhost:5000/${end}`);
      const total = response.data;
      set(total.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSaria("kua", setKua);
    getSaria("lembaga-keagamaan", setLembaga);
    getSaria("organisasi-masyarakat", setOrganisasi);
    getSaria("majelis", setMajelis);
    getSaria("rumah-ibadah-islam", setMasjid);
    getSaria("umat-islam", setUmat);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="bg-white rounded p-3 drop-shadow-md w-full h-full flex flex-col">
        <h1 className="text-xl font-bold text-center mb-4">Chart Saria</h1>
        <div className="flex-grow">
          <Bar
            data={{
              labels: [
                "kua",
                "lembaga",
                "organisasi",
                "majelis",
                "masjid",
                "umat",
              ],
              datasets: [
                {
                  data: [kua, lembaga, organisasi, majelis, masjid, umat],
                  backgroundColor: [
                    "#E65100", // Oranye Tua
                    "#F57C00", // Oranye Terakota
                    "#FF9800", // Oranye Terang
                    "#EF6C00", // Oranye Karat
                    "#FFA726", // Oranye Keemasan
                    "#FB8C00", // Oranye Muda
                  ],
                  weight: 2,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                },
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SariaDs;
