import React, { useEffect, useState } from 'react'
import AddMajelisModal from '../Modal/SariaModal/AddMajelisModal';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';

const MajelisTalim = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataMajelis, setDataMajelis] = useState([])

  const getMajelis = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/majelis`);
      setDataMajelis(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getMajelis()
  },[])


  const hapusMajelis = async(id) => {
    try {
      await axios.delete(`http://localhost:5000/majelis/${id}`)
      getMajelis()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="contain">
      {openModalAdd && (
        <AddMajelisModal
          setIsOpenModalAdd={setOpenModalAdd}
          getMajelis={getMajelis}
        />
      )}
      <h1 className="judul">Data Majelis Ta'Lim</h1>
      <div className="flex gap-3 mt-3 items-center">
        <button onClick={() => setOpenModalAdd(true)} className="btn-add">
          Tambah Majelis
        </button>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Majelis Ta’lim</th>
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Tahun Berdiri</th>
              <th className="py-3 px-6 text-left">Nama Pimpinan </th>
              <th className="py-3 px-6 text-left">Jumlah Jamaah</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {dataMajelis.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_majelis}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.alamat}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.tahun_berdiri}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_pimpinan}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jumlah_jamaah}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="delete"
                    onClick={() => hapusMajelis(item && item.id)}
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
}

export default MajelisTalim
