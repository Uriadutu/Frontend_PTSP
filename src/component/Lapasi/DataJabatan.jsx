import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddJabatanModal from '../Modal/LapasiModal/AddJabatan'
import { MdDelete } from 'react-icons/md'

const DataJabatan = () => {
  const [jabatan, setJabatan] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const getJabatan = async()=> {
    try {
      const response = await axios.get("http://localhost:5000/jabatan")
      setJabatan(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    getJabatan()
  },[])

  const hapusJabatan = async (id)=> {
    try {
      await axios.delete(`http://localhost:5000/jabatan/${id}`)
      getJabatan()
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <div className="contain">
      {openModal && (
        <AddJabatanModal
          getJabatan={getJabatan}
          setIsOpenModalAdd={setOpenModal}
        />
      )}
      <div className="judul">Data Jabatan</div>
      <button onClick={() => setOpenModal(true)} className="btn-add">
        Tambah Satker
      </button>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Kode Jabatan</th>
              <th className="py-3 px-6 text-left">Nama Jabatan</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {jabatan.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.kode_jabatan}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_jabatan}
                </td>
                <td className="py-3 px-6 text-left">
                  <button
                    className="delete"
                    onClick={() => hapusJabatan(item && item.id)}
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

export default DataJabatan
