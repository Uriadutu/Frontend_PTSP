import React, { useEffect, useState } from "react";
import axios from "axios";
import AddZakatModal from "../Modal/SahuModal/AddZakatModal";
import { MdDelete } from "react-icons/md";
import { IoAdd, IoDocument, IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const DataPenerimaZakat = () => {
  const [openModal, setOpenModal] = useState(false);
  const [zakats, setZakat] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  // Fetch data zakat
  const getZakat = async () => {
    try {
      const response = await axios.get("http://localhost:5000/zakat");
      setZakat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch data zakat on component mount
  useEffect(() => {
    getZakat();
  }, []);

  // Delete zakat entry
  const hapusZakat = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/zakat/${id}`);
      getZakat();
    } catch (error) {
      console.log(error);
    }
  };

  // Export data to Excel
  const downloadExcel = () => {
    const dataToExport = zakats.map((item, index) => ({
      No : index + 1,
      "Nama Kecamatan": item.Kecamatan ? item.Kecamatan.nama_kecamatan : "",
      Kategori: item.kategori,
      Sumber: item.sumber,
      "Jumlah Sumber": item.jumlah_sumber,
      Jenis: item.jenis,
      Beras: item.beras,
      Uang: item.uang,
      "Nominal Uang": item.nominal_uang,
      Sedekah: item.sedekah,
      "Jumlah Zakat": item.jumlah_zakat,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataZakat");
    XLSX.writeFile(workbook, "DataZakat.xlsx");
  };

  // Handle search
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredZakat = zakats.filter((item) =>
    item.Kecamatan.nama_kecamatan
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredZakat.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredZakat.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="contain">
      {openModal && (
        <AddZakatModal setIsOpenModalAdd={setOpenModal} getZakat={getZakat} />
      )}
      <h1 className="judul">Data Penerima Dan Penyaluran Zakat</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenModal(true)}
            className="btn-add hidden sm:block"
          >
            Tambah Data Zakat
          </button>
          <button
            onClick={downloadExcel}
            className="btn-download hidden sm:block"
          >
            Export ke Excel
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
              <th className="py-3 px-6 text-left">Nama Kecamatan</th>
              <th className="py-3 px-6 text-left">Kategori Zakat</th>
              <th className="py-3 px-6 text-left">Sumber Zakat</th>
              <th className="py-3 px-6 text-left">Jumlah Sumber Zakat</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentItems.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {item.Kecamatan && item.Kecamatan.nama_kecamatan}
                </td>
                <td className="py-3 px-6 text-left">{item.kategori}</td>
                <td className="py-3 px-6 text-left">{item.sumber}</td>
                <td className="py-3 px-6 text-left">{item.jumlah_sumber}</td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    onClick={() =>
                      navigate(
                        `/sahu/data-penerima-penyaluran-zakat/detail-zakat/${item.id}`
                      )
                    }
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" />
                  </button>
                  <button
                    className="delete"
                    onClick={() => hapusZakat(item.id)}
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

export default DataPenerimaZakat;
