import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MdDelete, MdModeEdit } from "react-icons/md";
import EditStatusModal from "../Modal/AkesahuModal/EditStatusModal";
import AddPeriodeModal from "../Modal/AkesahuModal/AddPeriodeModal";
import { useReactToPrint } from "react-to-print";
import { IoAdd, IoDocument } from "react-icons/io5";
import InfoHajiPDF from "../../Export/AkesahuExport/InfoHajiPDF";
import PeriodeHajiPDF from "../../Export/AkesahuExport/PeriodeHajiPDF";

const InfoHaji = () => {
  const [hajis, setHajis] = useState([]);
  const [periodes, setPeriodes] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openPeriode, setOpenPeriode] = useState(false);
  const [selectedHaji, setSelectedHaji] = useState({});
  const [sortBy, setSortBy] = useState("nama_jamaah");
  const [currentPage, setCurrentPage] = useState(1);
  const [hajisPerPage] = useState(50);
  const [activeTab, setActiveTab] = useState("statusKeberangkatan");
  const ComponentToPDF = useRef();
  const PeriodePDF = useRef();

  const printPDF = useReactToPrint({
    content: () => ComponentToPDF.current,
    documentTitle: `InfoHaji(akesahu).pdf`,
  });
  const printPeriodePDF = useReactToPrint({
    content: () => PeriodePDF.current,
    documentTitle: `PeriodeHaji(akesahu).pdf`,
  });

  useEffect(() => {
    getHajis();
    getPeriodes();
  }, []);

  const getHajis = async () => {
    try {
      const response = await axios.get("http://localhost:5000/haji");
      setHajis(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPeriodes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/periode/haji");
      setPeriodes(response.data);
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

  const deletePeriode = async (periodeId) => {
    try {
      await axios.delete(`http://localhost:5000/periode/haji/${periodeId}`);
      getPeriodes();
    } catch (error) {
      console.error("Error:", error);
    }
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
      {openPeriode && (
        <AddPeriodeModal
          getPeriode={getPeriodes}
          setIsOpenModalAdd={setOpenPeriode}
        />
      )}
      <div style={{ display: "none" }}>
        <InfoHajiPDF ref={ComponentToPDF} haji={hajis} />
      </div>
      <div style={{ display: "none" }}>
        <PeriodeHajiPDF ref={PeriodePDF} periode={periodes} />
      </div>
      <h1 className="judul mb-4">Info Haji</h1>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {activeTab === "statusKeberangkatan" && (
            <div className="flex items-center space-x-2">
              <button onClick={printPDF} className="btn-pdf hidden sm:block">
                Print PDF
              </button>
              <label className="text-sm">Urut Berdasarkan:</label>
              <select
                className="input"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="nama_jamaah">Nama</option>
                <option value="nomor_porsi">Nomor Porsi</option>
              </select>

              <button onClick={printPDF} className="btn-pdf sm:hidden block">
                <IoDocument color="white" />
              </button>
            </div>
          )}
          {activeTab === "periode" && (
            <div className="flex items-center gap-2">
              <button
                className="btn-add hidden sm:block"
                onClick={() => setOpenPeriode(true)}
              >
                Tambah Periode
              </button>
              <button
                onClick={() => setOpenPeriode(true)}
                className="btn-add sm:hidden block"
              >
                <IoAdd color="white" />
              </button>
              <button onClick={printPeriodePDF} className="btn-pdf hidden sm:block">
                Print PDF
              </button>
              <button onClick={printPeriodePDF} className="btn-pdf sm:hidden block">
                <IoDocument color="white" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="tabs-container mt-3">
        <div className="tabs">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th>
                  {" "}
                  <button
                    className={`tab ${
                      activeTab === "statusKeberangkatan" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("statusKeberangkatan")}
                  >
                    Status Keberangkatan
                  </button>
                </th>
                <th>
                  <button
                    className={`tab ${activeTab === "periode" ? "active" : ""}`}
                    onClick={() => setActiveTab("periode")}
                  >
                    Periode
                  </button>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {activeTab === "statusKeberangkatan" && (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">No</th>
                  <th className="py-3 px-6 text-left">Nama Jamaah</th>
                  <th className="py-3 px-6 text-left">Nomor Porsi</th>
                  <th className="py-3 px-6 text-left">
                    Tahun Berangkat / Batal
                  </th>
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
                    <td className="py-3 px-6 text-left">
                      {haji.tgl_berangkat}
                    </td>
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
      )}
      {activeTab === "periode" && (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">No</th>
                  <th className="py-3 px-6 text-left">Tanggal</th>
                  <th className="py-3 px-6 text-left">Jumlah Jamaah</th>
                  <th className="py-3 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {periodes.map((periode, index) => (
                  <tr
                    key={periode.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">{index + 1}</td>
                    <td className="py-3 px-6 text-left">{periode.tanggal}</td>
                    <td className="py-3 px-6 text-left">
                      {periode.jumlah_jamaah}
                    </td>
                    <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                      <button
                        className="delete"
                        onClick={() => deletePeriode(periode.id)}
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
        </div>
      )}
    </div>
  );
};

export default InfoHaji;
