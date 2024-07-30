import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import AddDataUmatKristenModal from "../Modal/PaludiModal/AddDataUmatKristenModal";
import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import * as XLSX from "xlsx";
import { IoAdd, IoDocument } from "react-icons/io5";

const DataUmatKristen = () => {
  const [umatKristen, setUmatKristen] = useState([]);
  const [filteredDataUmatKristen, setFilteredDataUmatKristen] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [umatPerPage] = useState(10);
  const [openModalAdd, setOpenModalAdd] = useState(false);

  const getDataUmatKristen = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/data-umat-kristen"
      );
      setUmatKristen(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataUmatKristen();
  }, []);

  useEffect(() => {
    filterAndPaginateUmatKristen();
  }, [umatKristen, searchText, currentPage]);

  const filterAndPaginateUmatKristen = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = umatKristen.filter(
      (item) =>
        item.nama_gereja.toLowerCase().includes(lowerCaseSearchText) ||
        item.nama_pimpinan.toLowerCase().includes(lowerCaseSearchText) ||
        item.demonisasi.toLowerCase().includes(lowerCaseSearchText) ||
        item.nama_desa.toLowerCase().includes(lowerCaseSearchText)
    );

    const indexOfLastUmat = currentPage * umatPerPage;
    const indexOfFirstUmat = indexOfLastUmat - umatPerPage;
    const currentUmat = filtered.slice(indexOfFirstUmat, indexOfLastUmat);

    setFilteredDataUmatKristen(currentUmat);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const downloadExcel = () => {
    const dataToExport = umatKristen.map((item, index) => ({
      No: index + 1,
      "Nama Gereja": item.nama_gereja,
      "Nama Pimpinan Gereja": item.nama_pimpinan,
      Denominasi: item.demonisasi,
      "Jumlah Umat": item.jumlah_umat,
      "Jumlah Pria": item.jumlah_pria,
      "Jumlah Wanita": item.jumlah_wanita,
      "Nama Desa": item.nama_desa,
      Kecamatan: item.kecamatan,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataUmatKristen");
    XLSX.writeFile(workbook, "DataUmatKristen.xlsx");
  };

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredDataUmatKristen.length / umatPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const hapusDataUmatKristen = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/data-umat-kristen/${id}`);
      getDataUmatKristen();
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="contain">
      {openModalAdd && (
        <AddDataUmatKristenModal
          setIsOpenModalAdd={setOpenModalAdd}
          getDataUmatKristen={getDataUmatKristen}
        />
      )}
      <h1 className="judul">Data Umat Kristen</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Data Umat Kristen
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
            placeholder="Cari Nama Gereja, Pimpinan, dll"
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
              <th className="py-3 px-6 text-left">Nama Gereja</th>
              <th className="py-3 px-6 text-left">Nama Pimpinan Gereja</th>
              <th className="py-3 px-6 text-left">Denominasi</th>
              <th className="py-3 px-6 text-left">Jumlah Umat</th>
              <th className="py-3 px-6 text-left">Jumlah Pria</th>
              <th className="py-3 px-6 text-left">Jumlah Wanita</th>
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredDataUmatKristen.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * umatPerPage + index + 1}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_gereja}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_pimpinan}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.demonisasi}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jumlah_umat}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jumlah_pria}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jumlah_wanita}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_desa} - {item && item.kecamatan}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <Link
                    to={`/paludi/data-umat-kristen/detail/${item.id}`}
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" />
                  </Link>
                  <button
                    className="delete"
                    onClick={() => hapusDataUmatKristen(item && item.id)}
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

export default DataUmatKristen;
