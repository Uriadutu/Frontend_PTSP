import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DetailSuratMasuk = () => {
  const [surat, setSurat] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const getSuratMasukById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/suratmasuk/${id}`
      );
      setSurat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSuratMasukById(id);
  }, [id]);

  return (
    <div className="contain">
      <h1 className="judul">Detail Surat Masuk</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <div className="grid grid-cols-2 items-center">
            <strong>Kode Surat</strong>
            <div className="">: {surat.kode_surat}</div>
          </div>
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-2 items-center">
            <strong>Sifat Surat</strong>
            <div className="">: {surat.sifat_surat}</div>
          </div>
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-2 items-center">
            <strong>Perihal Surat</strong>
            <div className="">: {surat.perihal_surat}</div>
          </div>
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-2 items-center">
            <strong>Asal Surat</strong>
            <div className="">: {surat.asal_surat}</div>
          </div>
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-2 items-center">
            <strong>Kepada</strong>
            <div className="">: {surat.kepada}</div>
          </div>
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-2 items-center">
            <strong>Tempat</strong>
            <div className="">: {surat.tempat}</div>
          </div>
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-2 items-center">
            <strong>Tanggal</strong>
            <div className="">: {surat.tanggal}</div>
          </div>
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-2 items-center">

          <strong>Pejabat</strong>
          <div className="">: {surat.pejabat}</div>
        </div>
          </div>
        <div className="mt-4">
          {surat.file && (
            <a
              href={surat && surat.url}
              download={surat.file}
              className="btn-download px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow-md hover:bg-blue-600 transition duration-300"
            >
              Download File
            </a>
          )}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="btn-back mt-4 px-4 "
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default DetailSuratMasuk;
