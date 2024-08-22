import React, { useEffect, useState } from "react";
import AddGuruModal from "../../Modal/PantaiDisaModal/AddGuruModal";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete, MdModeEdit } from "react-icons/md";
import EditGuruModal from "../../Modal/PantaiDisaModal/EditGuruModal";

const ListGuru = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [gurus, setGuru] = useState([]);
  const navigate = useNavigate();  
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedGuru, setSelectGuru] = useState([]);
  const { idsekolah } = useParams();

   const handleEdit = (item) => {
     setSelectGuru(item);
     setOpenModalEdit(true);
   };

  useEffect(() => {
    getGuruBySekolah(idsekolah);
  }, [idsekolah]);
  const getGuruBySekolah = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/guru/sekolah/${id}`
      );
      setGuru(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusGuru = async(id) => {
    try {
      await axios.delete(`http://localhost:5000/guru/${id}`);
    } catch (error) {
      
    }
  };
  return (
    <div className="contain">
      {openModalAdd && (
        <AddGuruModal
          setIsOpenModalAdd={setOpenModalAdd}
          getGuru={getGuruBySekolah}
        />
      )}
      {openModalEdit && (
        <EditGuruModal
          setIsOpenModalEdit={setOpenModalEdit}
          selectedGuru={selectedGuru}
          getGuru={getGuruBySekolah}
        />
      )}

      <h1 className="judul">Data Guru</h1>
      <div className="flex gap-3 mt-3 items-center">
        <button onClick={() => navigate(-1)} className="btn-back">
          Kembali
        </button>
        <button onClick={() => setOpenModalAdd(true)} className="btn-add">
          Tambah Guru
        </button>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Guru</th>
              <th className="py-3 px-6 text-left">Status Pegawai</th>
              <th className="py-3 px-6 text-left">Kategori Guru</th>
              <th className="py-3 px-6 text-left">Jenis Guru</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {gurus.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_guru}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.status_pegawai}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.kategori_guru}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jenis_guru}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    onClick={() =>
                      navigate(
                        `/lapasi/data-guru/detail-guru/${item && item.id}`
                      )
                    }
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" width={100} />
                  </button>
                  <button className="edit" title="Edit" onClick={()=> handleEdit(item)}>
                    <MdModeEdit color="white" />
                  </button>
                  <button
                    className="delete"
                    onClick={() => hapusGuru(item && item.id)}
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

export default ListGuru;
