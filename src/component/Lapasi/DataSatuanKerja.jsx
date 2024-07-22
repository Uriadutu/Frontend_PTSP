import React, { useEffect, useState } from "react";
import ModalAddSatker from "../Modal/LapasiModal/AddSatker";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const DataSatuanKerja = () => {
  const [ openModalAdd, setOpenModalAdd ] = useState(false);
  const [satker, setSatker]= useState([])

  const getSatker = async()=> {
    try {
      const response = await axios.get("http://localhost:5000/satker")
      setSatker(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    getSatker()
  }, [])

  const hapusSatker = async(id) => {
    try {
      await axios.delete(`http://localhost:5000/satker/${id}`)
      getSatker()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="contain">
      {openModalAdd && (
        <ModalAddSatker
          setIsOpenModalAdd={setOpenModalAdd}
          getSatker={getSatker}
        />
      )}
      <h1 className="judul">Data Satuan Kerja</h1>
      <button onClick={() => setOpenModalAdd(true)} className="btn-add">
        Tambah Satker
      </button>

      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Kode Satker</th>
              <th className="py-3 px-6 text-left">Nama Satker</th>
              <th className="py-3 px-6 text-left">Alamat Satker</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {satker.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">
                  {item && item.kode_satker}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nama_satker}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.alamat_satker}
                </td>
                <td className="py-3 px-6 text-left">
                  <button
                    className="delete"
                    onClick={() => hapusSatker(item && item.id)}
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

export default DataSatuanKerja;
