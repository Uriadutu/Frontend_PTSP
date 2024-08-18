import React, { useEffect, useState, useRef } from 'react';
import AddLembagaKeagamaanModal from '../Modal/SariaModal/AddLembagaKeagamaanModal';
import { MdDelete } from 'react-icons/md';
import { IoAdd, IoDocument, IoEyeSharp } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { useReactToPrint } from 'react-to-print';
import LembagaSariaPDF from '../../Export/SariaExport/LembagaSariaPDF';

const LembagaKeagamaan = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataLembaga, setDataLembaga] = useState([]);
  const [filteredDataLembaga, setFilteredDataLembaga] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lembagaPerPage] = useState(50);
  const ComponentToPDF = useRef();

  const { sub } = useParams();
  const navigate = useNavigate();

  const getLembaga = async () => {
    try {
      const response = await axios.get("http://localhost:5000/lembaga-keagamaan");
      setDataLembaga(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusLembaga = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/lembaga-keagamaan/${id}`);
      getLembaga();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLembaga();
  }, []);

  useEffect(() => {
    filterAndPaginateLembaga();
  }, [dataLembaga, searchText, currentPage]);

  const filterAndPaginateLembaga = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = dataLembaga.filter(
      (item) =>
        item.nama_lembaga.toLowerCase().includes(lowerCaseSearchText) ||
        item.alamat.toLowerCase().includes(lowerCaseSearchText) ||
        item.nama_pimpinan.toLowerCase().includes(lowerCaseSearchText)
    );

    const indexOfLastLembaga = currentPage * lembagaPerPage;
    const indexOfFirstLembaga = indexOfLastLembaga - lembagaPerPage;
    const currentLembaga = filtered.slice(indexOfFirstLembaga, indexOfLastLembaga);

    setFilteredDataLembaga(currentLembaga);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const downloadExcel = () => {
    const dataToExport = dataLembaga.map((item, index) => ({
      No: index + 1,
      "Nama Lembaga": item.nama_lembaga,
      Alamat: item.alamat,
      "Tahun Berdiri": item.tahun_berdiri,
      "Nama Pimpinan": item.nama_pimpinan,
      "Tahun Periode": item.tahun_periode,
      "Jumlah Bidang": item.jumlah_bidang,
      "Jumlah Anggota": item.jumlah_anggota,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataLembaga");
    XLSX.writeFile(workbook, "DataLembaga.xlsx");
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredDataLembaga.length / lembagaPerPage); i++) {
    pageNumbers.push(i);
  }

   const printPDF = useReactToPrint({
     content: () => ComponentToPDF.current,
     documentTitle: `DataLembagaKeagamaan(saria).pdf`,
   });

  return (
    <div className="contain">
      {openModalAdd && (
        <AddLembagaKeagamaanModal
          setIsOpenModalAdd={setOpenModalAdd}
          getLembagaKeagamaan={getLembaga}
        />
      )}
      <div style={{ display: "none" }}>
        <LembagaSariaPDF ref={ComponentToPDF} lembaga={dataLembaga} />
      </div>
      <h1 className="judul">Data Lembaga Keagamaan</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Lembaga Keagamaan
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
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Lembaga</th>
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Tahun Berdiri</th>
              <th className="py-3 px-6 text-left">Nama Pimpinan</th>
              <th className="py-3 px-6 text-left">Jumlah Bidang</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredDataLembaga.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * lembagaPerPage + index + 1}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_lembaga}
                </td>
                <td className="py-3 px-6 text-left">{item && item.alamat}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.tahun_berdiri}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_pimpinan}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jumlah_bidang}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="detail"
                    title="Lihat"
                    onClick={() =>
                      navigate(`/${sub}/lembaga-keagamaan/detail/${item.id}`)
                    }
                  >
                    <IoEyeSharp color="white" width={100} />
                  </button>
                  <button
                    className="delete"
                    onClick={() => hapusLembaga(item && item.id)}
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

export default LembagaKeagamaan;
