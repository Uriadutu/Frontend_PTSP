import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddDokumenSekolah from "../Modal/PantaiDisaModal/sekolahModal/AddDokumenSekolah";
import { MdDelete } from "react-icons/md";

const DetailSekolah = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [sekolahData, setSekolahData] = useState(null);
  const [dokumen, setDokumen] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getSekolahById = async (idSekolah) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/sekolah/${idSekolah}`
      );
      setSekolahData(response.data);
    } catch (error) {
      console.error("Error fetching Sekolah data:", error);
    }
  };

  const hapusDokumen = async (id_dok) => {
    try {
      await axios.delete(`http://localhost:5000/dokumen-sekolah/${id_dok}`);
      getDokumen(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSekolahById(id);
    getDokumen(id);
  }, [id]);

  const getDokumen = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/dokumen-sekolah/data/${id}`
      );
      setDokumen(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!sekolahData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contain">
      {openModalAdd && (
        <AddDokumenSekolah
          setIsOpenModalAdd={setOpenModalAdd}
          getDokumenSekolahBySekolah={getDokumen}
          id_sekolah={id}
        />
      )}
      <h2 className="judul">Detail Data Sekolah</h2>
      <div className="flex gap-3">
        <button className="btn-back" onClick={() => navigate(-1)}>
          Kembali
        </button>
        <button onClick={() => setOpenModalAdd(true)} className="btn-add">
          Tambah Dokumen
        </button>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Sk Izin</th>
              <th className="py-3 px-6 text-left">No Registrasi</th>
              <th className="py-3 px-6 text-left">Akreditasi</th>
              <th className="py-3 px-6 text-left">NSS/NPSN</th>
              <th className="py-3 px-6 text-left">Serti Tanah</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {dokumen.length > 0 ? (
              dokumen.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{index + 1}</td>
                  <td className="py-3 px-6 text-left">
                    <Link to={item.sk_izin_url}>{item.sk_izin_file}</Link>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <Link to={item.no_reg_url}>{item.no_reg_file}</Link>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <Link to={item.akreditasi_url}>{item.akreditasi_file}</Link>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <Link to={item.nss_url}>{item.nss_file}</Link>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <Link to={item.serti_tanah_url}>
                      {item.serti_tanah_file}
                    </Link>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button
                      className="delete"
                      onClick={() => hapusDokumen(item.id)}
                      title="Hapus"
                    >
                      <MdDelete color="white" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-3">
                  Data Tidak Ada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-6 grid grid-cols-2 gap-4 bg-white shadow-lg rounded-lg mt-2">
        <div>
          <strong>Nama Sekolah:</strong>
          <p>{sekolahData.nama_sekolah}</p>
        </div>
        <div>
          <strong>Status Sekolah:</strong>
          <p>{sekolahData.s_sekolah}</p>
        </div>
        <div>
          <strong>Jenjang Sekolah:</strong>
          <p>{sekolahData.jenjang_sekolah}</p>
        </div>
        <div>
          <strong>NSS:</strong>
          <p>{sekolahData.nss}</p>
        </div>
        <div>
          <strong>NPSN:</strong>
          <p>{sekolahData.npsn}</p>
        </div>
        <div>
          <strong>Alamat:</strong>
          <p>{sekolahData.alamat}</p>
        </div>
        <div>
          <strong>No Telepon:</strong>
          <p>{sekolahData.no_telp}</p>
        </div>
        <div>
          <strong>Tahun Berdiri:</strong>
          <p>{sekolahData.tahun_berdiri}</p>
        </div>
        <div>
          <strong>Status Akreditasi:</strong>
          <p>{sekolahData.status_akreditasi}</p>
        </div>
        <div>
          <strong>Status Bangunan:</strong>
          <p>{sekolahData.status_bangunan}</p>
        </div>
        <div>
          <strong>Sk Izin Pembangunan:</strong>
          <p>{sekolahData.sk_izin}</p>
        </div>
        <div>
          <strong>No Her Registrasi Pendirian:</strong>
          <p>{sekolahData.req_pendirian}</p>
        </div>
        <div>
          <strong>Jumlah Rombel:</strong>
          <p>{sekolahData.jumlah_rombel}</p>
        </div>
        <div>
          <strong>Nama Kepala Sekolah:</strong>
          <p>{sekolahData.nama_kepsek}</p>
        </div>
        <div>
          <strong>NIP Kepala Sekolah:</strong>
          <p>{sekolahData.nip_kepsek}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailSekolah;
