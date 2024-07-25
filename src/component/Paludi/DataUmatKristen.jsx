import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import AddDataUmatKristenModal from '../Modal/PaludiModal/AddDataUmatKristenModal';
import { Link } from 'react-router-dom';
import { IoEyeSharp } from 'react-icons/io5';

const DataUmatKristen = () => {
  const [umatKristen, setUmatKristen] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);

  const getDataUmatKristen = async () => {
    try {
      const response = await axios.get('http://localhost:5000/data-umat-kristen');
      setUmatKristen(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataUmatKristen();
  }, []);

  const hapusDataUmatKristen = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/data-umat-kristen/${id}`);
      getDataUmatKristen();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contain">
      {openModalAdd && (
        <AddDataUmatKristenModal
          setIsOpenModalAdd={setOpenModalAdd}
          getDataUmatKristen={getDataUmatKristen}
        />
      )}
      <h1 className="judul">Data Umat Kristen</h1>
      <button onClick={() => setOpenModalAdd(true)} className="btn-add">
        Tambah Data Umat Kristen
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
            {umatKristen.map((item, index) => (
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
                    onClick={() => hapusDataUmatKristen(item && item.id)}
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

export default DataUmatKristen;
