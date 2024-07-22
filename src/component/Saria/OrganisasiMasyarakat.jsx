import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import AddOrganisasiMasyarakatModal from "../Modal/SariaModal/AddOrganisasiModal";

const OrganisasiMasyarakat = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [dataOrganisasi, setDataOrganisasi] = useState([]);

  const hapusOrganisasi = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/organisasi-masyarakat/${id}`);
      getOrganisasi();
    } catch (error) {
      console.log(error);
    }
  };

  const getOrganisasi = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/organisasi-masyarakat"
      );
      const data = response.data;
      if (Array.isArray(data)) {
        setDataOrganisasi(data);
      } else {
        setDataOrganisasi([]);
      }
    } catch (error) {
      console.log(error);
      setDataOrganisasi([]); // Set as an empty array in case of error
    }
  };

  useEffect(() => {
    getOrganisasi();
  }, []);

  return (
    <div className="contain">
      {openModalAdd && (
        <AddOrganisasiMasyarakatModal
          setIsOpenModalAdd={setOpenModalAdd}
          getOrganisasiMasyarakat={getOrganisasi}
        />
      )}
      <h1 className="judul">Data Organisasi Masyarakat</h1>
      <div className="flex gap-3 mt-3 items-center">
        <button onClick={() => setOpenModalAdd(true)} className="btn-add">
          Tambah Organisasi
        </button>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left text-[12px]">No</th>
              <th className="py-3 px-6 text-left text-[12px]">
                Nama Organisasi
              </th>
              <th className="py-3 px-6 text-left text-[12px]">Alamat</th>
              <th className="py-3 px-6 text-left text-[12px]">Tahun Berdiri</th>
              <th className="py-3 px-6 text-left text-[12px]">
                Nama Pimpinan{" "}
              </th>
              <th className="py-3 px-6 text-left text-[12px]">
                Tahun Periode{" "}
              </th>
              <th className="py-3 px-6 text-left text-[12px]">
                Jumlah Anggota
              </th>
              <th className="py-3 px-6 text-left text-[12px]">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {Array.isArray(dataOrganisasi) && dataOrganisasi.length > 0 ? (
              dataOrganisasi.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{index + 1}</td>
                  <td className="py-3 px-6 text-left">
                    {item.nama_organisasi}
                  </td>
                  <td className="py-3 px-6 text-left">{item.alamat}</td>
                  <td className="py-3 px-6 text-left">{item.tahun_berdiri}</td>
                  <td className="py-3 px-6 text-left">{item.nama_pimpinan}</td>
                  <td className="py-3 px-6 text-left">{item.tahun_periode}</td>
                  <td className="py-3 px-6 text-left">{item.jumlah_anggota}</td>
                  <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                    <button
                      className="delete"
                      onClick={() => hapusOrganisasi(item.id)}
                      title="Hapus"
                    >
                      <MdDelete color="white" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-3 px-6 text-center">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganisasiMasyarakat;
