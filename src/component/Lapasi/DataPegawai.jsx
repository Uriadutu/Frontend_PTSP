import React, { useState, useEffect} from "react";
import AddPegawaiModal from "../Modal/LapasiModal/AddPegawai";
import axios from "axios";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import EditPegawaiModal from "../Modal/LapasiModal/EditPegawaiModal";

const DataPegawai = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModaEdit] = useState(false);
  const [pegawai, setPegawai] = useState([])
  const [selectedPegawai, setSelectedPegawai] = useState({});
  const navigate = useNavigate();

  const getPegawai = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pegawai");
      setPegawai(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  const hapusPegawai = async(id) => {
    try {
      await axios.delete(`http://localhost:5000/pegawai/${id}`)
      getPegawai()
    } catch (error) {
      console.log(error);
    }
  }
  const handleOpenModalEdit = (id) => {
    setOpenModaEdit(true)
    setSelectedPegawai(id)
  }

  useEffect(()=> {
    getPegawai()
  },[])

  return (
    <div className="contain">
      {openModalAdd && (
        <AddPegawaiModal
          setIsOpenModalAdd={setOpenModalAdd}
          getPegawai={getPegawai}
        />
      )}
      {openModalEdit && (
        <EditPegawaiModal
          setIsOpenModalEdit={setOpenModaEdit}
          getPegawai={getPegawai}
          selectedPegawai={selectedPegawai}
        />
      )}

      <h1 className="judul">Data Pegawai</h1>
      <button onClick={() => setOpenModalAdd(true)} className="btn-add">
        Tambah Pegawai
      </button>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Pegawai</th>
              <th className="py-3 px-6 text-left">NIP</th>
              <th className="py-3 px-6 text-left">Pangkat/Golongan</th>
              <th className="py-3 px-6 text-left">Jenis Pegawai</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {pegawai.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_pegawai}
                </td>
                <td className="py-3 px-6 text-left">{item && item.NIP}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.pangkat_gol}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jenis_pegawai}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    onClick={() =>
                      navigate(
                        `/lapasi/data-pegawai/detail-pegawai/${item && item.id}`
                      )
                    }
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" width={100} />
                  </button>
                  <button className="edit" title="Edit" onClick={()=> handleOpenModalEdit(item)}>
                    <MdModeEdit color="white" />
                  </button>
                  <button
                    className="delete"
                    onClick={() => hapusPegawai(item && item.id)}
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
  );
};

export default DataPegawai;
