import axios from "axios";
import React, { useEffect, useState } from "react";
import AddKuaModal from "../Modal/SariaModal/AddKuaModal";
import { MdDelete } from "react-icons/md";

const Kua = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataKua, setDataKua] = useState([]);

  const getKua = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kua");
      setDataKua(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKua();
  }, []);

  const hapusKua = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/kua/${id}`);
      getKua();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contain">
      {openModalAdd && (
        <AddKuaModal
          setIsOpenModalAdd={setOpenModalAdd}
          getKua={getKua}
        />
      )}
      <h1 className="judul">Data KUA</h1>
      <div className="flex gap-3 mt-3 items-center">
        <button onClick={() => setOpenModalAdd(true)} className="btn-add">
          Tambah Masjid
        </button>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Kode Satker</th>
              <th className="py-3 px-6 text-left">Nama KUA</th>
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Nama Kepala</th>
              <th className="py-3 px-6 text-left">Jumlah Pegawai</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {dataKua.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.kode_satker}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_kua}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.alamat}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_kepala}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jumlah_pegawai}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="delete"
                    onClick={() => hapusKua(item && item.id)}
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

export default Kua;
