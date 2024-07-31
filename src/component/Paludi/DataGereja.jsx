import React, { useEffect, useState } from "react";
import AddGerejaModal from "../Modal/PaludiModal/AddGerejaModal";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoAdd, IoDocument, IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import * as XLSX from "xlsx";

const DataGereja = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [gereja, setGereja] = useState([]);
  const [filteredGereja, setFilteredGereja] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gerejaPerPage] = useState(10);

  // Fetch data from server
  const getGereja = async () => {
    try {
      const response = await axios.get("http://localhost:5000/gereja");
      setGereja(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGereja();
  }, []);

  // Filter and paginate data
  useEffect(() => {
    filterAndPaginateGereja();
  }, [gereja, searchText, currentPage]);

  const filterAndPaginateGereja = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = gereja.filter(
      (item) =>
        item.nama_gereja.toLowerCase().includes(lowerCaseSearchText)
       
    );

    const indexOfLastGereja = currentPage * gerejaPerPage;
    const indexOfFirstGereja = indexOfLastGereja - gerejaPerPage;
    const currentGereja = filtered.slice(indexOfFirstGereja, indexOfLastGereja);

    setFilteredGereja(currentGereja);
  };

  // Delete function
  const hapusGereja = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/gereja/${id}`);
      getGereja();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Export to Excel
  const downloadExcel = () => {
    const dataToExport = filteredGereja.map((item, index) => ({
      No: (currentPage - 1) * gerejaPerPage + index + 1,
      "Nama Gereja": item.nama_gereja,
      "No Tanda Lapor": item.no_lapor,
      "Status Ijin": item.status_ijin,
      "Nomor IBM": item.nomor_ibm,
      "Status Gedung": item.status_gedung,
      "Status Tanah": item.status_tanah,
      "Luas Bangunan": item.luas_bangunan,
      "Luas Tanah": item.luas_tanah,
      "Tahun Berdiri": item.tahun_berdiri,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataGereja");
    XLSX.writeFile(workbook, "DataGereja.xlsx");
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredGereja.length / gerejaPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="contain">
      {openModalAdd && (
        <AddGerejaModal
          setIsOpenModalAdd={setOpenModalAdd}
          getGereja={getGereja}
        />
      )}
      <h1 className="judul">Data Gereja</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Gereja
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
            placeholder="Cari Nama Gereja"
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
              <th className="py-3 px-6 text-left">Status Gedung</th>
              <th className="py-3 px-6 text-left">Status Tanah</th>
              <th className="py-3 px-6 text-left">Tahun Berdiri</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredGereja.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * gerejaPerPage + index + 1}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_gereja}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.status_gedung}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.status_tanah}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.tahun_berdiri}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <Link
                    to={`/paludi/data-gereja/detail/${item.id}`}
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" width={100} />
                  </Link>
                  <button
                    className="delete"
                    onClick={() => hapusGereja(item && item.id)}
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
        <ul className="pagination">
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

export default DataGereja;
