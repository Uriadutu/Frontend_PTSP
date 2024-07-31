import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTanahWakafModal from "../Modal/SahuModal/AddTanahWakafModal";
import { MdDelete } from "react-icons/md";
import { IoAdd, IoDocument } from "react-icons/io5";
import * as XLSX from "xlsx";

const DataTanahWakaf = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataTanah, setDataTanah] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  const getTanah = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tanah-wakaf");
      setDataTanah(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTanah();
  }, []);

  const hapusTanah = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tanah-wakaf/${id}`);
      getTanah();
    } catch (error) {
      console.log(error);
    }
  };

  // Logic for displaying data
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataTanah.slice(indexOfFirstData, indexOfLastData);

  // Pagination logic
  const pageNumbers = Array.from(
    { length: Math.ceil(dataTanah.length / dataPerPage) },
    (_, index) => index + 1
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Export data to Excel
  const downloadExcel = () => {
    const dataToExport = dataTanah.map((item, index) => ({
      No : index + 1,
      "Nama Kecamatan": item.nama_kecamatan,
      "Jenis Wakaf": item.jenis_wakaf,
      "Jenis Tanah": item.jenis_tanah,
      "Luas Tanah": item.luas_tanah,
      "Jumlah Tanah": item.jumlah_wakaf,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataTanahWakaf");
    XLSX.writeFile(workbook, "DataTanahWakaf.xlsx");
  };

  return (
    <div className="container mx-auto p-4">
      {openModal && (
        <AddTanahWakafModal
          setIsOpenModalAdd={setOpenModal}
          getTanahWakaf={getTanah}
        />
      )}
      <h1 className="text-2xl font-semibold mb-4">Data Tanah Wakaf</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModal(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Data Tanah
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
       
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Kecamatan</th>
              <th className="py-3 px-6 text-left">Jenis Wakaf</th>
              <th className="py-3 px-6 text-left">Jenis Tanah</th>
              <th className="py-3 px-6 text-left">Luas Tanah</th>
              <th className="py-3 px-6 text-left">Jumlah Tanah</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentData.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {index + 1 + (currentPage - 1) * dataPerPage}
                </td>
                <td className="py-3 px-6 text-left">{item.nama_kecamatan}</td>
                <td className="py-3 px-6 text-left">{item.jenis_wakaf}</td>
                <td className="py-3 px-6 text-left">{item.jenis_tanah}</td>
                <td className="py-3 px-6 text-left">{item.luas_tanah}</td>
                <td className="py-3 px-6 text-left">{item.jumlah_wakaf}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => hapusTanah(item.id)}
                    title="Hapus"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
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
    </div>
  );
};

export default DataTanahWakaf;
