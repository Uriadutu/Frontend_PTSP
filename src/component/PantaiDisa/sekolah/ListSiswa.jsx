import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete, MdModeEdit } from "react-icons/md";
import AddSiswaModal from "../../Modal/PantaiDisaModal/AddSiswaModal";

const ListSiswa = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [Siswas, setSiswa] = useState([]);
  const navigate = useNavigate();
  const { idsekolah } = useParams();

  useEffect(() => {
    getSiswaBySekolah(idsekolah);
  }, [idsekolah]);
  const getSiswaBySekolah = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/siswa/sekolah/${id}`
      );
      setSiswa(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusSiswa = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/siswa/${id}`);
      getSiswaBySekolah();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="contain">
      {openModalAdd && (
        <AddSiswaModal
          setIsOpenModalAdd={setOpenModalAdd}
          getSiswa={getSiswaBySekolah}
        />
      )}

      <h1 className="judul">Data Siswa</h1>
      <div className="flex gap-3 mt-3 items-center">
        <button onClick={() => navigate(-1)} className="btn-back">
          Kembali
        </button>
        <button onClick={() => setOpenModalAdd(true)} className="btn-add">
          Tambah Siswa
        </button>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">NISN</th>
              <th className="py-3 px-6 text-left">Nama Siswa</th>
              <th className="py-3 px-6 text-left">Tahun Ajaran</th>
              <th className="py-3 px-6 text-left">Nomor Induk</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {Siswas.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">{item && item.NISN}</td>

                <td className="py-3 px-6 text-left">
                  {item && item.nama_siswa}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.tahun_ajaran}
                </td>
                <td className="py-3 px-6 text-left">
                  {item && item.nomor_induk}
                </td>
                <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                  <button
                    onClick={() =>
                      navigate(
                        `/lapasi/data-siswa/detail-siswa/${item && item.id}`
                      )
                    }
                    className="detail"
                    title="Lihat"
                  >
                    <IoEyeSharp color="white" width={100} />
                  </button>
                  <button className="edit" title="Edit">
                    <MdModeEdit color="white" />
                  </button>
                  <button
                    className="delete"
                    onClick={() => hapusSiswa(item && item.id)}
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

export default ListSiswa;
