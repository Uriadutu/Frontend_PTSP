import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoAdd, IoDocument } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import * as XLSX from "xlsx";
import AddPengawasModal from "../Modal/SidikaModal/AddPengawasModal";
import { useNavigate } from "react-router-dom";

const PetaKepengawasan = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [pengawas, setPengawas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pengawasPerPage] = useState(10);

  const navigate = useNavigate();

  // Fetch data from server
  const getPengawas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/peta");
      setPengawas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPengawas();
  }, []);

  // Filter and paginate data
  const filteredPengawas = pengawas.filter(
    (item) =>
      // item.wilayah_pengawas.toLowerCase().includes(searchText.toLowerCase()) ||
      item.Pegawai.nama_pegawai.toLowerCase().includes(searchText.toLowerCase())
  );

  const indexOfLastPengawas = currentPage * pengawasPerPage;
  const indexOfFirstPengawas = indexOfLastPengawas - pengawasPerPage;
  const currentPengawas = filteredPengawas.slice(
    indexOfFirstPengawas,
    indexOfLastPengawas
  );

  // Delete function
  const hapusPengawas = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/peta/${id}`);
      getPengawas();
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
    const dataToExport = currentPengawas.map((item, index) => ({
      No: (currentPage - 1) * pengawasPerPage + index + 1,
      "Nama Pegawai": item.Pegawai.nama_pegawai,
      "Jenis Pengawas": item.jenis_pengawas,
      "Wilayah Pengawas": item.wilayah_pengawas,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataPengawas");
    XLSX.writeFile(workbook, "DataPengawas.xlsx");
  };

  return (
    <div className="contain">
      {openModalAdd && (
        <AddPengawasModal
          setIsOpenModalAdd={setOpenModalAdd}
          getDataPengawas={getPengawas}
        />
      )}
      <h1 className="judul">Peta Kepengawasan</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Pengawas
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
            placeholder="Cari Nama Pegawai/Wilayah"
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
              <th className="py-3 px-6 text-left">Nama Pegawai</th>
              <th className="py-3 px-6 text-left">Jenis Pengawas</th>
              <th className="py-3 px-6 text-left">Wilayah Pengawas</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentPengawas.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * pengawasPerPage + index + 1}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.Pegawai && item.Pegawai.nama_pegawai}
                </td>
                <td className="py-3 px-6 text-left">{item.jenis_pengawas}</td>
                <td className="py-3 px-6 text-left">{item.wilayah_pengawas}</td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="delete"
                    onClick={() => hapusPengawas(item.id)}
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
            { length: Math.ceil(filteredPengawas.length / pengawasPerPage) },
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

export default PetaKepengawasan;
