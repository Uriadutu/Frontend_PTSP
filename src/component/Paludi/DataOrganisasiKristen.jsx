import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { IoEyeSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import AddOrganisasiModal from '../Modal/PaludiModal/AddOrganisasiModal';

const DataOrganisasiKristen = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [organisasiMasyarakat, setOrganisasiMasyarakat] = useState([]);

  const getOrganisasiMasyarakat = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/organisasi/kristen"
      );
      setOrganisasiMasyarakat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getOrganisasiMasyarakat()
  },[])

  const hapusOrganisasi = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/organisasi/kristen/${id}`);
      getOrganisasiMasyarakat();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contain">
      {openModalAdd && (
        <AddOrganisasiModal
          setIsOpenModalAdd={setOpenModalAdd}
          getOrganisasi={getOrganisasiMasyarakat}
        />
      )}
      <h1 className="judul">Data Organisasi Masyarakat</h1>
      <button onClick={() => setOpenModalAdd(true)} className="btn-add">
        Tambah Organisasi Masyarakat
      </button>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Nama Organisasi</th>
              <th className="py-3 px-6 text-left">Pimpinan Organisasi</th>
              <th className="py-3 px-6 text-left">Tahun Berdiri </th>
              <th className="py-3 px-6 text-left">Jumlah Anggota</th>
              <th className="py-3 px-6 text-left">Periode</th>
              <th className="py-3 px-6 text-left">Alamat</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {organisasiMasyarakat.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_organisasi}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_pimpinan}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.tahun_berdiri}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.jumlah_anggota}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.tahun_periode}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.alamat}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <Link
                    to={`/paludi/data-organisasi/detail/${item.id}`}
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" width={100} />
                  </Link>
                  <button
                    className="delete"
                    onClick={() => hapusOrganisasi(item && item.id)}
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

export default DataOrganisasiKristen
