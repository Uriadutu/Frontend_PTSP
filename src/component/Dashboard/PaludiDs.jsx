import React, { useEffect, useState } from "react";
import { Chart as ChartJs, defaults } from "chart.js/auto";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Link } from "react-router-dom";

// defaults.maintainAspectRatio = false;
// defaults.responsive = true;
const PaludiDs = () => {
  const [guruSd, setGuruSd] = useState([]);
  const [guruSMP, setGuruSMP] = useState([]);
  const [guruSMA, setGuruSMA] = useState([]);
  const [gereja, setGereja] = useState([]);
  const [penyulu, setPenyulu] = useState([]);
  const [lembaga, setLembaga] = useState([]);
  const [organisasi, setOrganisasi] = useState([]);
  const [sekolahSd, setSekolahSd] = useState([]);
  const [sekolahSmp, setSekolahSmp] = useState([]);
  const [sekolahSma, setSekolahSma] = useState([]);

  const [sdN, setSdN] = useState([])
  const [sdS, setSdS] = useState([])
  const [smpN, setSmpN] = useState([])
  const [smpS, setSmpS] = useState([])
  const [smaN, setSmaN] = useState([])
  const [smaS, setSmaS] = useState([])

  const getTotal = async (sSekolah, set) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/sekolah-kristen/status/${sSekolah}`
      );
      const total = response.data
      set(total.length)
    } catch (error) {
      console.log(error);      
    }
  }


  useEffect(()=> {
    getTotal("sekolah-dasarnegeri", setSdN)
    getTotal("sekolah-dasarswasta", setSdS)
    getTotal("sekolah-menengah-pertamanegeri", setSmpN)
    getTotal("sekolah-menengah-pertamaswasta", setSmpS)
    getTotal("sekolah-menengah-atasnegeri", setSmaN)
    getTotal("sekolah-menengah-atasswasta", setSmaS)
  }, [])
  const getGuruSD = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/gurupak/jenjang/sekolah-dasar"
      );
      const data = response.data;
      setGuruSd(data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getGuruSMP = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/gurupak/jenjang/sekolah-menengah-pertama"
      );
      const data = response.data;
      setGuruSMP(data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getGuruSMA = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/gurupak/jenjang/sekolah-menengah-atas"
      );
      const data = response.data;
      setGuruSMA(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getGereja = async () => {
    try {
      const response = await axios.get("http://localhost:5000/gereja");
      const data = response.data;
      setGereja(data.length);
    } catch (error) {
      console.log(error);
    }
  };
  
  const getPenyulu = async () => {
    try {
      const response = await axios.get("http://localhost:5000/penyulu");
      const data = response.data;
      setPenyulu(data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getLembaga = async () => {
    try {
      const response = await axios.get("http://localhost:5000/lembaga-kristen");
      const data = response.data;
      setLembaga(data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getOrganisasi = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/organisasi/kristen"
      );
      const data = response.data;
      setOrganisasi(data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getSekolah = async (jenjang, set) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/sekolah-kristen/jumlah/${jenjang}`
      );
      const data = response.data;
      set(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGuruSD();
    getGuruSMP();
    getGuruSMA();
    getGereja();
    getPenyulu();
    getLembaga();
    getOrganisasi();
    getSekolah("sekolah-dasar", setSekolahSd);
    getSekolah("sekolah-menengah-pertama", setSekolahSmp);
    getSekolah("sekolah-menengah-atas", setSekolahSma);
  }, []);
  return (
    <div className="flex grid grid-cols-1 md:grid-cols-4 gap-x-2 gap-y-2 ">
      <div className="bg-white rounded p-3 drop-shadow-md">
        <h1 className="text-xl font-bold text-center">Chart Guru Paludi</h1>
        <div className="flex justify-center items-center">
          <Doughnut
            data={{
              labels: ["SD", "SMP", "SMA"],
              datasets: [
                {
                  label: "Guru Pak",
                  data: [guruSd, guruSMP, guruSMA],
                  backgroundColor: ["#4CAF50", "#FFEB3B", "#FFC107"],
                  weight: 2,
                },
              ],
              borderColor: ["white", "white", "white"],
            }}
          />
        </div>
      </div>
      <div className="bg-white rounded p-3 drop-shadow-md md:col-span-2 col-span-1">
        <h1 className="text-xl font-bold text-center">Chart Sekolah Paludi</h1>
        <Bar
          data={{
            labels: ["SD", "SMP", "SMA"],
            datasets: [
              {
                label: "Negeri",
                data: [sdN, smpN, smaN],
                backgroundColor: ["#607D8B", "#607D8B", "#607D8B"],
                weight: 2,
              },
              {
                label: "Total",
                data: [sekolahSd, sekolahSmp, sekolahSma],
                backgroundColor: ["#CDDC39", "#CDDC39", "#CDDC39"],
                weight: 2,
              },
              {
                label: "Swasta",
                data: [sdS, smpS, smaS],
                backgroundColor: ["#81C784", "#81C784", "#81C784"],
                weight: 2,
              },
            ],
            backgroundColor: ["black", "red", "green"],
          }}
          options={{
            responsive: true,
            // plugins: {
            // legend: {
            //   display: false, // Menghilangkan label
            // },
            // title: {
            //   display: false, // Menghilangkan judul
            // },
            // },
          }}
        />
      </div>

      <div className="grid grid-row-4 gap-y-2 bg-white rounded p-3 drop-shadow-md">
        <h1 className="text-xl font-bold text-center">Data Paludi</h1>
        <Link
          to={"/paludi/data-gereja"}
          className="bg-white border border-gray-500 w-full drop-shadow-md"
        >
          <div className="flex p-2 justify-between text-end items-center text-black  items-center w-full">
            <h1>Gereja</h1>
            <h1>{gereja}</h1>
          </div>
        </Link>
        <Link
          to={"/paludi/data-penyuluh"}
          className="bg-white border border-gray-500 w-full drop-shadow-md"
        >
          <div className="flex p-2 justify-between text-end items-center text-black  items-center w-full">
            <h1>Penyulu</h1>
            <h1>{penyulu}</h1>
          </div>
        </Link>
        <Link
          to={"/paludi/data-lembaga-keagamaan"}
          className="bg-white border border-gray-500 w-full drop-shadow-md"
        >
          <div className="flex p-2 justify-between text-end items-center text-black  items-center w-full">
            <h1>Lembaga Keagamaan</h1>
            <h1>{lembaga}</h1>
          </div>
        </Link>
        <Link
          to={"/paludi/data-organisasi-masyarakat"}
          className="bg-white border border-gray-500 w-full drop-shadow-md"
        >
          <div className="flex p-2 justify-between text-end items-center text-black  items-center w-full">
            <h1>Organisasi</h1>
            <h1>{organisasi}</h1>
          </div>
        </Link>
      </div>
      {/* <Doughnut />
      <Line /> */}
    </div>
  );
};

export default PaludiDs;
