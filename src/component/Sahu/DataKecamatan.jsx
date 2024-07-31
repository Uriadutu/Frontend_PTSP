import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import * as XLSX from "xlsx";
import AddKecamatanModal from "../Modal/SahuModal/AddKecamatanModal";
import { IoAdd, IoDocument } from "react-icons/io5";

const DataKecamatan = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataKec, setKec] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [kecamatanPerPage] = useState(10);


  const getKecamatan = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kecamatan");
      setKec(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKecamatan();
  }, []);

  const hapusKecamatan = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/kecamatan/${id}`);
      getKecamatan();
    } catch (error) {
      console.log(error);
    }
  };

  const downloadExcel = () => {
    const dataToExport = dataKec.map((kec, index) => ({
      No: index + 1,
      "Kode Kecamatan": kec.kode,
      "Nama Kecamatan": kec.nama_kecamatan,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataKecamatan");
    XLSX.writeFile(workbook, "DataKecamatan.xlsx");
  };

  const filteredKecamatan = dataKec.filter((kec) => {
    const lowerCaseSearchText = searchText.toLowerCase();
    return (
      kec.nama_kecamatan.toLowerCase().includes(lowerCaseSearchText) ||
      (kec.kode && kec.kode.toLowerCase().includes(lowerCaseSearchText))
    );
  });

  const indexOfLastKecamatan = currentPage * kecamatanPerPage;
  const indexOfFirstKecamatan = indexOfLastKecamatan - kecamatanPerPage;
  const currentKecamatan = filteredKecamatan.slice(
    indexOfFirstKecamatan,
    indexOfLastKecamatan
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredKecamatan.length / kecamatanPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="contain">
      {openModal && (
        <AddKecamatanModal
          setIsOpenModalAdd={setOpenModal}
          getKecamatan={getKecamatan}
        />
      )}
      <h1 className="judul">Data Kecamatan</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModal(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Kecamatan
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
            placeholder="Cari Nama Kecamatan"
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
              <th className="py-3 px-6 text-left">Kode Kecamatan</th>
              <th className="py-3 px-6 text-left">Nama Kecamatan</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentKecamatan.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {indexOfFirstKecamatan + index + 1}
                </td>
                <td className="py-3 px-6 text-left">{item && item.kode}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_kecamatan}
                </td>

                <td className="py-3 px-6 text-center">
                  <button
                    className="delete"
                    onClick={() => hapusKecamatan(item && item.id)}
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

export default DataKecamatan;
