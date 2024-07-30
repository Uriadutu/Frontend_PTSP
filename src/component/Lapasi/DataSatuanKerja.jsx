import React, { useEffect, useState } from "react";
import ModalAddSatker from "../Modal/LapasiModal/AddSatker";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoAdd, IoDocument } from "react-icons/io5";
import * as XLSX from "xlsx";

const DataSatuanKerja = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [satker, setSatker] = useState([]);
  const [filteredSatker, setFilteredSatker] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [satkerPerPage] = useState(10);

  const getSatker = async () => {
    try {
      const response = await axios.get("http://localhost:5000/satker");
      setSatker(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusSatker = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/satker/${id}`);
      getSatker();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const downloadExcel = () => {
    const dataToExport = satker.map((item, index) => ({
      No: index + 1,
      "Kode Satker": item.kode_satker,
      "Nama Satker": item.nama_satker,
      "Alamat Satker": item.alamat_satker,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataSatker");
    XLSX.writeFile(workbook, "DataSatker.xlsx");
  };

  const filterAndPaginateSatker = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = satker.filter(
      (satker) =>
        satker.nama_satker.toLowerCase().includes(lowerCaseSearchText) ||
        satker.kode_satker.toLowerCase().includes(lowerCaseSearchText)
    );

    const indexOfLastSatker = currentPage * satkerPerPage;
    const indexOfFirstSatker = indexOfLastSatker - satkerPerPage;
    const currentSatker = filtered.slice(indexOfFirstSatker, indexOfLastSatker);

    setFilteredSatker(currentSatker);
  };

  useEffect(() => {
    getSatker();
  }, []);

  useEffect(() => {
    filterAndPaginateSatker();
  }, [satker, searchText, currentPage]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(satker.length / satkerPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="contain">
      {openModalAdd && (
        <ModalAddSatker
          setIsOpenModalAdd={setOpenModalAdd}
          getSatker={getSatker}
        />
      )}
      <h1 className="judul">Data Satuan Kerja</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Satker
          </button>
          <button
            onClick={downloadExcel}
            className="btn-download hidden sm:block"
          >
            Export ke Excel
          </button>
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add sm:hidden block"
          >
            <IoAdd color="white" />
          </button>
          <button
            onClick={downloadExcel}
            className="btn-download sm:hidden block"
          >
            <IoDocument color="white" />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <input
            type="text"
            className="input"
            placeholder="Cari Nama / Kode Satker"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Kode Satker</th>
              <th className="py-3 px-6 text-left">Nama Satker</th>
              <th className="py-3 px-6 text-left">Alamat Satker</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredSatker.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * satkerPerPage + index + 1}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.kode_satker}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_satker}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.alamat_satker}
                </td>
                <td className="py-3 px-6 text-left">
                  <button
                    className="delete"
                    onClick={() => hapusSatker(item && item.id)}
                    title="Hapus"
                  >
                    <MdDelete color="white" />
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

export default DataSatuanKerja;
