import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoAdd, IoDocument } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import * as XLSX from "xlsx";
import AddPenghuluModal from "../Modal/SariaModal/AddPenghuluModal";
import DataPenguhuluPDF from "../../Export/SariaExport/DataPenghuluPDF";
import { useReactToPrint } from "react-to-print";

const DataPenghulu = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [Penghulu, setPenghulu] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [PenghuluPerPage] = useState(50);
  const ComponentToPDF = useRef();

  // Fetch data from server
  const getPenghulu = async () => {
    try {
      const response = await axios.get("http://localhost:5000/penghulu");
      setPenghulu(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPenghulu();
  }, []);

  // Filter and paginate data
  const filteredPenghulu = Penghulu.filter((item) =>
    item.Pegawai.nama_pegawai.toLowerCase().includes(searchText.toLowerCase())
  );

  const indexOfLastPenghulu = currentPage * PenghuluPerPage;
  const indexOfFirstPenghulu = indexOfLastPenghulu - PenghuluPerPage;
  const currentPenghulu = filteredPenghulu.slice(
    indexOfFirstPenghulu,
    indexOfLastPenghulu
  );

  // Delete function
  const hapusPenghulu = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/penghulu/${id}`);
      getPenghulu();
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
    const dataToExport = currentPenghulu.map((item, index) => ({
      No: (currentPage - 1) * PenghuluPerPage + index + 1,

      Kecamatan: item.Kecamatan.nama_kecamatan,
      Desa: item.nama_desa,
      "Jumlah Santri": item.jumlah_santri,
      "Jumlah Santriwati": item.jumlah_santriwati,
      "Jumlah Ustad": item.jumlah_ustad,
      "Jumlah Ustadzah": item.jumlah_ustadzah,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataPenghulu");
    XLSX.writeFile(workbook, "DataPenghulu.xlsx");
  };

   const printPDF = useReactToPrint({
     content: () => ComponentToPDF.current,
     documentTitle: `DataPenghulu(saria).pdf`,
   });
  return (
    <div className="contain">
      {openModalAdd && (
        <AddPenghuluModal
          setIsOpenModalAdd={setOpenModalAdd}
          getPenghulu={getPenghulu}
        />
      )}
      <div style={{ display: "none" }}>
        <DataPenguhuluPDF ref={ComponentToPDF} penghulu={Penghulu} />
      </div>
      <h1 className="judul">Data Penghulu</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModalAdd(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Penghulu
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
              <th className="py-3 px-6 text-left">NIP</th>
              <th className="py-3 px-6 text-left">Nama Penghulu</th>
              <th className="py-3 px-6 text-left">Jabatan</th>
              <th className="py-3 px-6 text-left">Satker</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentPenghulu.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * PenghuluPerPage + index + 1}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.id_pegawai}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.Pegawai && item.Pegawai.nama_pegawai}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.Pegawai && item.Pegawai.jabatan}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.Pegawai && item.Pegawai.satuan_kerja}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="delete"
                    onClick={() => hapusPenghulu(item.id)}
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
            { length: Math.ceil(filteredPenghulu.length / PenghuluPerPage) },
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

export default DataPenghulu;
