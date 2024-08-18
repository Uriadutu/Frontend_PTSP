import React, { useEffect, useRef, useState } from "react";
import AddRumahIbadahIslamModal from "../Modal/SariaModal/AddRumahIbadahIslamModal";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoEyeSharp, IoAdd, IoDocument } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import MasjidPDF from "../../Export/SariaExport/MasjidPDF";
import { useReactToPrint } from "react-to-print";

const Masjid = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataMasjid, setDataMasjid] = useState([]);
  const [filteredDataMasjid, setFilteredDataMasjid] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [masjidPerPage] = useState(50);
  const ComponentToPDF = useRef();

  const printPDF = useReactToPrint({
    content: () => ComponentToPDF.current,
    documentTitle: `DataRumahIbadah(saria).pdf`,
  });
  const { sub } = useParams();
  const navigate = useNavigate();

  const getRumahIbadahIslam = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/rumah-ibadah-islam"
      );
      setDataMasjid(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRumahIbadahIslam();
  }, []);

  useEffect(() => {
    filterAndPaginateMasjid();
  }, [dataMasjid, searchText, currentPage]);

  const filterAndPaginateMasjid = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = dataMasjid.filter(
      (item) =>
        item.nama_masjid.toLowerCase().includes(lowerCaseSearchText) ||
        item.alamat.toLowerCase().includes(lowerCaseSearchText) ||
        item.tipologi.toLowerCase().includes(lowerCaseSearchText)
    );

    const indexOfLastMasjid = currentPage * masjidPerPage;
    const indexOfFirstMasjid = indexOfLastMasjid - masjidPerPage;
    const currentMasjid = filtered.slice(indexOfFirstMasjid, indexOfLastMasjid);

    setFilteredDataMasjid(currentMasjid);
  };

  const hapusMasjid = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/rumah-ibadah-islam/${id}`);
      getRumahIbadahIslam();
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
    const dataToExport = dataMasjid.map((item, index) => ({
      No: index + 1,
      "Nama Masjid": item.nama_masjid,
      Alamat: item.alamat,
      Tipologi: item.tipologi,
      "Luas Bangunan": item.luas_bangunan,
      "Tahun Berdiri": item.tahun_berdiri,
      Kecamatan: item.kecamatan,
      "Status Tanah": item.status_tanah,
      "Luas Tanah": item.luas_tanah,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataMasjid");
    XLSX.writeFile(workbook, "DataMasjid.xlsx");
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dataMasjid.length / masjidPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="contain">
      {openModalAdd && (
        <AddRumahIbadahIslamModal
          setIsOpenModalAdd={setOpenModalAdd}
          getRumahIbadah={getRumahIbadahIslam}
        />
      )}
      <div style={{ display: "none" }}>
        <MasjidPDF ref={ComponentToPDF} masjid={dataMasjid} />
      </div>
      <h1 className="judul">Data Rumah Ibadah Islam</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Masjid
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
            placeholder="Cari Nama / Alamat / Tipologi"
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
              <th className="py-3 px-6 text-left">Nama Masjid</th>
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Tipologi</th>
              <th className="py-3 px-6 text-left">Tahun Berdiri</th>
              <th className="py-3 px-6 text-left">Kecamatan</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredDataMasjid.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * masjidPerPage + index + 1}
                </td>
                <td className="py-3 px-6 text-left">{item.nama_masjid}</td>
                <td className="py-3 px-6 text-left">{item.alamat}</td>
                <td className="py-3 px-6 text-left">{item.tipologi}</td>
                <td className="py-3 px-6 text-left">{item.tahun_berdiri}</td>
                <td className="py-3 px-6 text-left">{item.kecamatan}</td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="detail"
                    title="Lihat"
                    onClick={() => navigate(`/${sub}/masjid/detail/${item.id}`)}
                  >
                    <IoEyeSharp color="white" width={100} />
                  </button>
                  <button
                    className="delete"
                    onClick={() => hapusMasjid(item.id)}
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

export default Masjid;
