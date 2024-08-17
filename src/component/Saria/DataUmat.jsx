import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AddUmatIslamModal from "../Modal/SariaModal/AddUmatIslamModal";
import { MdDelete } from "react-icons/md";
import { IoAdd, IoDocument } from "react-icons/io5";
import * as XLSX from "xlsx";
import { useReactToPrint } from "react-to-print";
import DataUmatSariaPDF from "../../Export/SariaExport/DataUmatSariaPDF";

const DataUmat = () => {
  const [dataIslam, setDataIslam] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(50);
  const ComponentToPDF = useRef();

  const getUmatIslam = async () => {
    try {
      const response = await axios.get("http://localhost:5000/umat-islam");
      setDataIslam(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUmatIslam();
  }, []);

  useEffect(() => {
    filterAndPaginateData();
  }, [dataIslam, searchText, currentPage]);

  const filterAndPaginateData = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = dataIslam.filter(
      (item) =>
        item.kecamatan.toLowerCase().includes(lowerCaseSearchText) ||
        item.nama_desa.toLowerCase().includes(lowerCaseSearchText)
    );

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = filtered.slice(indexOfFirstData, indexOfLastData);

    setFilteredData(currentData);
  };

  const hapusUmat = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/umat-islam/${id}`);
      getUmatIslam();
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
    const dataToExport = dataIslam.map((item, index) => ({
      No: index + 1,
      Kecamatan: item.kecamatan,
      "Nama Desa": item.nama_desa,
      "Jumlah Penduduk": item.jumlah_penduduk,
      "Jumlah Aliran": item.jumlah_aliran,
      "Jumlah Penduduk Islam": item.jumlah_penduduk_islam,
      "Jumlah Masjid": item.jumlah_mesjid,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataUmat");
    XLSX.writeFile(workbook, "DataUmat.xlsx");
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dataIslam.length / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  const printPDF = useReactToPrint({
    content: () => ComponentToPDF.current,
    documentTitle: `DataUmat(akesahu).pdf`,
  });

  return (
    <div className="contain">
      {openModalAdd && (
        <AddUmatIslamModal
          setIsOpenModalAdd={setOpenModalAdd}
          getUmatIslam={getUmatIslam}
        />
      )}
      <div style={{ display: "none" }}>
        <DataUmatSariaPDF ref={ComponentToPDF} umat={dataIslam} />
      </div>
      <h1 className="judul">Data Umat</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Umat Islam
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
            placeholder="Cari Kecamatan / Nama Desa"
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
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Jumlah Penduduk</th>
              <th className="py-3 px-6 text-left">Jumlah Aliran</th>
              <th className="py-3 px-6 text-left">Penduduk Islam </th>
              <th className="py-3 px-6 text-left">Jumlah Masjid</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * dataPerPage + index + 1}
                </td>
                <td className="py-3 px-6 text-left">
                  {item.kecamatan} - {item.nama_desa}
                </td>
                <td className="py-3 px-6 text-left">{item.jumlah_penduduk}</td>
                <td className="py-3 px-6 text-left">{item.jumlah_aliran}</td>
                <td className="py-3 px-6 text-left">
                  {item.jumlah_penduduk_islam}
                </td>
                <td className="py-3 px-6 text-left">{item.jumlah_mesjid}</td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="delete"
                    onClick={() => hapusUmat(item.id)}
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

export default DataUmat;
