import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoDocument, IoEyeSharp } from "react-icons/io5";
import { MdDelete, MdModeEdit } from "react-icons/md";
import * as XLSX from "xlsx";
import { useReactToPrint } from "react-to-print";
import EditTenagaKependidikanModal from "../Modal/PantaiDisaModal/EditTenagaKependidikanModal";
import TenagaKependidikanPDF from "../../Export/PantaiDisaExport/TenagaKependidikanPDF";

const DataTenagaKependidikan = () => {
  const [gurus, setGurus] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gurusPerPage, setGuruPerPage] = useState(10);
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [selectedGuru, setSelectGuru] = useState([])
  const ComponentToPDF = useRef();


  useEffect(() => {
    getGurus();
  }, []);

  const getGurus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tenaga");
      setGurus(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  function capitalizeWords(sentence) {
    return sentence
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const deleteGuru = async (guruId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus guru ini?")) {
      try {
        await axios.delete(`http://localhost:5000/tenaga/${guruId}`);
        getGurus();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleEdit = (item) => {
    setSelectGuru(item)
    setOpenModalEdit(true)
  }
  const downloadExcel = () => {
    const dataToExport = gurus.map((guru, index) => ({
      No: index + 1,
      "Tempat Tugas": guru.Sekolah && guru.Sekolah.nama_sekolah,
      NIP: guru.NIP,
      "Nama Tenaga Kependidikan": guru.nama_tenaga,
      "Status Pegawai": guru.status_pegawai,
      Pangkat: guru.pangkat,
      Jabatan: guru.jabatan,
      "Tanggal Mulai": guru.tgl_mulai,
      "Tempat Lahir": guru.tempat_lahir,
      "Tanggal Lahir": guru.tanggal_lahir,
      "Jenis Kelamin": guru.jenis_kelamin,
      Agama: guru.agama,
      "Pendidikan Terakhir": guru.pendidikan_terakhir,
      Jurusan: guru.juruan,
      "Tahun Lulus": guru.tahun_lulus,
      "No Telepon": guru.no_telp,
      Email: guru.email,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataTenagaKependidikan");
    XLSX.writeFile(workbook, "DataTenagaKependidikan(pantaidisa).xlsx");
  };

  const filteredGurus = gurus.filter((guru) => {
    const lowerCaseSearchText = searchText.toLowerCase();
    return (
      guru.nama_tenaga.toLowerCase().includes(lowerCaseSearchText) ||
      (guru.NIP && guru.NIP.toLowerCase().includes(lowerCaseSearchText))
    );
  });

  const indexOfLastGuru = currentPage * gurusPerPage;
  const indexOfFirstGuru = indexOfLastGuru - gurusPerPage;
  const currentGurus = filteredGurus.slice(indexOfFirstGuru, indexOfLastGuru);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredGurus.length / gurusPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const printPDF = useReactToPrint({
    content: () => ComponentToPDF.current,
    documentTitle: `DataTenagaKependidikan(PantaiDisa).pdf`,
  });



  return (
    <div className="contain">
      <div style={{ display: "none" }}>
        <TenagaKependidikanPDF ref={ComponentToPDF} guru={gurus} />
      </div>
      {openModalEdit && (
        <EditTenagaKependidikanModal
          setIsOpenModalEdit={setOpenModalEdit}
          selectedGuru={selectedGuru}
          getGuru={getGurus}
        />
      )}
      <h1 className="judul mb-4">Data Guru</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
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
            onClick={downloadExcel}
            className="btn-download sm:hidden block"
          >
            <IoDocument color="white" />
          </button>
          <button onClick={printPDF} className="btn-pdf sm:hidden block">
            <IoDocument color="white" />
          </button>
        </div>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            className="input"
            placeholder="Cari Nama / NIP"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select
            value={gurusPerPage}
            onChange={(e) => {
              setGuruPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="p-2 border border-gray-300 rounded"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Tenaga Kependidikan</th>
              <th className="py-3 px-6 text-left">NIP</th>
              <th className="py-3 px-6 text-left">Status Pegawai</th>
              <th className="py-3 px-6 text-left">Tempat Tugas</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentGurus.map((guru, index) => (
              <tr
                key={guru.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {capitalizeWords(guru.nama_tenaga)}
                </td>
                <td className="py-3 px-6 text-left">{guru.NIP}</td>
                <td className="py-3 px-6 text-left">
                  {capitalizeWords(guru.status_pegawai)}
                </td>
                <td className="py-3 px-6 text-left">
                  {capitalizeWords(guru.Sekolah?.nama_sekolah || "")}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <Link
                    to={`/pantai-disa/data-tenaga-kependidikan/detail-tenaga-kependidikan/${guru.id}`}
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" width={100} />
                  </Link>
                  <button
                    className="edit"
                    title="Edit"
                    onClick={() => handleEdit(guru)}
                  >
                    <MdModeEdit color="white" />
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteGuru(guru.id)}
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

export default DataTenagaKependidikan;
