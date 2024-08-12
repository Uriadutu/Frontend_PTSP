import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import * as XLSX from "xlsx";
import { IoAdd, IoDocument } from "react-icons/io5";
import AddAkademikModal from "../Modal/SidikaModal/AddAkademikModal";

const Akademik = () => {
  const [dataAkademik, setDataAkademik] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false)

  const getAkademik = async () => {
    try {
      const response = await axios.get("http://localhost:5000/akademik");
      setDataAkademik(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAkademik();
  }, []);

  const hapusAkademik = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/akademik/${id}`);
      getAkademik();
    } catch (error) {
      console.log(error);
    }
  };

  const downloadExcel = () => {
    const dataToExport = dataAkademik.map((item, index) => ({
      No: index + 1,
      "Nama Sekolah": item.nama_sekolah,
      "Status Akademik": item.status_akademik,
      "Jumlah Peserta": item.jumlah_peserta,
      Keterangan: item.keterangan,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataAkademik");
    XLSX.writeFile(workbook, "DataAkademik.xlsx");
  };

  const filteredAkademik = dataAkademik.filter((item) => {
    const lowerCaseSearchText = searchText.toLowerCase();
    return (
      item.nama_sekolah.toLowerCase().includes(lowerCaseSearchText) ||
      item.status_akademik.toLowerCase().includes(lowerCaseSearchText) ||
      item.keterangan.toLowerCase().includes(lowerCaseSearchText)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAkademik.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredAkademik.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="contain">
      {openModal && (
        <AddAkademikModal
        getAkademik={getAkademik}
        setIsOpenModalAdd={setOpenModal}/>
      )}
      <h1 className="judul">Pendampingan Akademik</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModal(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Akademik
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
            placeholder="Cari Sekolah atau Status"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Sekolah</th>
              <th className="py-3 px-6 text-left">Status Akademik</th>
              <th className="py-3 px-6 text-left">Jumlah Peserta</th>
              <th className="py-3 px-6 text-left">Keterangan</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentItems.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-3 px-6 text-left">{item.nama_sekolah}</td>
                <td className="py-3 px-6 text-left">{item.status_akademik}</td>
                <td className="py-3 px-6 text-left">{item.jumlah_peserta}</td>
                <td className="py-3 px-6 text-left">{item.keterangan}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="delete"
                    onClick={() => hapusAkademik(item.id)}
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
                onClick={() => paginate(number)}
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

export default Akademik;
