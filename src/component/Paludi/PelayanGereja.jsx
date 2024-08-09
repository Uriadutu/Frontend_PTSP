import React, { useEffect, useState } from "react";
import axios from "axios";import { IoAdd, IoDocument, IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import * as XLSX from "xlsx";
import AddPelayanGerejaModal from "../Modal/PaludiModal/AddPelayanGerejaModal";
import { useNavigate } from "react-router-dom";

const PelayanGereja = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [gereja, setPelayanGereja] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gerejaPerPage] = useState(10);

  const navigate = useNavigate()
  // Fetch data from server
  const getPelayan = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pelayangereja");
      setPelayanGereja(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPelayan();
  }, []);

  // Filter and paginate data
  const filteredGereja = gereja.filter((item) =>
    item.Gereja.nama_gereja.toLowerCase().includes(searchText.toLowerCase())
  );

  const indexOfLastGereja = currentPage * gerejaPerPage;
  const indexOfFirstGereja = indexOfLastGereja - gerejaPerPage;
  const currentGereja = filteredGereja.slice(
    indexOfFirstGereja,
    indexOfLastGereja
  );

  // Delete function
  const hapusGereja = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/pelayangereja/${id}`);
      getPelayan();
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
    const dataToExport = currentGereja.map((item, index) => ({
      No: (currentPage - 1) * gerejaPerPage + index + 1,
      "Nama Gereja": item.Gereja.nama_gereja,
      "Nama Pelayan": item.nama_pelayan,
      "Jenis Kelamin": item.jenis_kelamin,
      "Pendidikan Terakhir": item.pendidikan_terakhir,
      "Jabatan Pelayan": item.jabatan_pelayan,
      "Jabatan BPHJ": item.jabatan_bphj,
      "Jabatan Bidang" : item.jabatan_bidang
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataPelayanGereja");
    XLSX.writeFile(workbook, "DataPelayanGereja.xlsx");
  };

  return (
    <div className="contain">
      {openModalAdd && (
        <AddPelayanGerejaModal
          setIsOpenModalAdd={setOpenModalAdd}
          getPelayanGereja={getPelayan}
          
        />
      )}
      <h1 className="judul">Data Pelayan Gereja</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Pelayan Gereja
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
              <th className="py-3 px-6 text-left">Nama Pelayan</th>
              <th className="py-3 px-6 text-left">Jenis Kelamin</th>
              <th className="py-3 px-6 text-left">Pendidikan Terakhir</th>
              <th className="py-3 px-6 text-left">Jabatan BPHJ</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentGereja.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * gerejaPerPage + index + 1}
                </td>
                <td className="py-3 px-6 text-left">
                  {item.Gereja.nama_gereja}
                </td>
                <td className="py-3 px-6 text-left">{item.nama_pelayan}</td>
                <td className="py-3 px-6 text-left">{item.jenis_kelamin}</td>
                <td className="py-3 px-6 text-left">
                  {item.pendidikan_terakhir}
                </td>
                <td className="py-3 px-6 text-left">{item.jabatan_bphj}</td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="detail"
                    onClick={() => navigate(`/paludi/data-pelayan-gereja/detail/${item && item.id}`)}
                    title="Detail"
                  >
                    <IoEyeSharp color="white" />
                  </button>
                  <button
                    className="delete"
                    onClick={() => hapusGereja(item.id)}
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
          {Array.from(
            { length: Math.ceil(filteredGereja.length / gerejaPerPage) },
            (_, i) => i + 1
          ).map((number) => (
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

export default PelayanGereja;
