import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoAdd, IoEyeSharp } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/helper';
import AddPengaduanModal from './Modal/AddPengaduanModal';

const LayananPengaduan = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [pengaduan, setPengaduan] = useState([])
  const navigate = useNavigate();
  
  const getPengaduan = async()=> {
    try {
      const response = await axios.get('http://localhost:5000/pengaduan')
      setPengaduan(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const hapusPengaduan = async(id)=> {
    try {
      await axios.delete(`http://localhost:5000/pengaduan/${id}`)
      getPengaduan();
    } catch (error) {
     console.log(error); 
    }
  };
  

  useEffect(()=> {
    getPengaduan()
  },[])

  return (
    <div className="contain">
      {openModalAdd && (
        <AddPengaduanModal
          setIsOpenModalAdd={setOpenModalAdd}
          getPengaduan={getPengaduan}
        />
      )}
      <h1 className="judul">Layanan Pengaduan</h1>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpenModalAdd(true)}
          className="btn-add hidden sm:block"
        >
          Tambah Pengaduan
        </button>
        <button
          onClick={() => setOpenModalAdd(true)}
          className="btn-add sm:hidden block"
        >
          <IoAdd color="white" />
        </button>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama</th>
              <th className="py-3 px-6 text-left">NIP</th>
              <th className="py-3 px-6 text-left">Kategori</th>
              <th className="py-3 px-6 text-left">Sifat</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {pengaduan.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.Pegawai && item.Pegawai.nama_pegawai}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.Pegawai && item.Pegawai.NIP}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.kategori_laporan}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.sifat_laporan}
                </td> 
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="detail"
                    title="Lihat"
                    onClick={() =>
                      navigate(`/layanan-pengaduan/detail/${item.id}`)
                    }
                  >
                    <IoEyeSharp color="white" width={100} />
                  </button>
                  <button
                    className="delete"
                    onClick={() => hapusPengaduan(item && item.id)}
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

export default LayananPengaduan
