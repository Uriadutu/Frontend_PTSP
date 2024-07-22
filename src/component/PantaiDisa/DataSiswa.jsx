import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete, MdModeEdit } from "react-icons/md";

const DataSiswa = () => {
  const [siswas, setSiswas] = useState([]);
  const [sortBy, setSortBy] = useState("nama_siswa");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [siswasPerPage] = useState(10);

  useEffect(() => {
    getSiswas();
  }, []);

  const getSiswas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/siswa");
      setSiswas(response.data);
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

  const deleteSiswa = async (siswaId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus siswa ini?")) {
      try {
        await axios.delete(`http://localhost:5000/siswa/${siswaId}`);
        getSiswas();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const filteredAndSortedSiswas = siswas
    .filter((siswa) => {
      const lowerCaseSearchText = searchText.toLowerCase();
      return (
        siswa.nama_siswa.toLowerCase().includes(lowerCaseSearchText) ||
        (siswa.NISN && siswa.NISN.toLowerCase().includes(lowerCaseSearchText))
      );
    })
    .sort((a, b) => {
      if (sortBy === "nama_siswa") {
        return a.nama_siswa.localeCompare(b.nama_siswa);
      } else if (sortBy === "NISN") {
        const NISNA = a.NISN || "";
        const NISNB = b.NISN || "";
        return NISNA.localeCompare(NISNB);
      }
      return 0;
    });

  const indexOfLastSiswa = currentPage * siswasPerPage;
  const indexOfFirstSiswa = indexOfLastSiswa - siswasPerPage;
  const currentSiswas = filteredAndSortedSiswas.slice(
    indexOfFirstSiswa,
    indexOfLastSiswa
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredAndSortedSiswas.length / siswasPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="contain">
      <h1 className="judul mb-4">Data Siswa</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm">Urut Berdasarkan:</label>
            <select
              className="input"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="nama_siswa">Nama</option>
              <option value="NISN">NISN</option>
            </select>
          </div>
        </div>
        <input
          type="text"
          className="input"
          placeholder="Cari Nama / NISN"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Siswa</th>
              <th className="py-3 px-6 text-left">NISN</th>
              <th className="py-3 px-6 text-left">Asal Sekolah</th>
              <th className="py-3 px-6 text-left">Jenjang</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentSiswas.map((siswa, index) => (
              <tr
                key={siswa.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {capitalizeWords(siswa.nama_siswa)}
                </td>
                <td className="py-3 px-6 text-left">{siswa.NISN}</td>
                <td className="py-3 px-6 text-left">{siswa && siswa.Sekolah && siswa.Sekolah.nama_sekolah}</td>
                <td className="py-3 px-6 text-left">
                  {siswa.jenjang_sekolah}
                </td>
                <td className="py-3 px-6 text-left">{capitalizeWords(siswa && siswa.Sekolah && siswa.Sekolah.s_sekolah)}</td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <Link
                    to={`/lapasi/data-siswa/detail-siswa/${siswa.id}`}
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
                    onClick={() => deleteSiswa(siswa.id)}
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

export default DataSiswa;
