import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoAdd, IoDocument, IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import AddSekolahMingguModal from "../Modal/PaludiModal/AddSekolahMingguModal";
import * as XLSX from "xlsx";

const DataSekolahMinggu = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [sekolahMinggu, setSekolahMinggu] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sekolahMingguPerPage] = useState(10);

  const getSekolahMinggu = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sekolahMinggu");
      setSekolahMinggu(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusSekolahMinggu = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/sekolahMinggu/${id}`);
      getSekolahMinggu();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSekolahMinggu();
  }, []);

  const filteredSekolahMinggu = sekolahMinggu.filter((item) =>
    item.nama.toLowerCase().includes(searchText.toLowerCase())
  );

  const downloadExcel = () => {
    const dataToExport = filteredSekolahMinggu.map((item, index) => ({
      No: index + 1,
      Nama: item.nama,
      Lokasi: item.lokasi,
      JumlahSiswa: item.jumlah_siswa,
      "Nama Pengajar": item.nama_pengajar,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataSekolahMinggu");
    XLSX.writeFile(workbook, "DataSekolahMinggu.xlsx");
  };

  const indexOfLastSekolahMinggu = currentPage * sekolahMingguPerPage;
  const indexOfFirstSekolahMinggu =
    indexOfLastSekolahMinggu - sekolahMingguPerPage;
  const currentSekolahMinggu = filteredSekolahMinggu.slice(
    indexOfFirstSekolahMinggu,
    indexOfLastSekolahMinggu
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredSekolahMinggu.length / sekolahMingguPerPage);
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
      {openModalAdd && (
        <AddSekolahMingguModal
          setIsOpenModalAdd={setOpenModalAdd}
          getSekolahMinggu={getSekolahMinggu}
        />
      )}
      <h1 className="judul mb-4">Data Sekolah Minggu</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Sekolah Minggu
          </button>
          <button
            onClick={downloadExcel}
            className="btn-download hidden sm:block"
          >
            Export ke Excel
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
        </div>
        <div className="flex justify-between items-center">
          <input
            type="text"
            className="input"
            placeholder="Cari Nama Sekolah Minggu"
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
              <th className="py-3 px-6 text-left">Nama</th>
              <th className="py-3 px-6 text-left">Lokasi</th>
              <th className="py-3 px-6 text-left">Jumlah Siswa</th>
              <th className="py-3 px-6 text-left">Nama Pengajar</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentSekolahMinggu.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">{item.nama}</td>
                <td className="py-3 px-6 text-left">{item.lokasi}</td>
                <td className="py-3 px-6 text-left">{item.jumlah_siswa}</td>
                <td className="py-3 px-6 text-left">{item.nama_pengajar}</td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <Link
                    to={`/paludi/data-sekolah-minggu/detail/${item.id}`}
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" width={100} />
                  </Link>
                  <button
                    className="delete"
                    onClick={() => hapusSekolahMinggu(item.id)}
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

export default DataSekolahMinggu;
