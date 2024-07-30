import React, { useEffect, useState } from "react";
import axios from "axios";
import AddKuaModal from "../Modal/SariaModal/AddKuaModal";
import { MdDelete } from "react-icons/md";
import * as XLSX from "xlsx";
import { IoAdd, IoDocument } from "react-icons/io5";

const Kua = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataKua, setDataKua] = useState([]);
  const [filteredDataKua, setFilteredDataKua] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [kuaPerPage] = useState(10);

  const getKua = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kua");
      setDataKua(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusKua = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/kua/${id}`);
      getKua();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKua();
  }, []);

  useEffect(() => {
    filterAndPaginateKua();
  }, [dataKua, searchText, currentPage]);

  const filterAndPaginateKua = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = dataKua.filter(
      (item) =>
        item.nama_kua.toLowerCase().includes(lowerCaseSearchText)
    );

    const indexOfLastKua = currentPage * kuaPerPage;
    const indexOfFirstKua = indexOfLastKua - kuaPerPage;
    const currentKua = filtered.slice(indexOfFirstKua, indexOfLastKua);

    setFilteredDataKua(currentKua);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const downloadExcel = () => {
    const dataToExport = dataKua.map((item, index) => ({
      No: index + 1,
      "Kode Satker": item.kode_satker,
      "Nama KUA": item.nama_kua,
      Alamat: item.alamat,
      "Nama Kepala": item.nama_kepala,
      "Jumlah Pegawai": item.jumlah_pegawai,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataKUA");
    XLSX.writeFile(workbook, "DataKUA.xlsx");
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredDataKua.length / kuaPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="contain">
      {openModalAdd && (
        <AddKuaModal setIsOpenModalAdd={setOpenModalAdd} getKua={getKua} />
      )}
      <h1 className="judul">Data KUA</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah KUA
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
            placeholder="Cari Nama KUA"
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
              <th className="py-3 px-6 text-left">Nama KUA</th>
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Nama Kepala</th>
              <th className="py-3 px-6 text-left">Jumlah Pegawai</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredDataKua.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * kuaPerPage + index + 1}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.kode_satker}
                </td>
                <td className="py-3 px-6 text-left">{item && item.nama_kua}</td>
                <td className="py-3 px-6 text-left">{item && item.alamat}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_kepala}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jumlah_pegawai}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="delete"
                    onClick={() => hapusKua(item && item.id)}
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

export default Kua;
