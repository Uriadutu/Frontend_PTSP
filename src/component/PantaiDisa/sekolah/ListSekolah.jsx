import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import AddSekolahModal from "../../Modal/PantaiDisaModal/sekolahModal/AddSekolahModal";

const ListSekolah = () => {
  const { sub, jenjang, status } = useParams();
  const statusSekolah = jenjang + status;
  const navigate = useNavigate();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [sekolah, setSekolah] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // State untuk melacak baris yang dipilih
  let Jenjang;
  if (jenjang === "sekolah-dasar") {
    Jenjang = "Sekolah Dasar";
  } else if (jenjang === "sekolah-menengah-pertama") {
    Jenjang = "Sekolah Menengah Pertama";
  } else if (jenjang === "sekolah-menengah-atas") {
    Jenjang = "Sekolah Menengah Atas";
  }

  const toTitleCase = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getSekolah = async (Status) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/sekolah/status/${Status}`
      );
      setSekolah(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusSekolah = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/sekolah/${id}`);
      getSekolah(statusSekolah);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation(); // Mencegah propagasi event klik
    hapusSekolah(id);
  };

  const handleRowClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index); // Toggle baris yang dipilih
  };

  useEffect(() => {
    getSekolah(statusSekolah);
  }, [statusSekolah]);

  return (
    <div className="contain">
      {openModalAdd && (
        <AddSekolahModal
          setIsOpenModalAdd={setOpenModalAdd}
          getSekolah={getSekolah}
        />
      )}
      <h1 className="judul">
        List {Jenjang} {toTitleCase(status)}
      </h1>
      <div className="flex gap-3">
        <button className="btn-back" onClick={() => navigate(-1)}>
          Kembali
        </button>
        <button onClick={() => setOpenModalAdd(true)} className="btn-add">
          Tambah Sekolah
        </button>
      </div>
      <div className="mt-2 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left whitespace-nowrap">No</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Nama Sekolah
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Alamat</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Status Akreditasi
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Status Bangunan
              </th>
              <th className="py-3 px-6 text-center whitespace-nowrap">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {sekolah.map((item, index) => (
              <>
                <tr
                  onClick={() => handleRowClick(index)}
                  key={index}
                  className={`border-b cursor-pointer border-gray-200 hover:bg-gray-100 ${
                    selectedRow === index ? "bg-gray-100" : ""
                  }`}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {item && item.nama_sekolah}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {item && item.alamat}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {item && item.status_akreditasi}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {item && item.status_bangunan}
                  </td>

                  <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                    <button
                      className="detail"
                      title="Lihat"
                      onClick={(e) => {
                        e.stopPropagation(); // Mencegah propagasi event klik
                        navigate(`/${sub}/sekolah/detail/${item.id}`);
                      }}
                    >
                      <IoEyeSharp color="white" width={100} />
                    </button>

                    <button
                      onClick={(e) => handleDeleteClick(e, item.id)}
                      className="delete z-top"
                      title="Hapus"
                    >
                      <MdDelete color="white" />
                    </button>
                  </td>
                </tr>
                {selectedRow === index && (
                  <>
                    <tr
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/${sub}/sekolah/${item.nama_sekolah}/${
                            item && item.jenjang_sekolah
                          }/tenaga-kependidikan/${item.id}`
                        );
                      }}
                      className="bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap"></td>

                      <td className="py-3 px-6 text-left whitespace-nowrap cursor-pointer">
                        Tenaga Kependidikan
                      </td>

                      <td className="py-3 px-6 text-center whitespace-nowrap"></td>
                      <td className="py-3 px-6 text-center whitespace-nowrap"></td>
                      <td className="py-3 px-6 text-center whitespace-nowrap"></td>
                      <td className="py-3 px-6 text-center whitespace-nowrap"></td>
                    </tr>
                    <tr
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/${sub}/sekolah/${item.nama_sekolah}/${
                            item && item.jenjang_sekolah
                          }/guru/${item.id}`
                        );
                      }}
                      className="bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap"></td>

                      <td className="py-3 px-6 text-left whitespace-nowrap cursor-pointer">
                        Guru
                      </td>

                      <td className="py-3 px-6 text-center whitespace-nowrap"></td>
                      <td className="py-3 px-6 text-center whitespace-nowrap"></td>
                      <td className="py-3 px-6 text-center whitespace-nowrap"></td>
                      <td className="py-3 px-6 text-center whitespace-nowrap"></td>
                    </tr>
                    <tr
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/${sub}/sekolah/${item.nama_sekolah}/${
                            item && item.jenjang_sekolah
                          }/siswa/${item.id}`
                        );
                      }}
                      className="bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap"></td>

                      <td className="py-3 px-6 text-left whitespace-nowrap cursor-pointer">
                        Siswa
                      </td>

                      <td className="py-3 px-6 text-center whitespace-nowrap"></td>
                      <td className="py-3 px-6 text-center whitespace-nowrap"></td>
                      <td className="py-3 px-6 text-center whitespace-nowrap"></td>
                      <td className="py-3 px-6 text-center whitespace-nowrap"></td>
                    </tr>
                  </>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListSekolah;
