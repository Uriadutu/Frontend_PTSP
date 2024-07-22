import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import AddKecamatanModal from "../Modal/SahuModal/AddKecamatanModal";

const DataKecamatan = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataKec, setKec] = useState([]);

  const getKecamatan = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kecamatan");
      setKec(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKecamatan();
  }, []);

  const hapusKecamatan = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/kecamatan/${id}`);
      getKecamatan();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contain">
      {openModal && (
        <AddKecamatanModal setIsOpenModalAdd={setOpenModal} getKecamatan={getKecamatan} />
      )}
      <h1 className="judul">Data Kecamatan</h1>
      <button onClick={() => setOpenModal(true)} className="btn-add">
        Tambah Data Kecamatan
      </button>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Kode Kecamatan</th>
              <th className="py-3 px-6 text-left">Nama Kecamatan</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {dataKec.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">{item && item.kode}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_kecamatan}
                </td>

                <td className="py-3 px-6 text-center">
                  <button
                    className="delete"
                    onClick={() => hapusKecamatan(item && item.id)}
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

export default DataKecamatan;
