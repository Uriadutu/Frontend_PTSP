import React, { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { MdOutlineWork } from "react-icons/md";
import { HiMiniInboxArrowDown } from "react-icons/hi2";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import PaludiDs from "./Dashboard/PaludiDs";
import axios from "axios";

const Welcome = () => {
  const [suratMasuk, setSuratMasuk] = useState([]);
  const [suratKeluar, setSuratKeluar] = useState([]);
  const [satker, setSatker] = useState([]);
  const [pegawai, setPegawai] = useState([]);
  const [jabatan, setJabatan] = useState([]);

  const getSuratMasuk = async () => {
    try {
      const response = await axios.get("http://localhost:5000/suratmasuk");
      const jumlah = response.data;
      setSuratMasuk(jumlah.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getSuratKeluar = async () => {
    try {
      const response = await axios.get("http://localhost:5000/suratkeluar");
      const jumlah = response.data;
      setSuratKeluar(jumlah.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getSatker = async () => {
    try {
      const response = await axios.get("http://localhost:5000/satker");
      const jumlah = response.data;
      setSatker(jumlah.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getPegawai = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pegawai");
      const jumlah = response.data;
      setPegawai(jumlah.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getJabatan = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jabatan");
      const jumlah = response.data;
      setJabatan(jumlah.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=> {
    getSuratMasuk()
    getSuratKeluar()
    getSatker()
    getPegawai()
    getJabatan()
  }, [])

  return (
    <div className="contain">
      <div className="bg-white drop-shadow-lg p-2 w-full">
        <h1 className="text-xl font-bold sm:text-xl">
          Selamat Datang Di Aplikasi Sasadu Lamo
        </h1>
      </div>
      <div className="flex grid grid-cols-2 gap-x-2 gap-y-2 mt-6 md:grid-cols-2 lg:grid-cols-5 sm:gap-x-2 sm:gap-y-2 mt-6">
        <div className="bg-[#08A139] rounded-md drop-shadow-lg p-2 w-full">
          <div className="flex p-2 justify-between text-end items-center text-white">
            <h1 className="text-xs sm:text-xl">
              <IoPerson color="white" size={30} />
            </h1>
            <div className="ml-2">
              <h1>Pegawai</h1>
              <h1>{pegawai}</h1>
            </div>
          </div>
        </div>
        <div className="bg-[#08A139] rounded-md drop-shadow-lg p-2 w-full">
          <div className="flex p-2 justify-between text-end items-center text-white">
            <h1 className="text-xs sm:text-xl">
              <MdOutlineWork color="white" size={30} />
            </h1>
            <div className="ml-2">
              <h1>Jabatan</h1>
              <h1>{jabatan}</h1>
            </div>
          </div>
        </div>
        <div className="bg-[#08A139] rounded-md drop-shadow-lg p-2 w-full">
          <div className="flex p-2 justify-between text-end items-center text-white">
            <h1 className="text-xs sm:text-xl">
              <MdOutlineWork color="white" size={30} />
            </h1>
            <div className="ml-2">
              <h1>Satuan Kerja</h1>
              <h1>{satker}</h1>
            </div>
          </div>
        </div>
        <div className="bg-[#08A139] rounded-md drop-shadow-lg p-2 w-full">
          <div className="flex p-2 justify-between text-end items-center text-white">
            <h1 className="text-xs sm:text-xl">
              <HiMiniInboxArrowDown color="white" size={30} />
            </h1>
            <div className="ml-2">
              <h1>Surat Masuk</h1>
              <h1>{suratMasuk}</h1>
            </div>
          </div>
        </div>
        <div className="bg-[#08A139] rounded-md drop-shadow-lg p-2 w-full col-span-2 lg:col-span-1">
          <div className="flex p-2 justify-between text-end items-center text-white">
            <h1 className="text-xs sm:text-xl">
              <RiInboxUnarchiveFill color="white" size={30} />
            </h1>
            <div className="ml-2">
              <h1>Surat Keluar</h1>
              <h1>{suratKeluar}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex grid grid-cols-1 mt-3">
        <PaludiDs />
      </div>
    </div>
  );
};

export default Welcome;
