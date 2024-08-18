import React, { useEffect, useRef, useState } from "react";
import AddMajelisModal from "../Modal/SariaModal/AddMajelisModal";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoAdd, IoDocument } from "react-icons/io5";
import * as XLSX from "xlsx";
import { useReactToPrint } from "react-to-print";
import MajelisPDF from "../../Export/SariaExport/MajelisPDF";

const MajelisTalim = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataMajelis, setDataMajelis] = useState([]);
  const [filteredDataMajelis, setFilteredDataMajelis] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [majelisPerPage] = useState(50);
  const ComponentToPDF = useRef();

     const printPDF = useReactToPrint({
       content: () => ComponentToPDF.current,
       documentTitle: `DataMajelisTa’lim(saria).pdf`,
     });

  const getMajelis = async () => {
    try {
      const response = await axios.get("http://localhost:5000/majelis");
      setDataMajelis(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMajelis();
  }, []);

  useEffect(() => {
    filterAndPaginateMajelis();
  }, [dataMajelis, searchText, currentPage]);

  const filterAndPaginateMajelis = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = dataMajelis.filter(
      (item) =>
        item.nama_majelis.toLowerCase().includes(lowerCaseSearchText) ||
        item.alamat.toLowerCase().includes(lowerCaseSearchText)
    );

    const indexOfLastMajelis = currentPage * majelisPerPage;
    const indexOfFirstMajelis = indexOfLastMajelis - majelisPerPage;
    const currentMajelis = filtered.slice(
      indexOfFirstMajelis,
      indexOfLastMajelis
    );

    setFilteredDataMajelis(currentMajelis);
  };

  const hapusMajelis = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/majelis/${id}`);
      getMajelis();
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
    const dataToExport = dataMajelis.map((item, index) => ({
      No: index + 1,
      "Nama Majelis": item.nama_majelis,
      Alamat: item.alamat,
      "Tahun Berdiri": item.tahun_berdiri,
      "Nama Pimpinan": item.nama_pimpinan,
      "Jumlah Jamaah": item.jumlah_jamaah,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataMajelis");
    XLSX.writeFile(workbook, "DataMajelis.xlsx");
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dataMajelis.length / majelisPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="contain">
      {openModalAdd && (
        <AddMajelisModal
          setIsOpenModalAdd={setOpenModalAdd}
          getMajelis={getMajelis}
        />
      )}
      <div style={{ display: "none" }}>
        <MajelisPDF ref={ComponentToPDF} majelis={dataMajelis} />
      </div>
      <h1 className="judul">Data Majelis Ta'Lim</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Majelis
          </button>
          <button
            onClick={downloadExcel}
            className="btn-download hidden sm:block"
          >
            Export ke Excel
          </button>
          <button onClick={printPDF} className="btn-pdf hidden sm:block">
            Print PDF
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
          <button onClick={printPDF} className="btn-pdf sm:hidden block">
            <IoDocument color="white" />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <input
            type="text"
            className="input"
            placeholder="Cari Majelis/ Alamat "
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
              <th className="py-3 px-6 text-left">Nama Majelis Ta’lim</th>
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Tahun Berdiri</th>
              <th className="py-3 px-6 text-left">Nama Pimpinan</th>
              <th className="py-3 px-6 text-left">Jumlah Jamaah</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredDataMajelis.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * majelisPerPage + index + 1}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_majelis}
                </td>
                <td className="py-3 px-6 text-left">{item && item.alamat}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.tahun_berdiri}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_pimpinan}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jumlah_jamaah}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="delete"
                    onClick={() => hapusMajelis(item && item.id)}
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

export default MajelisTalim;
