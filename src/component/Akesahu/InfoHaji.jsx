import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete, MdModeEdit } from "react-icons/md";
import EditStatusModal from "../Modal/AkesahuModal/EditStatusModal";

const InfoHaji = () => {
  const [hajis, setHajis] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedHaji, setSelectedHaji] = useState({});
  const [sortBy, setSortBy] = useState("nama_jamaah");
  const [currentPage, setCurrentPage] = useState(1);
  const [hajisPerPage] = useState(10);

  useEffect(() => {
    getHajis();
  }, []);

  const getHajis = async () => {
    try {
      const response = await axios.get("http://localhost:5000/haji");
      setHajis(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const deleteHaji = async (hajiId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data haji ini?")) {
      try {
        await axios.delete(`http://localhost:5000/haji/${hajiId}`);
        getHajis();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleEditHaji = (item) => {
    setOpenModalEdit(true);
    setSelectedHaji(item);
  };

  const filteredAndSortedHajis = hajis.sort((a, b) => {
    if (sortBy === "nama_jamaah") {
      return a.nama_jamaah.localeCompare(b.nama_jamaah);
    } else if (sortBy === "nomor_porsi") {
      return a.nomor_porsi.localeCompare(b.nomor_porsi);
    }
    return 0;
  });

  const indexOfLastHaji = currentPage * hajisPerPage;
  const indexOfFirstHaji = indexOfLastHaji - hajisPerPage;
  const currentHajis = filteredAndSortedHajis.slice(
    indexOfFirstHaji,
    indexOfLastHaji
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredAndSortedHajis.length / hajisPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="contain">
      {openModalEdit && (
        <EditStatusModal
        getHaji={getHajis}
        setIsOpenModalEdit={setOpenModalEdit}
        hajiData={selectedHaji}
        
        />
      )}
      <h1 className="judul mb-4">Data Haji</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm ">Urut Berdasarkan:</label>
            <select
              className="input"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="nama_jamaah">Nama</option>
              <option value="nomor_porsi">Nomor Porsi</option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Jamaah</th>
              <th className="py-3 px-6 text-left">Nomor Porsi</th>
              <th className="py-3 px-6 text-left">Tahun Berangkat</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentHajis.map((haji, index) => (
              <tr
                key={haji.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">{haji.nama_jamaah}</td>
                <td className="py-3 px-6 text-left">{haji.nomor_porsi}</td>
                <td className="py-3 px-6 text-left">{haji.tgl_berangkat}</td>
                <td className="py-3 px-6 text-left">
                  {haji.status_keberangkatan}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="edit"
                    title="Edit"
                    onClick={() => handleEditHaji(haji)}
                  >
                    <MdModeEdit color="white" />
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteHaji(haji.id)}
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

export default InfoHaji;
