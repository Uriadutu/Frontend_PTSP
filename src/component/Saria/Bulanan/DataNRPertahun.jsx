import React, { useState, useEffect, useRef } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { IoAdd, IoDocument } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import AddNRModal from "../../Modal/SariaModal/AddNRBulananModal";
import axios from "axios";
import EditNRBulananModal from "../../Modal/SariaModal/EditNRBulananModal";
import NRBulananPDF from "../../../Export/SariaExport/NRBulananPDF";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";


const DataNRPertahun = () => {
  const [openModalAdd, setIsOpenModalAdd] = useState(false);
  const [openModalEdit, setIsOpenModalEdit] = useState(false);
  const [selectNR, setSelectNR] = useState([]);
  const { no, namaBulan } = useParams();
  const bulanParams = namaBulan + no;
  const [bulanan, setBulanan] = useState([]);
  const ComponentToPDF = useRef();

    const printPDF = useReactToPrint({
      content: () => ComponentToPDF.current,
      documentTitle: `DataNR(saria).pdf`,
    });

  const navigate = useNavigate();

  const getNR = async (bulan) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/nikahrujuk/bulan/${bulan}`
      );
      setBulanan(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusNR = async (id) => {
    if(window.confirm("Apakah Anda Ingin Menghapus Data Ini?")){
    try {
      await axios.delete(`http://localhost:5000/nikahrujuk/${id}`);
      getNR(bulanParams);
    } catch (error) {
      console.log(error);
    }
  }
  };

  const handleEdit = (item) => {
    setIsOpenModalEdit(true);
    setSelectNR(item);
  };

  useEffect(() => {
    getNR(bulanParams);
  }, [bulanParams]);

   const downloadExcel = () => {
     const dataToExport = bulanan.map((item, index) => ({
       No: index + 1,
       "Nama Kecamatan": item.nama_kecamatan,
       "Jumlah Nikah": item.jumlahNikah,
       "Isbat Nikah": item.isbatNikah,
       Rujuk: item.rujuk,
       "Di Kantor": item.kantor,
       "Di Luar Kantor": item.luarKantor,
       Hakim: item.hakim,
       Nasab: item.nasab,
       Campuran: item.campuran,
       Poligami: item.poligami,
       Pria: item.priaA + item.priaB + item.priaC,
       "Pria <18": item.priaA,
       "Pria 19-21": item.priaB,
       "Pria >21": item.priaC,
       Wanita: item.wanitaA + item.wanitaB + item.wanitaC,
       "Wanita <18": item.wanitaA,
       "Wanita 19-21": item.wanitaB,
       "Wanita >21": item.wanitaC,
       "Suami SD/MI": item.suamiSD,
       "Istri SD/MI": item.istriSD,
       "Suami SMP/MTS": item.suamiSMP,
       "Istri SMP/MTS": item.istriSMP,
       "Suami SMA/MA": item.suamiSMA,
       "Istri SMA/MA": item.istriSMA,
       "Suami S1": item.suamiS1,
       "Istri S1": item.istriS1,
       "Suami S1+": item.suamiS1Plus,
       "Istri S1+": item.istriS1Plus,
       "Total PNBP": item.totalPNBP,
     }));

     // Menghitung total dari setiap kolom numerik
     const totalRow = {
       No: "Total",
       "Nama Kecamatan": "", // Kosongkan kolom ini
       "Jumlah Nikah": dataToExport.reduce(
         (acc, curr) => acc + curr["Jumlah Nikah"],
         0
       ),
       "Isbat Nikah": dataToExport.reduce(
         (acc, curr) => acc + curr["Isbat Nikah"],
         0
       ),
       Rujuk: dataToExport.reduce((acc, curr) => acc + curr["Rujuk"], 0),
       "Di Kantor": dataToExport.reduce(
         (acc, curr) => acc + curr["Di Kantor"],
         0
       ),
       "Di Luar Kantor": dataToExport.reduce(
         (acc, curr) => acc + curr["Di Luar Kantor"],
         0
       ),
       Hakim: dataToExport.reduce((acc, curr) => acc + curr["Hakim"], 0),
       Nasab: dataToExport.reduce((acc, curr) => acc + curr["Nasab"], 0),
       Campuran: dataToExport.reduce((acc, curr) => acc + curr["Campuran"], 0),
       Poligami: dataToExport.reduce((acc, curr) => acc + curr["Poligami"], 0),
       Pria: dataToExport.reduce((acc, curr) => acc + curr["Pria"], 0),
       "Pria <18": dataToExport.reduce(
         (acc, curr) => acc + curr["Pria <18"],
         0
       ),
       "Pria 19-21": dataToExport.reduce(
         (acc, curr) => acc + curr["Pria 19-21"],
         0
       ),
       "Pria >21": dataToExport.reduce(
         (acc, curr) => acc + curr["Pria >21"],
         0
       ),
       Wanita: dataToExport.reduce((acc, curr) => acc + curr["Wanita"], 0),
       "Wanita <18": dataToExport.reduce(
         (acc, curr) => acc + curr["Wanita <18"],
         0
       ),
       "Wanita 19-21": dataToExport.reduce(
         (acc, curr) => acc + curr["Wanita 19-21"],
         0
       ),
       "Wanita >21": dataToExport.reduce(
         (acc, curr) => acc + curr["Wanita >21"],
         0
       ),
       "Suami SD/MI": dataToExport.reduce(
         (acc, curr) => acc + curr["Suami SD/MI"],
         0
       ),
       "Istri SD/MI": dataToExport.reduce(
         (acc, curr) => acc + curr["Istri SD/MI"],
         0
       ),
       "Suami SMP/MTS": dataToExport.reduce(
         (acc, curr) => acc + curr["Suami SMP/MTS"],
         0
       ),
       "Istri SMP/MTS": dataToExport.reduce(
         (acc, curr) => acc + curr["Istri SMP/MTS"],
         0
       ),
       "Suami SMA/MA": dataToExport.reduce(
         (acc, curr) => acc + curr["Suami SMA/MA"],
         0
       ),
       "Istri SMA/MA": dataToExport.reduce(
         (acc, curr) => acc + curr["Istri SMA/MA"],
         0
       ),
       "Suami S1": dataToExport.reduce(
         (acc, curr) => acc + curr["Suami S1"],
         0
       ),
       "Istri S1": dataToExport.reduce(
         (acc, curr) => acc + curr["Istri S1"],
         0
       ),
       "Suami S1+": dataToExport.reduce(
         (acc, curr) => acc + curr["Suami S1+"],
         0
       ),
       "Istri S1+": dataToExport.reduce(
         (acc, curr) => acc + curr["Istri S1+"],
         0
       ),
       "Total PNBP": dataToExport.reduce(
         (acc, curr) => acc + curr["Total PNBP"],
         0
       ),
     };

     // Menambahkan baris total ke dataToExport
     dataToExport.push(totalRow);

     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
     const workbook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(workbook, worksheet, `${bulanParams}`);
     XLSX.writeFile(workbook, `NR${bulanParams}(saria).xlsx`);
   };


  return (
    <div className="contain">
      {openModalAdd && (
        <AddNRModal setIsOpenModalAdd={setIsOpenModalAdd} getNRData={getNR} />
      )}
      {openModalEdit && (
        <EditNRBulananModal
          setIsOpenModalEdit={setIsOpenModalEdit}
          getNRData={getNR}
          initialData={selectNR}
        />
      )}
      <div style={{ display: "none" }}>
        <NRBulananPDF
          ref={ComponentToPDF}
          nrbulanan={bulanan}
          tahun={no}
          bulan={namaBulan}
        />
      </div>
      <h1 className="judul">
        {namaBulan} {no}
      </h1>
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
                rowSpan="3"
                className="py-3 px-6 text-center border border-gray-300"
              >
                No
              </th>
              <th
                rowSpan="3"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Kecamatan
              </th>
              <th
                rowSpan="3"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Jumlah Nikah
              </th>
              <th
                rowSpan="3"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Isbat Nikah
              </th>
              <th
                rowSpan="3"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Rujuk
              </th>
              <th
                colSpan="2"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Tempat Nikah
              </th>
              <th
                colSpan="2"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Wali Hakim
              </th>
              <th
                colSpan="10"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Nikah
              </th>
              <th
                colSpan="10"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Pendidikan Suami/Istri
              </th>
              <th
                rowSpan="3"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Total PNBP
              </th>
              <th
                rowSpan="3"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Aksi
              </th>
            </tr>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th
                rowSpan="2"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Kantor
              </th>
              <th
                rowSpan="2"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Luar Kantor
              </th>
              <th
                rowSpan="2"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Hakim
              </th>
              <th
                rowSpan="2"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Nasab
              </th>
              <th
                rowSpan="2"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Campuran
              </th>
              <th
                rowSpan="2"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Poligami
              </th>
              <th
                colSpan="8"
                className="py-3 px-6 text-center border border-gray-300"
              >
                Bawah Umur
              </th>
              <th
                colSpan={2}
                rowSpan="1"
                className="py-3 px-6 text-center border border-gray-300"
              >
                SD/MI
              </th>
              <th
                rowSpan="1"
                colSpan={2}
                className="py-3 px-6 text-center border border-gray-300"
              >
                SMP/MTS
              </th>
              <th
                colSpan={2}
                rowSpan="1"
                className="py-3 px-6 text-center border border-gray-300"
              >
                SMA/MA
              </th>
              <th
                colSpan={2}
                rowSpan="1"
                className="py-3 px-6 text-center border border-gray-300"
              >
                S1
              </th>
              <th
                colSpan={2}
                rowSpan="1"
                className="py-3 px-6 text-center border border-gray-300"
              >
                S1+
              </th>
            </tr>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center border border-gray-300">
                Pria
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Pria {"<18"}
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Pria {"19-21"}
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Pria {">21"}
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Wanita
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Wanita {"<18"}
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Wanita {"19-21"}
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Wanita {">21"}
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Pria
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Wanita
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Pria
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Wanita
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Pria
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Wanita
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Pria
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Wanita
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Pria
              </th>
              <th className="py-3 px-6 text-center border border-gray-300">
                Wanita
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {bulanan.map((bulandata, index) => (
              <tr
                key={bulandata.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-center border">{index + 1}</td>
                <td className="py-3 px-6 text-left border">
                  {bulandata.nama_kecamatan}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.jumlahNikah}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.isbatNikah}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.rujuk}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.kantor}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.luarKantor}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.nasab}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.hakim}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.campuran}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.poligami}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.priaA + bulandata.priaB + bulandata.priaC}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.priaA}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.priaB}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.priaC}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.wanitaA + bulandata.wanitaB + bulandata.wanitaC}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.wanitaA}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.wanitaB}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.wanitaC}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.suamiSD}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.istriSD}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.suamiSMP}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.istriSMP}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.suamiSMA}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.istriSMA}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.suamiS1}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.istriS1}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.suamiS1Plus}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.istriS1Plus}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.totalPNBP}
                </td>
                <td className="py-3 px-6 text-center border">
                  <div className="flex item-center justify-center gap-2">
                    <button
                      className="edit"
                      title="Edit"
                      onClick={() => handleEdit(bulandata)}
                    >
                      <MdModeEdit color="white" />
                    </button>
                    <button
                      className="delete"
                      title="Delete"
                      onClick={() => hapusNR(bulandata.id)}
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

export default DataNRPertahun;

