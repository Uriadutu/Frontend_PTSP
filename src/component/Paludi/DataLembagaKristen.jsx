import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoAdd, IoDocument, IoEyeSharp } from "react-icons/io5";
import * as XLSX from "xlsx";
import AddLembagaModal from "../Modal/PaludiModal/AddLembagaModal";
import { Link } from "react-router-dom";

const DataLembagaKristen = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);

  const [lembagaKristen, setLembagaKristen] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lembagaPerPage] = useState(10);

  const getLembagaKristen = async () => {
    try {
      const response = await axios.get("http://localhost:5000/lembaga-kristen");
      setLembagaKristen(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusLembaga = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/lembaga-kristen/${id}`);
      getLembagaKristen();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLembagaKristen();
  }, []);

  const filteredLembaga = lembagaKristen.filter((item) =>
    item.nama_lembaga.toLowerCase().includes(searchText.toLowerCase())
  );

  const downloadExcel = () => {
    const dataToExport = filteredLembaga.map((item, index) => ({
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

  const indexOfLastLembaga = currentPage * lembagaPerPage;
  const indexOfFirstLembaga = indexOfLastLembaga - lembagaPerPage;
  const currentLembaga = filteredLembaga.slice(
    indexOfFirstLembaga,
    indexOfLastLembaga
  );

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredLembaga.length / lembagaPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="contain">
      {openModalAdd && (
        <AddLembagaModal
          setIsOpenModalAdd={setOpenModalAdd}
          getLembaga={getLembagaKristen}
        />
      )}
      <h1 className="judul">Data Lembaga Keagamaan</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Lembaga
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
            placeholder="Cari Nama Lembaga"
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
              <th className="py-3 px-6 text-left">Tahun Periode</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentLembaga.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">{item.nama_lembaga}</td>
                <td className="py-3 px-6 text-left">{item.alamat}</td>
                <td className="py-3 px-6 text-left">{item.tahun_berdiri}</td>
                <td className="py-3 px-6 text-left">{item.nama_pimpinan}</td>
                <td className="py-3 px-6 text-left">{item.tahun_periode}</td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <Link className="detail" to={`/paludi/data-lembaga-kristen/detail/${item.id}`}>
                  <IoEyeSharp color="white" />
                  </Link>
                  <button
                    className="delete"
                    onClick={() => hapusLembaga(item.id)}
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

export default DataLembagaKristen;
