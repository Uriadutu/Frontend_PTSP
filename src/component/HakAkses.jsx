import React, { useEffect, useState } from "react";
import axios from "axios";
import AddHakAksesModal from "./Modal/AddHakAksesModal";
import { IoSettings } from "react-icons/io5";
import { BsInfoCircleFill } from "react-icons/bs";
import InfoHakAksesModal from "./Modal/InfoHakAksesModal";

const HakAkses = () => {
  const [pegawaiList, setPegawaiList] = useState([]);
  const [filteredPegawai, setFilteredPegawai] = useState([]);
  const [selectedPegawai, setSelectedPegawai] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pegawaiPerPage] = useState(50);

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

  const filterAndPaginatePegawai = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = pegawaiList.filter(
      (pegawai) =>
        pegawai.nama_pegawai.toLowerCase().includes(lowerCaseSearchText) ||
        pegawai.NIP.toLowerCase().includes(lowerCaseSearchText)
    );

    const indexOfLastPegawai = currentPage * pegawaiPerPage;
    const indexOfFirstPegawai = indexOfLastPegawai - pegawaiPerPage;
    const currentPegawai = filtered.slice(
      indexOfFirstPegawai,
      indexOfLastPegawai
    );

    setFilteredPegawai(currentPegawai);
  };

  const handleEditClick = (pegawai) => {
    setSelectedPegawai(pegawai);
    setOpenModal(true);
  };

  const handleOpenInfo = (pegawai) => {
    setSelectedPegawai(pegawai);
    setOpenModalInfo(true);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    filterAndPaginatePegawai();
  }, [pegawaiList, searchText, currentPage, filterAndPaginatePegawai]); // Include filterAndPaginatePegawai here

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pegawaiList.length / pegawaiPerPage); i++) {
    pageNumbers.push(i);
  }

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
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="input"
          placeholder="Cari Nama / NIP"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg mb-6">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">NIP</th>
              <th className="py-3 px-6 text-left">Nama Pegawai</th>
              <th className="py-3 px-6 text-left">Jenis Pegawai</th>
              <th className="py-3 px-6 text-left">Satuan Kerja</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredPegawai.map((pegawai, index) => (
              <tr
                key={pegawai.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * pegawaiPerPage + index + 1}
                </td>
                <td className="py-3 px-6 text-left">{pegawai.NIP}</td>
                <td className="py-3 px-6 text-left">{pegawai.nama_pegawai}</td>
                <td className="py-3 px-6 text-left">{pegawai.jenis_pegawai}</td>
                <td className="py-3 px-6 text-left">{pegawai.satuan_kerja}</td>
                <td className="py-3 px-6 flex gap-1 justify-center items-center ">
                  <button
                    className="p-2 border border-gray-100 rounded bg-gray-600 hover:bg-gray-500"
                    onClick={() => handleOpenInfo(pegawai)}
                    title="Info"
                  >
                    <BsInfoCircleFill color="white" />
                  </button>
                  <button
                    className="p-2 border border-gray-100 rounded bg-gray-600 hover:bg-gray-500 ml-2"
                    onClick={() => handleEditClick(pegawai)}
                    title="Edit"
                  >
                    <IoSettings color="white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="flex justify-center mt-4">
        <ul className="flex space-x-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => handlePageChange(number)}
                className={`px-3 py-1 rounded ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HakAkses;
