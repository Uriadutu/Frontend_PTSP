import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import * as XLSX from "xlsx";
import { IoAdd, IoDocument, IoEyeSharp } from "react-icons/io5";
import AddMenejerialModal from "../Modal/SidikaModal/AddMenejerialModal";
import { useReactToPrint } from "react-to-print";
import MenejerialPDF from "../../Export/SidikaExport/MenejerialPDF";
import { Link } from "react-router-dom";

const Menejerial = () => {
  const [dataAkademik, setDataAkademik] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [openModal, setOpenModal] = useState(false)
  const ComponentToPDF = useRef();


  const getAkademik = async () => {
    try {
      const response = await axios.get("http://localhost:5000/menejerial");
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
      await axios.delete(`http://localhost:5000/menejerial/${id}`);
      getAkademik();
    } catch (error) {
      console.log(error);
    }
  };

  const downloadExcel = () => {
    const dataToExport = currentItems.map((item, index) => ({
      No: index + 1,
      NIP: item && item.Pegawai && item.Pegawai.NIP,
      "Nama Pengawas": item && item.Pegawai && item.Pegawai.nama_pegawai,
      "Nama Sekolah": item && item.nama_sekolah,
      "Nama Kepala Sekolah": item && item.nama_kepsek,
      "Bersertifikat": item && item.status_sertifikat,
      "Status Pegawai": item && item.status_pegawai,
      Keterangan: item && item.keterangan,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataAkademik");
    XLSX.writeFile(workbook, "DataMenejerial.xlsx");
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

   const printPDF = useReactToPrint({
     content: () => ComponentToPDF.current,
     documentTitle: `DataPendampinganMenejerial(sidika).pdf`,
   });
  return (
    <div className="contain">
      {openModal && (
        <AddMenejerialModal
          getAkademik={getAkademik}
          setIsOpenModalAdd={setOpenModal}
        />
      )}
      <div style={{ display: "none" }}>
        <MenejerialPDF ref={ComponentToPDF} menejerial={dataAkademik} />
      </div>
      <h1 className="judul">Pendampingan Menejerial</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModal(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Menejerial
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
            placeholder="Cari Sekolah atau Status"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto w-[100%] mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">NIP</th>
              <th className="py-3 px-6 text-left">Nama Pengawas</th>
              <th className="py-3 px-6 text-left">Nama Sekolah</th>
              <th className="py-3 px-6 text-left">Kepala Sekolah</th>
              <th className="py-3 px-6 text-left">Bersertifikat</th>
              <th className="py-3 px-6 text-left">Status Pegawai</th>
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
                <td className="py-3 px-6 text-left">
                  {item && item.Pegawai && item.Pegawai.NIP}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.Pegawai && item.Pegawai.nama_pegawai}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_sekolah}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_kepsek}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.status_sertifikat}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.status_pegawai}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <Link
                    to={`/sidika/data-menejerial/detail/${item.id}`}
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" width={100} />
                  </Link>
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

export default Menejerial;
