import React, { useEffect, useState } from 'react'
import AddGerejaModal from '../Modal/PaludiModal/AddGerejaModal';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoEyeSharp } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

const DataGereja = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [gereja, setGereja] = useState([])

  const getGereja = async()=> {
    try {
        const response = await axios.get("http://localhost:5000/gereja")
        setGereja(response.data)
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=> {
    getGereja()
  },[])

  const hapusGereja=0;

  return (
    <div className="contain">
      {openModalAdd && (
        <AddGerejaModal
          setIsOpenModalAdd={setOpenModalAdd}
          getGereja={getGereja}
        />
      )}
      <h1 className="judul">Data Umat Kristen</h1>
      <button onClick={() => setOpenModalAdd(true)} className="btn-add">
        Tambah Gereja
      </button>
       <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Gereja</th>
              <th className="py-3 px-6 text-left">Nama Pimpinan Gereja</th>
              <th className="py-3 px-6 text-left">Denominasi </th>
              <th className="py-3 px-6 text-left">Jumlah Umat</th>
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {gereja.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_gereja}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_pimpinan}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.demonisasi}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jumlah_umat}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.kecamatan} - {item && item.nama_desa}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <Link
                    to={`/paludi/data-umat-kristen/detail/${item.id}`}
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" width={100} />
                  </Link>
                  <button
                    className="delete"
                    onClick={() => hapusGereja(item && item.id)}
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

export default DataGereja