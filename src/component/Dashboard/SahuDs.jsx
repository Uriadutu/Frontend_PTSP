import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";

const SahuDs = () => {
  const [kecamatan, setKecamatan] = useState([]);
  const [zakatTerima, setZakatTerima] = useState([])
  const [zakatPenyaluran, setZakatPenyaluran] = useState([])
  const [tanahSerti, setTanahSerti] = useState([])
  const [tanahNon, setTanahNon] = useState([])

  const getKec = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kecamatan");
      setKecamatan(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  const getData = async (end, set) => {
    try {
      const response = await axios.get(`http://localhost:5000/${end}`);
      const total = response.data
      set(total.length);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(zakatPenyaluran, zakatTerima, tanahSerti, tanahNon);

  useEffect(() => {
    getKec();
    getData("zakat/kategori/Penerima", setZakatTerima);
    getData("zakat/kategori/Penyaluran", setZakatPenyaluran);
    getData("tanah-wakaf/jenis/Bersertifikat", setTanahSerti);
    getData("tanah-wakaf/jenis/Belum Bersertifikat", setTanahNon);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2 h-full">
      <div className="bg-white rounded p-3 drop-shadow-md">
        <h1 className="text-xl font-bold text-center">Data Kecamatan</h1>
        <div className="bg-white grid gap-2 w-full">
          {kecamatan.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="flex px-1 bg-[#607D8B] border border-gray-500 drop-shadow-md justify-between relative text-end text-white items-center w-full"
            >
              <div className="grid w-full">
                <h1 className="text-white text-start text-xs top-0 left-1">
                  Nama Kecamatan :
                </h1>
                <h1 className="text-lg mt-0 pb-2 pr-1">
                  {item && item.nama_kecamatan}
                </h1>
              </div>
            </div>
          ))}
        </div>
        <Link to={"/sahu/data-kecamatan"} className="mt-2">
          Lihat Semua
        </Link>
      </div>
      <div className="bg-white rounded p-3 drop-shadow-md flex flex-col h-full">
        <h1 className="text-xl font-bold text-center mb-4">Chart Sahu</h1>
        <div className="flex-grow">
          <Bar
            data={{
              labels: ["Tanah Wakaf", "Zakat"],
              datasets: [
                {
                  label: "Sertifikasi",
                  data: [tanahSerti, 0],
                  backgroundColor: "#FFEB0B",
                  weight: 2,
                },
                {
                  label: "Non Sertifikasi",
                  data: [tanahNon, 0],
                  backgroundColor: "#FFEB9B",
                  weight: 2,
                },
                {
                  label: "Terima",
                  data: [0, zakatTerima],
                  backgroundColor: "#60FF8B",
                  weight: 2,
                },
                {
                  label: "Penyaluran",
                  data: [0, zakatPenyaluran],
                  backgroundColor: "#4CAF50",
                  weight: 2,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
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

export default SahuDs;
