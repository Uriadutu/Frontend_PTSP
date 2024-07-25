import React, { useEffect, useState } from "react";
import axios from "axios";
import AddHakAksesModal from "./Modal/AddHakAksesModal";
import { IoSettings } from "react-icons/io5";
import { BsInfoCircleFill } from "react-icons/bs";
import InfoHakAksesModal from "./Modal/InfoHakAksesModal";

const HakAkses = () => {
  const [pegawaiList, setPegawaiList] = useState([]);
  const [selectedPegawai, setSelectedPegawai] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);

  useEffect(() => {
    fetchPegawai();
  }, []);

  const fetchPegawai = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pegawai");
      setPegawaiList(response.data);
    } catch (error) {
      console.error("Failed to fetch pegawai:", error);
    }
  };

  const handleEditClick = (pegawai) => {
    setSelectedPegawai(pegawai);
    setOpenModal(true);
  };
  
  const handleOpenInfo = (pegawai) => {
    setSelectedPegawai(pegawai);
    setOpenModalInfo(true);
  };

  return (
    <div className="contain">
      {openModal && (
        <AddHakAksesModal
          setIsOpenModalAdd={setOpenModal}
          selectedPegawai={selectedPegawai}
          fetchPegawai={fetchPegawai}
        />
      )}
      {openModalInfo && (
        <InfoHakAksesModal
          setIsOpenModalAdd={setOpenModalInfo}
          selectedPegawai={selectedPegawai}
        />
      )}
      <h1 className="text-2xl font-bold mb-4">Hak Akses Pegawai</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg mb-6">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">No</th>
            <th className="py-3 px-6 text-left">NIP</th>
            <th className="py-3 px-6 text-left">Nama Pegawai</th>
            <th className="py-3 px-6 text-left">Jenis Pegawai</th>
            <th className="py-3 px-6 text-left">Satuan Kerja</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {pegawaiList.map((pegawai, index) => (
            <tr
              key={pegawai.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">{index + 1}</td>
              <td className="py-3 px-6 text-left">{pegawai.NIP}</td>
              <td className="py-3 px-6 text-left">{pegawai.nama_pegawai}</td>
              <td className="py-3 px-6 text-left">{pegawai.jenis_pegawai}</td>
              <td className="py-3 px-6 text-left">{pegawai.satuan_kerja}</td>
              <td className="py-3 px-6 text-center">
                <button
                  className="detail"
                  onClick={() => handleOpenInfo(pegawai)}
                >
                  <BsInfoCircleFill color="white" />
                </button>
                <button
                  className="p-2 border border-gray-100  rounded bg-gray-600 hover:bg-slate-500"
                  onClick={() => handleEditClick(pegawai)}
                >
                  <IoSettings color="white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HakAkses;
