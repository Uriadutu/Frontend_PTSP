import React from "react";
import { IoPerson } from "react-icons/io5";
import { MdOutlineWork } from "react-icons/md";
import { HiMiniInboxArrowDown } from "react-icons/hi2";
import { RiInboxUnarchiveFill } from "react-icons/ri";

const Welcome = () => {
  return (
    <div className="contain">
      <div className="bg-white drop-shadow-lg p-2 w-full">
        <h1 className="text-xs sm:text-xl">
          Selamat Datang Di Aplikasi Sasadu Lamo
        </h1>
      </div>
      <div className="flex grid grid-cols-2 gap-x-2 gap-y-2 mt-6 md:grid-cols-2 lg:grid-cols-4 sm:gap-x-2 sm:gap-y-2 mt-6">
        <div className="bg-red-400 rounded-md drop-shadow-lg p-2 w-full">
          <div className="flex p-2 justify-between text-end items-center text-white">
            <h1 className="text-xs sm:text-xl">
              <IoPerson color="white" size={30} />
            </h1>
            <div className="ml-2">
              <h1>Pegawai</h1>
              <h1>20</h1>
            </div>
          </div>
        </div>
        <div className="bg-yellow-400 rounded-md drop-shadow-lg p-2 w-full">
          <div className="flex p-2 justify-between text-end items-center text-white">
            <h1 className="text-xs sm:text-xl">
              <MdOutlineWork color="white" size={30} />
            </h1>
            <div className="ml-2">
              <h1>Satuan Kerja</h1>
              <h1>20</h1>
            </div>
          </div>
        </div>
        <div className="bg-green-400 rounded-md drop-shadow-lg p-2 w-full">
          <div className="flex p-2 justify-between text-end items-center text-white">
            <h1 className="text-xs sm:text-xl">
              <HiMiniInboxArrowDown color="white" size={30} />
            </h1>
            <div className="ml-2">
              <h1>Surat Masuk</h1>
              <h1>20</h1>
            </div>
          </div>
        </div>
        <div className="bg-blue-400 rounded-md drop-shadow-lg p-2 w-full">
          <div className="flex p-2 justify-between text-end items-center text-white">
            <h1 className="text-xs sm:text-xl">
              <RiInboxUnarchiveFill color="white" size={30} />
            </h1>
            <div className="ml-2">
              <h1>Surat Keluar</h1>
              <h1>20</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
