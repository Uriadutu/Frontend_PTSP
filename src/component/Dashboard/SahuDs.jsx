import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";

const SahuDs = () => {
  const [kecamatan, setKecamatan] = useState([]);

  const getKec = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kecamatan");
      setKecamatan(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKec();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2 h-full">
      <div className="bg-white rounded p-3 drop-shadow-md">
        <h1 className="text-xl font-bold text-center pb-2">Data Kecamatan</h1>
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
                  label: "Tanah Wakaf",
                  data: [4],
                  backgroundColor: ["#607D8B", "#607D8B"],
                  weight: 2,
                },
                {
                  label: "Zakat",
                  data: [1],
                  backgroundColor: ["#60FF8B", "#60FF8B"],
                  weight: 2,
                },
                {
                  label: "Zakat",
                  data: [1],
                  backgroundColor: ["#60FF8B", "#60FF8B"],
                  weight: 2,
                },
                {
                  label: "Zakat",
                  data: [1],
                  backgroundColor: ["#60FF8B", "#60FF8B"],
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
