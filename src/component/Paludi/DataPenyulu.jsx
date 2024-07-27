import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import AddPenyuluModal from "../Modal/PaludiModal/AddPenyuluModal";

const DataPenyulu = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [penyulus, setPenyulu] = useState([]);

  const getPenyulu = async () => {
    try {
      const response = await axios.get("http://localhost:5000/penyulu");
      setPenyulu(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusPenyulu = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/penyulu/${id}`);
      getPenyulu();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPenyulu();
  }, []);


  return (
    <div className="contain">
      {openModalAdd && (
        <AddPenyuluModal
          setIsOpenModalAdd={setOpenModalAdd}
          getPenyulu={getPenyulu}
        />
      )}
      <h1 className="judul">Data Penyuluh</h1>
      <button onClick={() => setOpenModalAdd(true)} className="btn-add">
        Tambah Penyuluh
      </button>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama</th>
              <th className="py-3 px-6 text-left">Status Pegawai</th>
              <th className="py-3 px-6 text-left">Tempat Tugas</th>
              <th className="py-3 px-6 text-left">Jumlah Kelompok</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {penyulus.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">{item && item.nama}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.status_pegawai}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.tempat_tugas}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jumlah_binaan}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <Link
                    to={`/paludi/data-penyulu/detail/${item.id}`}
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" width={100} />
                  </Link>
                  <button
                    className="delete"
                    onClick={() => hapusPenyulu(item && item.id)}
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

export default DataPenyulu;
