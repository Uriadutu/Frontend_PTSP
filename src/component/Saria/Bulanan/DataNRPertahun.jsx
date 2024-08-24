import React, { useState, useEffect } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import AddNRModal from "../../Modal/SariaModal/AddNRBulananModal";
import axios from "axios";
import EditNRBulananModal from "../../Modal/SariaModal/EditNRBulananModal";

const DataNRPertahun = () => {
  const [openModalAdd, setIsOpenModalAdd] = useState(false);
  const [openModalEdit, setIsOpenModalEdit] = useState(false);
  const [selectNR, setSelectNR] = useState([]);
  const { no, namaBulan } = useParams();
  const bulanParams = namaBulan + no;
  const [bulanan, setBulanan] = useState([]);

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
    try {
      await axios.delete(`http://localhost:5000/nikahrujuk/${id}`);
      getNR(bulanParams);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setIsOpenModalEdit(true);
    setSelectNR(item);
  };

  useEffect(() => {
    getNR(bulanParams);
  }, [bulanParams]);

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
          onClick={() => setIsOpenModalAdd(true)}
          className="btn-add sm:hidden block"
        >
          <IoAdd color="white" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th rowSpan="2" className="py-3 px-6 text-center border">
                No
              </th>
              <th rowSpan="2" className="py-3 px-6 text-center border">
                Kecamatan
              </th>
              <th rowSpan="2" className="py-3 px-6 text-center border">
                Jumlah Nikah
              </th>
              <th colSpan="2" className="py-3 px-6 text-center border">
                Isbat Nikah
              </th>
              <th colSpan="2" className="py-3 px-6 text-center border">
                Rujuk
              </th>
              <th colSpan="2" className="py-3 px-6 text-center border">
                Tempat Nikah
              </th>
              <th colSpan="2" className="py-3 px-6 text-center border">
                Wali Hakim
              </th>
              <th colSpan="9" className="py-3 px-6 text-center border">
                Nikah
              </th>
              <th colSpan="8" className="py-3 px-6 text-center border">
                Pendidikan Suami/Istri
              </th>
              <th rowSpan="2" className="py-3 px-6 text-center border">
                Total PNBP
              </th>
              <th rowSpan="2" className="py-3 px-6 text-center border">
                Aksi
              </th>
            </tr>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center border">Kantor</th>
              <th className="py-3 px-6 text-center border">Luar Kantor</th>
              <th className="py-3 px-6 text-center border">Hakim</th>
              <th className="py-3 px-6 text-center border">Nasab</th>
              <th className="py-3 px-6 text-center border">Hakim</th>
              <th className="py-3 px-6 text-center border">Nasab</th>
              <th className="py-3 px-6 text-center border">Campuran</th>
              <th className="py-3 px-6 text-center border">Poligami</th>
              <th className="py-3 px-6 text-center border">Pria A</th>
              <th className="py-3 px-6 text-center border">Pria B</th>
              <th className="py-3 px-6 text-center border">Pria C</th>
              <th className="py-3 px-6 text-center border">Wanita A</th>
              <th className="py-3 px-6 text-center border">Wanita B</th>
              <th className="py-3 px-6 text-center border">Wanita C</th>
              <th className="py-3 px-6 text-center border">Suami SD</th>
              <th className="py-3 px-6 text-center border">Istri SD</th>
              <th className="py-3 px-6 text-center border">Suami SMP</th>
              <th className="py-3 px-6 text-center border">Istri SMP</th>
              <th className="py-3 px-6 text-center border">Suami SMA</th>
              <th className="py-3 px-6 text-center border">Istri SMA</th>
              <th className="py-3 px-6 text-center border">Suami S1</th>
              <th className="py-3 px-6 text-center border">Istri S1</th>
              <th className="py-3 px-6 text-center border">Suami S1+</th>
              <th className="py-3 px-6 text-center border">Istri S1+</th>
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
                  {bulandata.hakim}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.nasab}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.campuran}
                </td>
                <td className="py-3 px-6 text-center border">
                  {bulandata.poligami}
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

