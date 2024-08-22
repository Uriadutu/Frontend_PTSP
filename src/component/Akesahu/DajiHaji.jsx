import React, { useEffect, useRef, useState } from "react";
import AddHajiModal from "../Modal/AkesahuModal/AddHajiModal";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoAdd, IoDocument, IoEyeSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { useReactToPrint } from "react-to-print";
import DataHajiPDF from "../../Export/AkesahuExport/DataHajiPDF";

const DataHaji = () => {
  const [openModal, setOpenModal] = useState(false);
  const [hajis, setHaji] = useState([]);
  const [filteredHajis, setFilteredHajis] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hajiPerPage] = useState(50);
  const navigate = useNavigate();
  const { sub } = useParams();
  const ComponentToPDF = useRef();

  const printPDF = useReactToPrint({
    content: () => ComponentToPDF.current,
    documentTitle: `DataHaji(akesahu).pdf`,
  });

  useEffect(() => {
    getHaji();
  }, []);

  useEffect(() => {
    filterAndPaginateHaji();
  }, [hajis, searchText, currentPage]);

  const getHaji = async () => {
    try {
      const response = await axios.get("http://localhost:5000/haji");
      setHaji(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterAndPaginateHaji = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = hajis.filter(
      (haji) =>
        haji.nama_jamaah.toLowerCase().includes(lowerCaseSearchText) ||
        haji.nomor_porsi.toLowerCase().includes(lowerCaseSearchText)
    );

    const indexOfLastHaji = currentPage * hajiPerPage;
    const indexOfFirstHaji = indexOfLastHaji - hajiPerPage;
    const currentHaji = filtered.slice(indexOfFirstHaji, indexOfLastHaji);

    setFilteredHajis(currentHaji);
  };

  const hapusHaji = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/haji/${id}`);
      getHaji();
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
    // Pilih field yang diinginkan dan ganti nama kolom
    const dataToExport = hajis.map((item, index) => ({
      No: index + 1,
      "Nomor Porsi": item.nomor_porsi,
      "Tanggal Daftar": item.tanggal_porsi,
      "Nama Jamaah": item.nama_jamaah,
      "Jenis Kelamin": item.jenis_kelamin,
      Pekerjaan: item.pekerjaan,
      "Tempat Lahir": item.tempat_lahir,
      "Tanggal Lahir": item.tanggal_lahir,
      "Nama Desa": item.nama_desa,
      Kecamatan: item.kecamatan,
      Bank: item.bank,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataHaji");
    XLSX.writeFile(workbook, "DataHaji.xlsx");
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(hajis.length / hajiPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="contain">
      {openModal && (
        <AddHajiModal setIsOpenModalAdd={setOpenModal} getHaji={getHaji} />
      )}
      <div style={{ display: "none" }}>
        <DataHajiPDF ref={ComponentToPDF} haji={hajis} />
      </div>

      <h1 className="judul">Data Haji</h1>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModal(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Data Haji
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
          <button onClick={printPDF} className="btn-pdf sm:hidden block">
            <IoDocument color="white" />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <input
            type="text"
            className="input"
            placeholder="Cari Nama / Nomor Porsi"
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
              <th className="py-3 px-6 text-left">Nomor Porsi</th>
              <th className="py-3 px-6 text-left">Nama Jamaah</th>
              <th className="py-3 px-6 text-left">Kecamatan - Desa</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredHajis.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * hajiPerPage + index + 1}
                </td>
                <td className="py-3 px-6 text-left">{item.nomor_porsi}</td>
                <td className="py-3 px-6 text-left">{item.nama_jamaah}</td>
                <td className="py-3 px-6 text-left">
                  {item.kecamatan} - {item.nama_desa}
                </td>
                <td className="py-3 px-6 text-center flex justify-center">
                  <button
                    onClick={() =>
                      navigate(`/${sub}/data-haji/detail/${item.id}`)
                    }
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" width={100} />
                  </button>
                  <button
                    className="delete"
                    onClick={() => hapusHaji(item.id)}
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

export default DataHaji;
