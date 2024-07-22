import React, { useEffect, useState } from 'react'
import AddLembagaKeagamaanModal from '../Modal/SariaModal/AddLembagaKeagamaanModal';
import { MdDelete } from 'react-icons/md';
import { IoEyeSharp } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const LembagaKeagamaan = () => {
   const [openModalAdd, setOpenModalAdd] = useState(false);
   const [dataLembaga, setDataLembaga] = useState([])
   const {sub} = useParams()

   const navigate = useNavigate()
   const getLembaga = async()=> {
    try {
      const response = await axios.get(
        "http://localhost:5000/lembaga-keagamaan"
      );
      setDataLembaga(response.data)
    } catch (error) {
      console.log(error);
    }
   }

   const hapusLembaga = async(id) => {
    try {
      await axios.delete(`http://localhost:5000/lembaga-keagamaan/${id}`)
      getLembaga()
    } catch (error) {
      console.log(error);
    }
   };
   useEffect(()=>{
    getLembaga()
   },[])
  return (
    <div className="contain">
      {openModalAdd && (
        <AddLembagaKeagamaanModal
          setIsOpenModalAdd={setOpenModalAdd}
          getLembagaKeagamaan={getLembaga}
        />
      )}
      <h1 className="judul">Data Lembaga Keagamaan</h1>
       <div className="flex gap-3 mt-3 items-center">
        <button onClick={() => setOpenModalAdd(true)} className="btn-add">
          Tambah Lembaga
        </button>
      </div>
       <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Lembaga</th>
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Tahun Berdiri</th>
              <th className="py-3 px-6 text-left">Nama Pimpinan</th>
              <th className="py-3 px-6 text-left">Jumlah Bidang</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {dataLembaga.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_lembaga} 
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
                  {item && item.jumlah_bidang}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="detail"
                    title="Lihat"
                    onClick={() =>
                      navigate(`/${sub}/lembaga-keagamaan/detail/${item.id}`)
                    }
                  >
                    <IoEyeSharp color="white" width={100} />
                  </button>
                  <button
                    className="delete"
                    onClick={() => hapusLembaga(item && item.id)}
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

export default LembagaKeagamaan
