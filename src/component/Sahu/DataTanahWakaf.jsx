import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md';
import AddTanahWakafModal from '../Modal/SahuModal/AddTanahWakafModal';
import axios from 'axios';

const DataTanahWakaf = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataTanah, setDataTanah] = useState([])
  const getTanah = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tanah-wakaf')
      setDataTanah(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    getTanah()
  },[])

  const hapusTanah = async(id) => {
     try {
      await axios.delete(`http://localhost:5000/tanah-wakaf/${id}`);
      getTanah();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="contain">
      {openModal && (
        <AddTanahWakafModal
          setIsOpenModalAdd={setOpenModal}
          getTanahWakaf={getTanah}
        />
      )}
      <h1 className="judul">Data Tanah Wakaf</h1>
      <button onClick={() => setOpenModal(true)} className="btn-add">
        Tambah Tanah Wakaf
      </button>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Kecamatan</th>
              <th className="py-3 px-6 text-left">Jenis Wakaf</th>
              <th className="py-3 px-6 text-left">Jenis Tanah</th>
              <th className="py-3 px-6 text-left">Luas Tanah</th>
              <th className="py-3 px-6 text-left">Jumlah Tanah </th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {dataTanah.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_kecamatan}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jenis_wakaf}
                </td>
                <td className="py-3 px-6 text-left">{item && item.jenis_tanah}</td>
                <td className="py-3 px-6 text-left">{item && item.luas_tanah}</td>
                <td className="py-3 px-6 text-left">{item && item.jumlah_wakaf}</td>

                <td className="py-3 px-6 text-center">
                  <button
                    className="delete"
                    onClick={() => hapusTanah(item && item.id)}
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

export default DataTanahWakaf
