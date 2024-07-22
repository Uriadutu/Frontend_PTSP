import React, { useEffect, useState } from "react";
import AddHajiModal from "../Modal/AkesahuModal/AddHajiModal";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
const DataHaji = () => {
  const [openModal, setOpenModal] = useState(false);
  const [hajis, setHaji] = useState([]);
  const navigate = useNavigate();
  const { sub } = useParams();
  const detail = (link) => {
    navigate(link);
  };
  const getHaji = async () => {
    try {
      const response = await axios.get("http://localhost:5000/haji");
      setHaji(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHaji();
  }, []);

  const hapusHaji = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/haji/${id}`);
      getHaji();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="contain">
      {openModal && (
        <AddHajiModal setIsOpenModalAdd={setOpenModal} getHaji={getHaji} />
      )}

      <h1 className="judul">Data Haji</h1>
      <button onClick={() => setOpenModal(true)} className="btn-add">
        Tambah Data Haji
      </button>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nomor Porsi</th>
              <th className="py-3 px-6 text-left">Nama Jamaah</th>
              <th className="py-3 px-6 text-left">Kecamatan - Desa</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {hajis.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.nomor_porsi}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_jamaah}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.kecamatan} - {item && item.nama_desa}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.status_keberangkatan}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() =>
                      detail(`/${sub}/data-haji/detail/${item && item.id}`)
                    }
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" width={100} />
                  </button>
                  <button
                    className="delete"
                    onClick={() => hapusHaji(item && item.id)}
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

export default DataHaji;
