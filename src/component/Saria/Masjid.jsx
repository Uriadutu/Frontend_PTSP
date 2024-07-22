import React, { useEffect, useState } from 'react'
import AddRumahIbadahIslamModal from '../Modal/SariaModal/AddRumahIbadahIslamModal';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { IoEyeSharp } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

const Masjid = () => {
   const [openModalAdd, setOpenModalAdd] = useState(false);
   const [dataMasjid, setDataMasjid] = useState([])

   const {sub} = useParams()
   const navigate = useNavigate();

   const getRumahIbadahIslam = async()=> {
    try {
      const response = await axios.get(
        "http://localhost:5000/rumah-ibadah-islam"
      );
      setDataMasjid(response.data)
    } catch (error) {
      console.log(error);
    }
   }

   useEffect(()=> {
    getRumahIbadahIslam();
   },[])

   const hapusMasjid= async(id) => {
     try {
      await axios.delete(`http://localhost:5000/rumah-ibadah-islam/${id}`)
      getRumahIbadahIslam()
    } catch (error) {
      console.log(error);
    }
   };
  return (
    <div className="contain">
      {openModalAdd && (
        <AddRumahIbadahIslamModal
          setIsOpenModalAdd={setOpenModalAdd}
          getRumahIbadah={getRumahIbadahIslam}
        />
      )}
      <h1 className="judul">Data Rumah Ibadah Islam</h1>
      <div className="flex gap-3 mt-3 items-center">
        <button onClick={() => setOpenModalAdd(true)} className="btn-add">
          Tambah Masjid
        </button>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Masjid</th>
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Tipologi</th>
              <th className="py-3 px-6 text-left">Luas Bangunan</th>
              <th className="py-3 px-6 text-left">Tahun Berdisi</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {dataMasjid.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_masjid} 
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.alamat}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.tipologi}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.luas_bangunan}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.tahun_berdiri}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="detail"
                    title="Lihat"
                    onClick={() =>
                      navigate(`/${sub}/masjid/detail/${item.id}`)
                    }
                  >
                    <IoEyeSharp color="white" width={100} />
                  </button>
                  <button
                    className="delete"
                    onClick={() => hapusMasjid(item && item.id)}
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

export default Masjid
