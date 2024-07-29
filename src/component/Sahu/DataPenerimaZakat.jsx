import React, { useEffect, useState } from "react";
import axios from "axios";
import AddZakatModal from "../Modal/SahuModal/AddZakatModal";
import { MdDelete } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const DataPenerimaZakat = () => {
  const [openModal, setOpenModal] = useState(false);
  const [zakats, setZakat] = useState([]);

  const navigate = useNavigate();
  // Fetch data zakat
  const getZakat = async () => {
    try {
      const response = await axios.get("http://localhost:5000/zakat");
      setZakat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch data zakat on component mount
  useEffect(() => {
    getZakat();
  }, []);

  // Delete zakat entry
  const hapusZakat = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/zakat/${id}`);
      getZakat();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contain">
      {openModal && (
        <AddZakatModal setIsOpenModalAdd={setOpenModal} getZakat={getZakat} />
      )}
      <h1 className="judul">Data Penerima Dan Penyaluran Zakat</h1>
      <button onClick={() => setOpenModal(true)} className="btn-add">
        Tambah Data Zakat
      </button>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Kecamatan</th>
              <th className="py-3 px-6 text-left">Kategori Zakat</th>
              <th className="py-3 px-6 text-left">Sumber Zakat</th>
              <th className="py-3 px-6 text-left">Jumlah Sumber Zakat</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {zakats.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.Kecamatan && item.Kecamatan.nama_kecamatan}
                </td>
                <td className="py-3 px-6 text-left">{item && item.kategori}</td>
                <td className="py-3 px-6 text-left">{item && item.sumber}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.jumlah_sumber}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() =>
                      navigate(
                        `/sahu/data-penerima-penyaluran-zakat/detail-zakat/${
                          item && item.id
                        }`
                      )
                    }
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" width={100} />
                  </button>
                  <button
                    className="delete"
                    onClick={() => hapusZakat(item && item.id)}
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

export default DataPenerimaZakat;
