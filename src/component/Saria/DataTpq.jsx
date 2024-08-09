import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoAdd, IoDocument, IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import * as XLSX from "xlsx";
import AddTpqModal from "../Modal/SariaModal/AddTpqModal";
import { useNavigate } from "react-router-dom";

const DataTpq = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [tpq, setTpq] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tpqPerPage] = useState(10);

  const navigate = useNavigate();

  // Fetch data from server
  const getTpq = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tpq");
      setTpq(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTpq();
  }, []);

  // Filter and paginate data
  const filteredTpq = tpq.filter(
    (item) => (
      item.nama_desa.toLowerCase().includes(searchText.toLowerCase()),
      item.Kecamatan.nama_kecamatan.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const indexOfLastTpq = currentPage * tpqPerPage;
  const indexOfFirstTpq = indexOfLastTpq - tpqPerPage;
  const currentTpq = filteredTpq.slice(indexOfFirstTpq, indexOfLastTpq);

  // Delete function
  const hapusTpq = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tpq/${id}`);
      getTpq();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Export to Excel
  const downloadExcel = () => {
    const dataToExport = currentTpq.map((item, index) => ({
      No: (currentPage - 1) * tpqPerPage + index + 1,

      "Kecamatan": item.Kecamatan.nama_kecamatan,
      "Desa": item.nama_desa,
      "Jumlah Santri": item.jumlah_santri,
      "Jumlah Santriwati": item.jumlah_santriwati,
      "Jumlah Ustad": item.jumlah_ustad,
      "Jumlah Ustadzah": item.jumlah_ustadzah,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataTpq");
    XLSX.writeFile(workbook, "DataTamanPendidikanQuran.xlsx");
  };

  return (
    <div className="contain">
      {openModalAdd && (
        <AddTpqModal setIsOpenModalAdd={setOpenModalAdd} getTpqs={getTpq} />
      )}
      <h1 className="judul">Data TPQ</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah TPQ
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
            placeholder="Cari Nama Kecamatan"
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
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Jumlah Santri</th>
              <th className="py-3 px-6 text-left">Jumlah Santriwati</th>
              <th className="py-3 px-6 text-left">Jumlah Ustadz</th>
              <th className="py-3 px-6 text-left">Jumlah Ustadzah</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentTpq.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * tpqPerPage + index + 1}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.Kecamatan && item.Kecamatan.nama_kecamatan} - {item && item.nama_desa}
                </td>
                <td className="py-3 px-6 text-left">{item && item.jumlah_santri}</td>
                <td className="py-3 px-6 text-left">{item && item.jumlah_santriwati}</td>
                <td className="py-3 px-6 text-left">{item && item.jumlah_ustad}</td>
                <td className="py-3 px-6 text-left">{item && item.jumlah_ustadzah}</td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="delete"
                    onClick={() => hapusTpq(item.id)}
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
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(filteredTpq.length / tpqPerPage) },
            (_, i) => i + 1
          ).map((number) => (
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

export default DataTpq;
