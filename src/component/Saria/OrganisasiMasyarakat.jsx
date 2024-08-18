import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import AddOrganisasiMasyarakatModal from "../Modal/SariaModal/AddOrganisasiModal";
import * as XLSX from "xlsx";
import { IoAdd, IoDocument } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";
import DataOrganisasiMasyarakatPDF from "../../Export/SariaExport/DataOrganisasiMasyarakatPDF";

const OrganisasiMasyarakat = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataOrganisasi, setDataOrganisasi] = useState([]);
  const [filteredDataOrganisasi, setFilteredDataOrganisasi] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [organisasiPerPage] = useState(50);
  const ComponentToPDF = useRef();

  const getOrganisasi = async () => {
    try {
      const response = await axios.get("http://localhost:5000/organisasi-masyarakat");
      const data = response.data;
      if (Array.isArray(data)) {
        setDataOrganisasi(data);
      } else {
        setDataOrganisasi([]);
      }
    } catch (error) {
      console.log(error);
      setDataOrganisasi([]); // Set as an empty array in case of error
    }
  };

  useEffect(() => {
    getOrganisasi();
  }, []);

  const filterAndPaginateOrganisasi = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = dataOrganisasi.filter(
      (item) =>
        item.nama_organisasi.toLowerCase().includes(lowerCaseSearchText) ||
        item.alamat.toLowerCase().includes(lowerCaseSearchText) 
    );

    const indexOfLastOrganisasi = currentPage * organisasiPerPage;
    const indexOfFirstOrganisasi = indexOfLastOrganisasi - organisasiPerPage;
    const currentOrganisasi = filtered.slice(
      indexOfFirstOrganisasi,
      indexOfLastOrganisasi
    );

    setFilteredDataOrganisasi(currentOrganisasi);
  };

  
  useEffect(() => {
    filterAndPaginateOrganisasi();
  }, [dataOrganisasi, searchText, currentPage]);


  const hapusOrganisasi = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/organisasi-masyarakat/${id}`);
      getOrganisasi();
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
    const dataToExport = dataOrganisasi.map((item, index) => ({
      No: index + 1,
      "Nama Organisasi": item.nama_organisasi,
      Alamat: item.alamat,
      "Tahun Berdiri": item.tahun_berdiri,
      "Nama Pimpinan": item.nama_pimpinan,
      "Tahun Periode": item.tahun_periode,
      "Jumlah Anggota": item.jumlah_anggota,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataOrganisasi");
    XLSX.writeFile(workbook, "DataOrganisasi.xlsx");
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dataOrganisasi.length / organisasiPerPage); i++) {
    pageNumbers.push(i);
  }

   const printPDF = useReactToPrint({
     content: () => ComponentToPDF.current,
     documentTitle: `DataOrganisasiMasyarakat(saria).pdf`,
   });

  return (
    <div className="contain">
      {openModalAdd && (
        <AddOrganisasiMasyarakatModal
          setIsOpenModalAdd={setOpenModalAdd}
          getOrganisasiMasyarakat={getOrganisasi}
        />
      )}
      <div style={{ display: "none" }}>
        <DataOrganisasiMasyarakatPDF ref={ComponentToPDF} organisasi={dataOrganisasi} />
      </div>
      <h1 className="judul">Data Organisasi Masyarakat</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Organisasi
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
            placeholder="Cari Organisasi / Alamat"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left text-[12px]">No</th>
              <th className="py-3 px-6 text-left text-[12px]">
                Nama Organisasi
              </th>
              <th className="py-3 px-6 text-left text-[12px]">Alamat</th>
              <th className="py-3 px-6 text-left text-[12px]">Tahun Berdiri</th>
              <th className="py-3 px-6 text-left text-[12px]">Nama Pimpinan</th>
              <th className="py-3 px-6 text-left text-[12px]">Tahun Periode</th>
              <th className="py-3 px-6 text-left text-[12px]">
                Jumlah Anggota
              </th>
              <th className="py-3 px-6 text-left text-[12px]">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredDataOrganisasi.length > 0 ? (
              filteredDataOrganisasi.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">
                    {(currentPage - 1) * organisasiPerPage + index + 1}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {item.nama_organisasi}
                  </td>
                  <td className="py-3 px-6 text-left">{item.alamat}</td>
                  <td className="py-3 px-6 text-left">{item.tahun_berdiri}</td>
                  <td className="py-3 px-6 text-left">{item.nama_pimpinan}</td>
                  <td className="py-3 px-6 text-left">{item.tahun_periode}</td>
                  <td className="py-3 px-6 text-left">{item.jumlah_anggota}</td>
                  <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                    <button
                      className="delete"
                      onClick={() => hapusOrganisasi(item.id)}
                      title="Hapus"
                    >
                      <MdDelete color="white" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-3 px-6 text-center">
                  Tidak ada data
                </td>
              </tr>
            )}
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

export default OrganisasiMasyarakat;
