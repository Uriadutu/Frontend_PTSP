import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete, MdModeEdit } from "react-icons/md";
import AddTenagaKependidikanModal from "../../Modal/PantaiDisaModal/sekolahModal/AddTenagaKependidikanModal";
import EditTenagaKependidikanModal from "../../Modal/PantaiDisaModal/EditTenagaKependidikanModal";

const ListTenagaPendidik = () => {
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
        `http://localhost:5000/tenaga/sekolah/${id}`
      );
      setGuru(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusGuru = async (idTenaga) => {
    try {
      await axios.delete(`http://localhost:5000/tenaga/${idTenaga}`);
      getGuruBySekolah(idsekolah)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="contain">
      {openModalAdd && (
        <AddTenagaKependidikanModal
          setIsOpenModalAdd={setOpenModalAdd}
          getTenaga={getGuruBySekolah}
        />
      )}
      {openModalEdit && (
        <EditTenagaKependidikanModal
          setIsOpenModalEdit={setOpenModalEdit}
          selectedGuru={selectedGuru}
          getGuru={getGuruBySekolah}
        />
      )}

      <h1 className="judul">Data Tenaga Kependidikan</h1>
      <div className="flex gap-3 mt-3 items-center">
        <button onClick={() => navigate(-1)} className="btn-back">
          Kembali
        </button>
        <button onClick={() => setOpenModalAdd(true)} className="btn-add">
          Tambah Tenaga Pendidik
        </button>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Tenaga Kependidikan</th>
              <th className="py-3 px-6 text-left">Status Pegawai</th>
              <th className="py-3 px-6 text-left">Jabatan</th>
              <th className="py-3 px-6 text-left">Pangkat/Golongan</th>
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
                  {item && item.nama_tenaga}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.status_pegawai}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jabatan}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.pangkat}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    onClick={() =>
                      navigate(
                        `/pantai-disa/data-tenaga-kependidikan/detail-tenaga-kependidikan/${item && item.id}`
                      )
                    }
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" width={100} />
                  </button>
                  <button
                    className="edit"
                    title="Edit"
                    onClick={() => handleEdit(item)}
                  >
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

export default ListTenagaPendidik;
