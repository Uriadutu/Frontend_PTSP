import React, { useEffect, useState } from "react";
import axios from "axios";
import AddJabatanModal from "../Modal/LapasiModal/AddJabatan";
import { MdDelete } from "react-icons/md";
import { IoAdd, IoDocument } from "react-icons/io5";
import * as XLSX from "xlsx";

const DataJabatan = () => {
  const [jabatan, setJabatan] = useState([]);
  const [filteredJabatan, setFilteredJabatan] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jabatanPerPage] = useState(10);

  const getJabatan = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jabatan");
      setJabatan(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJabatan();
  }, []);

  useEffect(() => {
    filterAndPaginateJabatan();
  }, [jabatan, searchText, currentPage]);

  const filterAndPaginateJabatan = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = jabatan.filter(
      (jabatan) =>
        jabatan.nama_jabatan.toLowerCase().includes(lowerCaseSearchText) ||
        jabatan.kode_jabatan.toLowerCase().includes(lowerCaseSearchText)
    );

    const indexOfLastJabatan = currentPage * jabatanPerPage;
    const indexOfFirstJabatan = indexOfLastJabatan - jabatanPerPage;
    const currentJabatan = filtered.slice(
      indexOfFirstJabatan,
      indexOfLastJabatan
    );

    setFilteredJabatan(currentJabatan);
  };

  const hapusJabatan = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/jabatan/${id}`);
      getJabatan();
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
    const dataToExport = jabatan.map((item, index) => ({
      No: index + 1,
      "Kode Jabatan": item.kode_jabatan,
      "Nama Jabatan": item.nama_jabatan,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataJabatan");
    XLSX.writeFile(workbook, "DataJabatan.xlsx");
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(jabatan.length / jabatanPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="contain">
      {openModal && (
        <AddJabatanModal
          getJabatan={getJabatan}
          setIsOpenModalAdd={setOpenModal}
        />
      )}
      <div className="judul">Data Jabatan</div>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModal(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Jabatan
          </button>
          <button
            onClick={downloadExcel}
            className="btn-download hidden sm:block"
          >
            Export ke Excel
          </button>
          <button
            onClick={() => setOpenModal(true)}
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
            placeholder="Cari Nama / Kode Jabatan"
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
              <th className="py-3 px-6 text-left">Kode Jabatan</th>
              <th className="py-3 px-6 text-left">Nama Jabatan</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredJabatan.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * jabatanPerPage + index + 1}
                </td>
                <td className="py-3 px-6 text-left">{item.kode_jabatan}</td>
                <td className="py-3 px-6 text-left">{item.nama_jabatan}</td>
                <td className="py-3 px-6 text-left">
                  <button
                    className="delete"
                    onClick={() => hapusJabatan(item.id)}
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

export default DataJabatan;
