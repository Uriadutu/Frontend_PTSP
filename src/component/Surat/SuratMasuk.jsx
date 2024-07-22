import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AddSuratMasukModal from "../Modal/SuratModal/AddSuratMasuk";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const SuratMasuk = () => {
  const [openModal, setOpenModal] = useState(false);
  const [surats, setSurat] = useState([]);
  const { sub } = useParams();
  const navigate = useNavigate();

  const getSuratMasukbySub = async (menu) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/suratmasuk/sub/${menu}`
      );
      setSurat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSuratMasukbySub(sub);
  }, [sub]);

  const hapusSurat = async (id)=> {
    try {
      await axios.delete(`http://localhost:5000/suratmasuk/${id}`);
      getSuratMasukbySub(sub);
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className="contain">
      {openModal && (
        <AddSuratMasukModal
          setIsOpenModalAdd={setOpenModal}
          getSuratMasukBySub={getSuratMasukbySub}
        />
      )}
      <h1 className="judul">Surat Masuk</h1>
      <button onClick={() => setOpenModal(true)} className="btn-add">
        Tambah Surat Masuk
      </button>
      <div className="mt-2 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left whitespace-nowrap">No</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Kode Surat
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Tanggal</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Perihal Surat
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Asal Surat
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Kepada</th>
              <th className="py-3 px-6 text-center whitespace-nowrap">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {surats.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item && item.kode_surat}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item && item.tanggal}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item && item.perihal_surat}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item && item.asal_surat}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item && item.kepada}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    className="detail"
                    title="Lihat"
                    onClick={() => navigate(`/${sub}/surat-masuk/detail/${item.id}`)}
                  >
                    <IoEyeSharp color="white" width={100} />
                  </button>

                  <button onClick={()=> hapusSurat(item && item.id)} className="delete" title="Hapus">
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

export default SuratMasuk;
