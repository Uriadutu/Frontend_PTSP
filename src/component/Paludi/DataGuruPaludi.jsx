import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoDocument, IoEyeSharp } from "react-icons/io5";
import { MdDelete, MdModeEdit } from "react-icons/md";
import * as XLSX from "xlsx";

const DataGuruPaludi = () => {
  const [gurus, setGurus] = useState([]);
  const [sortBy, setSortBy] = useState("nama_guru");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gurusPerPage] = useState(10);

  useEffect(() => {
    getGurus();
  }, []);

  const getGurus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/guru"); // Update URL jika diperlukan
      setGurus(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
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
        await axios.delete(`http://localhost:5000/guru/${guruId}`);
        getGurus();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const downloadExcel = () => {
    const dataToExport = gurus.map((guru, index) => ({
      No: index + 1,
      "Status Pegawai": guru.status_pegawai,
      "Kategori Guru": guru.kategori_guru,
      "Jenis Guru": guru.jenis_guru,
      "Nama Guru": guru.nama_guru,
      "NIP": guru.NIP,
      "Pangkat": guru.pangkat,
      "Jabatan": guru.jabatan,
      "Tempat Tugas": guru.Sekolah && guru.Sekolah.nama_sekolah,
      "Tanggal Mulai": guru.tgl_mulai,
      "Tempat Lahir": guru.tempat_lahir,
      "Tanggal Lahir": guru.tanggal_lahir,
      "Jenis Kelamin": guru.jenis_kelamin,
      "Pendidikan Terakhir": guru.pendidikan_terakhir,
      "Jurusan": guru.juruan,
      "Tahun Lulus": guru.tahun_lulus,
      "No Telepon": guru.no_telp,
      "Email": guru.email,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataGuruPaludi");
    XLSX.writeFile(workbook, "DataGuruPaludi.xlsx");
  };

  const filteredAndSortedGurus = gurus
    .filter((guru) => {
      const lowerCaseSearchText = searchText.toLowerCase();
      return (
        guru.nama_guru.toLowerCase().includes(lowerCaseSearchText) ||
        (guru.NIP && guru.NIP.toLowerCase().includes(lowerCaseSearchText))
      );
    })
    .sort((a, b) => {
      if (sortBy === "nama_guru") {
        return a.nama_guru.localeCompare(b.nama_guru);
      } else if (sortBy === "NIP") {
        const NIPA = a.NIP || "";
        const NIPB = b.NIP || "";
        return NIPA.localeCompare(NIPB);
      }
      return 0;
    });

  const indexOfLastGuru = currentPage * gurusPerPage;
  const indexOfFirstGuru = indexOfLastGuru - gurusPerPage;
  const currentGurus = filteredAndSortedGurus.slice(
    indexOfFirstGuru,
    indexOfLastGuru
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredAndSortedGurus.length / gurusPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="contain">
      <h1 className="judul mb-4">Data Guru Paludi</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={downloadExcel}
            className="btn-download hidden sm:block"
          >
            Export ke Excel
          </button>

          <button
            onClick={downloadExcel}
            className="btn-download sm:hidden block"
          >
            <IoDocument color="white" />
          </button>
          <div className="flex items-center space-x-2">
            <label className="text-sm">Urut Berdasarkan:</label>
            <select
              className="input"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="nama_guru">Nama</option>
              <option value="NIP">NIP</option>
            </select>
          </div>
        </div>
        <input
          type="text"
          className="input"
          placeholder="Cari Nama / NIP"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Guru</th>
              <th className="py-3 px-6 text-left">NIP</th>
              <th className="py-3 px-6 text-left">Status Pegawai</th>
              <th className="py-3 px-6 text-left">Tempat Tugas</th>
              <th className="py-3 px-6 text-left">Kategori Guru</th>
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
                  {capitalizeWords(guru.nama_guru)}
                </td>
                <td className="py-3 px-6 text-left">{guru.NIP}</td>
                <td className="py-3 px-6 text-left">
                  {capitalizeWords(guru.status_pegawai)}
                </td>
                <td className="py-3 px-6 text-left">
                  {capitalizeWords(guru.Sekolah?.nama_sekolah || "")}
                </td>
                <td className="py-3 px-6 text-left">
                  {capitalizeWords(guru.kategori_guru)}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <Link
                    to={`/lapasi/data-guru/detail-guru/${guru.id}`}
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" width={100} />
                  </Link>
                  <button className="edit" title="Edit">
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

export default DataGuruPaludi;
