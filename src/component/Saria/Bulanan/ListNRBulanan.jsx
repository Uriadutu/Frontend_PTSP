import React, { useEffect, useState } from "react";
import { IoAdd, IoSettings } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import AddTahunModal from "../../Modal/SariaModal/AddTahunModal";
import axios from "axios";
import { MdDelete } from "react-icons/md";


const ListNRBulanan = () => {
  const [openModal, setIsOpenModalAdd] = useState(false)
  const [tahun, setTahun] = useState([])
  const { namaBulan, no } = useParams();
  const navigate = useNavigate()
  
  const getTahun = async(nomor)=> {
    try {
      const response = await axios.get(`http://localhost:5000/bulantahun/nomor/${nomor}`)
      setTahun(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=> {
    getTahun(no)
  },[no])

  const hapusData = async(id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus Tahun ini?")) {
    try {

      await axios.delete(`http://localhost:5000/bulantahun/${id}`)
      getTahun(no)
    } catch (error) {
      console.log(error);
    }
  }
  }

  return (
    <div className="contain">
      {openModal && (
        <AddTahunModal
          setIsOpenModalAdd={setIsOpenModalAdd}
          getTahun={getTahun}
        />
      )}
      <h1 className="judul">List Tahun Pada Bulan {namaBulan}</h1>
      <div className="flex mb-3 items-center gap-2">
        <button className="btn-back" onClick={() => navigate(-1)}>
          Kembali
        </button>
        <button
          onClick={() => setIsOpenModalAdd(true)}
          className="btn-add hidden sm:block"
        >
          Tambah Tahun
        </button>
        <button
          onClick={() => setIsOpenModalAdd(true)}
          className="btn-add sm:hidden block"
        >
          <IoAdd color="white" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Tahun</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {tahun.map((dataTahun, index) => (
              <tr
                key={dataTahun.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">{dataTahun.nama_bulan}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      className="p-2 border border-gray-100 rounded bg-gray-600 hover:bg-gray-500 ml-2"
                      title="Edit"
                      onClick={() =>
                        navigate(
                          `/saria/data-nikah-rujuk/bulanan/${namaBulan}/${dataTahun.nama_bulan}/${dataTahun.no}`
                        )
                      }
                    >
                      <IoSettings color="white" />
                    </button>
                    <button
                      className="delete"
                      title="Hapus"
                      onClick={() => hapusData(dataTahun.id)}
                    >
                      <MdDelete color="white" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListNRBulanan;
