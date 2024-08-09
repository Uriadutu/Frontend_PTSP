import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";

const DisaDs = () => {
  const [sdN, setSdN] = useState(0);
  const [sdS, setSdS] = useState(0);
  const [sdP, setSdP] = useState(0);
  const [smpN, setSmpN] = useState(0);
  const [smpS, setSmpS] = useState(0);
  const [smpP, setSmpP] = useState(0);
  const [smaN, setSmaN] = useState(0);
  const [smaS, setSmaS] = useState(0);
  const [smaP, setSmaP] = useState(0);

  const [guru, setGuru] = useState([])
  const [siswa, setSiswa] = useState([])



  const getGuruDanSiswa = async(end, set) => {
    try {
        const response = await axios.get(`http://localhost:5000/${end}`);
        const total = response.data
        set(total.length)
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=> {
    getGuruDanSiswa("guru", setGuru)
    getGuruDanSiswa("siswa", setSiswa)
  },[])
  const getTotal = async (sSekolah, set) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/sekolah/status/${sSekolah}`
      );
      set(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getTotal("sekolah-dasarnegeri", setSdN),
        getTotal("sekolah-dasarswasta", setSdS),
        getTotal("sekolah-dasarpondok-pesantren", setSdP),
        getTotal("sekolah-menengah-pertamanegeri", setSmpN),
        getTotal("sekolah-menengah-pertamaswasta", setSmpS),
        getTotal("sekolah-menengah-pertamapondok-pesantren", setSmpP),
        getTotal("sekolah-menengah-atasnegeri", setSmaN),
        getTotal("sekolah-menengah-atasswasta", setSmaS),
        getTotal("sekolah-menengah-ataspondok-pesantren", setSmaP),
      ]);
    };
    fetchData();
  }, []);

  const totalSd = sdN + sdS + sdP;
  const totalSmp = smpN + smpS + smpP;
  const totalSma = smaN + smaS + smaP;

  

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-2 gap-y-2">
        <div className="bg-white rounded p-3 drop-shadow-md col-span-1">
        <h1 className="text-xl font-bold text-center">Chart Guru Dan Sekolah</h1>

        <div className="flex justify-center items-center mt-5">
          <Pie
            data={{
              labels: ["Guru", "Siswa"],
              datasets: [
                {
                  label: "Jumlah",
                  data: [guru, siswa],
                  backgroundColor: ["#FFEB3B", "#4CAF50"],
                  borderColor: ["white", "white"],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `${context.label}: ${context.raw}`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
      <div className="bg-white rounded p-3 drop-shadow-md md:col-span-3 col-span-1">
        <h1 className="text-xl font-bold text-center">
          Chart Sekolah Pantai Disa
        </h1>
        <Bar
          data={{
            labels: ["SD", "SMP", "SMA"],
            datasets: [
              {
                label: "Negeri",
                data: [sdN, smpN, smaN],
                backgroundColor: "#607D8B",
                weight: 2,
              },
              {
                label: "Swasta",
                data: [sdS, smpS, smaS],
                backgroundColor: "#81C784",
                weight: 2,
              },
              {
                label: "Pesantren",
                data: [sdP, smpP, smaP],
                backgroundColor: "#FFEB3B",
                weight: 2,
              },
              {
                label: "Total",
                data: [totalSd, totalSmp, totalSma],
                backgroundColor: "#FF5722",
                weight: 2,
                borderColor: "#D32F2F",
                borderWidth: 1,
                type: "line", // Tambahkan baris untuk total
              },
            ],
          }}
          options={{
            responsive: true,
            // maintainAspectRatio: false,
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
  );
};

export default DisaDs;
