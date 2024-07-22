import React, { useEffect, useState } from "react";
import AddUmatIslamModal from "../Modal/SariaModal/AddUmatIslamModal";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const DataUmat = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataIslam, setDataIslam] = useState([]);

  const hapusUmat = async(id) => {
    try {
      await axios.delete(`http://localhost:5000/umat-islam/${id}`)
      getUmatIslam()
    } catch (error) {
      console.log(error);
    }
  };
  const getUmatIslam = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/umat-islam`);
      setDataIslam(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUmatIslam();
  }, []);
  return (
    <div className="contain">
      {openModalAdd && (
        <AddUmatIslamModal
          setIsOpenModalAdd={setOpenModalAdd}
          getUmatIslam={getUmatIslam}
        />
      )}
      <h1 className="judul">Data Umat</h1>
      <div className="flex gap-3 mt-3 items-center">
        <button onClick={() => setOpenModalAdd(true)} className="btn-add">
          Tambah Umat Islam
        </button>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Jumlah Penduduk</th>
              <th className="py-3 px-6 text-left">Jumlah Aliran</th>
              <th className="py-3 px-6 text-left">Penduduk Islam </th>
              <th className="py-3 px-6 text-left">Jumlah Masjid</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {dataIslam.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.kecamatan} - {item && item.nama_desa}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jumlah_penduduk}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jumlah_aliran}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jumlah_penduduk_islam}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jumlah_mesjid}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="delete"
                    onClick={() => hapusUmat(item && item.id)}
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

export default DataUmat;
