import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoAdd, IoDocument, IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import AddPenyuluModal from "../Modal/PaludiModal/AddPenyuluModal";
import * as XLSX from "xlsx";

const DataPenyulu = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [penyulus, setPenyulu] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [penyulusPerPage] = useState(10);

  const getPenyulu = async () => {
    try {
      const response = await axios.get("http://localhost:5000/penyulu");
      setPenyulu(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusPenyulu = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/penyulu/${id}`);
      getPenyulu();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPenyulu();
  }, []);

  const filteredPenyulus = penyulus.filter((item) =>
    item.nama.toLowerCase().includes(searchText.toLowerCase())
  );

  const downloadExcel = () => {
    const dataToExport = filteredPenyulus.map((item, index) => ({
      No: index + 1,
      Nama: item.nama,
      "Status Pegawai": item.status_pegawai,
      "Tempat Tugas": item.tempat_tugas,
      "Jumlah Kelompok": item.jumlah_binaan,
      "Nama Kelompok Binaan" : item.KelompokBinaans && item.KelompokBinaans.map((kelompok) => kelompok.nama_kelompok).join(", "),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataPenyulu");
    XLSX.writeFile(workbook, "DataPenyulu.xlsx");
  };

  const indexOfLastPenyulu = currentPage * penyulusPerPage;
  const indexOfFirstPenyulu = indexOfLastPenyulu - penyulusPerPage;
  const currentPenyulus = filteredPenyulus.slice(
    indexOfFirstPenyulu,
    indexOfLastPenyulu
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredPenyulus.length / penyulusPerPage);
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
        <AddPenyuluModal
          setIsOpenModalAdd={setOpenModalAdd}
          getPenyulu={getPenyulu}
        />
      )}
      <h1 className="judul mb-4">Data Penyuluh</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Penyuluh
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
              <th className="py-3 px-6 text-left">Nama</th>
              <th className="py-3 px-6 text-left">Status Pegawai</th>
              <th className="py-3 px-6 text-left">Tempat Tugas</th>
              <th className="py-3 px-6 text-left">Jumlah Kelompok</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentPenyulus.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">{item.nama}</td>
                <td className="py-3 px-6 text-left">{item.status_pegawai}</td>
                <td className="py-3 px-6 text-left">{item.tempat_tugas}</td>
                <td className="py-3 px-6 text-left">{item.jumlah_binaan}</td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <Link
                    to={`/paludi/data-penyulu/detail/${item.id}`}
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" width={100} />
                  </Link>
                  <button
                    className="delete"
                    onClick={() => hapusPenyulu(item.id)}
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

export default DataPenyulu;
 