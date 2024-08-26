import React, { useEffect, useRef, useState } from "react";
import { IoAdd, IoDocument } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import AddNRTahunanModal from "../../Modal/SariaModal/AddNRTahunanModal";
import axios from "axios";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import NRTahunanPDF from "../../../Export/SariaExport/NRTahunanPDF";
import * as XLSX from "xlsx";
import EditNRTahunanModal from "../../Modal/SariaModal/EditNRTahunnModal";

const DataNRTahunan = () => {
  const { tahun } = useParams();
  const [openModalAdd, setIsOpenModalAdd] = useState(false);
  const [openModalEdit, setIsOpenModalEdit] = useState(false);
  const [tahunan, setTahunan] = useState([]);
  const navigate = useNavigate();
  const ComponentToPDF = useRef();
  const [selectedData, setSelectedData] = useState([]);

  const printPDF = useReactToPrint({
    content: () => ComponentToPDF.current,
    documentTitle: `DataNRTahunan-20XX(saria).pdf`,
  });

  const downloadExcel = () => {
    const dataToExport = tahunan.map((tahunandata, index) => ({
      No: index + 1,
      "Nama Kecamatan": tahunandata.nama_kecamatan,
      "Di Kantor": tahunandata.di_kantor,
      "Di Luar Kantor": tahunandata.di_luar_kantor,
      "Isbat Nikah": tahunandata.isbat_nikah,
      Cerai: tahunandata.cerai,
      "Total NR": tahunandata.total_nr,
      "Total PNBP": tahunandata.total_pnbp,
    }));

    // Menghitung total dari setiap kolom numerik
    const totalRow = {
      No: "Total",
      "Nama Kecamatan": "", // Kosongkan kolom ini
      "Di Kantor": dataToExport.reduce(
        (acc, curr) => acc + curr["Di Kantor"],
        0
      ),
      "Di Luar Kantor": dataToExport.reduce(
        (acc, curr) => acc + curr["Di Luar Kantor"],
        0
      ),
      "Isbat Nikah": dataToExport.reduce(
        (acc, curr) => acc + curr["Isbat Nikah"],
        0
      ),
      Cerai: dataToExport.reduce((acc, curr) => acc + curr["Cerai"], 0),
      "Total NR": dataToExport.reduce((acc, curr) => acc + curr["Total NR"], 0),
      "Total PNBP": dataToExport.reduce(
        (acc, curr) => acc + curr["Total PNBP"],
        0
      ),
    };

    // Menambahkan baris total ke dataToExport
    dataToExport.push(totalRow);

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, tahun);
    XLSX.writeFile(workbook, `DataNRTahun${tahun}.xlsx`);
  };

  const getNRTahunan = async (year) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/nr-tahunan/tahun/${year}`
      );
      setTahunan(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNRTahunan(tahun);
  }, []);

  const hapusNRTahun = async (id) => {
    if (window.confirm("Apakah Nada Ingin Menghapus Data Ini??")) {
      try {
        await axios.delete(`http://localhost:5000/nr-tahunan/${id}`);
        getNRTahunan(tahun);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (item) => {
    setIsOpenModalEdit(true);
    setSelectedData(item);
  };

  return (
    <div className="contain">
      {openModalAdd && (
        <AddNRTahunanModal
          setIsOpenModalAdd={setIsOpenModalAdd}
          getDataTahunan={getNRTahunan}
        />
      )}

      {openModalEdit && (
        <EditNRTahunanModal
          setIsOpenModalEdit={setIsOpenModalEdit}
          getDataTahunan={getNRTahunan}
          selectedData={selectedData}
        />
      )}
      <div style={{ display: "none" }}>
        <NRTahunanPDF ref={ComponentToPDF} tahunan={tahunan} />
      </div>
      <h1 className="judul">Data NR Tahun {tahun}</h1>
      <div className="flex mb-3 items-center gap-2">
        <button className="btn-back" onClick={() => navigate(-1)}>
          Kembali
        </button>
        <button
          onClick={() => setIsOpenModalAdd(true)}
          className="btn-add hidden sm:block"
        >
          Tambah Data
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
          onClick={() => setIsOpenModalAdd(true)}
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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th
                rowSpan={2}
                className="py-1 px-6 text-center border border-gray-300"
              >
                No
              </th>
              <th
                rowSpan={2}
                className="py-1 px-6 text-center border border-gray-300"
              >
                Nama Kecamatan
              </th>
              <th
                colSpan={4}
                className="py-1 px-6 text-center border border-gray-300"
              >
                Jumlah Peristiwa N/R
              </th>
              <th
                rowSpan={2}
                className="py-1 px-6 text-center border border-gray-300"
              >
                Total N/R
              </th>
              <th
                rowSpan={2}
                className="py-1 px-6 text-center border border-gray-300"
              >
                Total PNBP NR (RP)
              </th>
              <th
                rowSpan={2}
                className="py-1 px-6 text-center border border-gray-300"
              >
                Aksi
              </th>
            </tr>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-1 px-6 text-center border border-gray-300">
                Di Kantor
              </th>
              <th className="py-1 px-6 text-center border border-gray-300">
                Di Luar Kantor
              </th>
              <th className="py-1 px-6 text-center border border-gray-300">
                Isbat Nikah
              </th>
              <th className="py-1 px-6 text-center border border-gray-300">
                Cerai
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {tahunan.map((item, index) => (
              <tr key={item?.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-1 px-6 text-center border">{index + 1}</td>
                <td className="py-1 px-6 text-center border">
                  {item?.nama_kecamatan}
                </td>
                <td className="py-1 px-6 text-center border">
                  {item?.di_kantor}
                </td>
                <td className="py-1 px-6 text-center border">
                  {item?.di_luar_kantor}
                </td>
                <td className="py-1 px-6 text-center border">
                  {item?.isbat_nikah}
                </td>
                <td className="py-1 px-6 text-center border">{item?.cerai}</td>
                <td className="py-1 px-6 text-center border">
                  {item?.total_nr}
                </td>
                <td className="py-1 px-6 text-center border">
                  {item?.total_pnbp}
                </td>

                <td className="py-1 px-6 text-center border">
                  <div className="flex item-center justify-center gap-2">
                    <button
                      className="edit"
                      title="Edit"
                      onClick={() => handleEdit(item)}
                    >
                      <MdModeEdit color="white" />
                    </button>
                    <button
                      className="delete"
                      title="Delete"
                      onClick={() => hapusNRTahun(item?.id)}
                    >
                      <MdDelete color="white" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataNRTahunan;
