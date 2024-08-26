import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSettings, IoDocument } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const DataNikahRujuk = () => {
  const [activeTab, setActiveTab] = useState("bulanan");
  const navigate = useNavigate();

  const bulan = [
    {
      no: 1,
      nama_bulan: "Januari",
      totalData: "0",
    },
    {
      no: 2,
      nama_bulan: "Febuari",
    },
    {
      no: 3,
      nama_bulan: "Maret",
    },
    {
      no: 4,
      nama_bulan: "April",
    },
    {
      no: 5,
      nama_bulan: "Mei",
    },
    {
      no: 6,
      nama_bulan: "Juni",
    },
    {
      no: 7,
      nama_bulan: "Juli",
    },
    {
      no: 8,
      nama_bulan: "Agustus",
    },
    {
      no: 9,
      nama_bulan: "September",
    },
    {
      no: 10,
      nama_bulan: "Oktober",
    },
    {
      no: 11,
      nama_bulan: "November",
    },
    {
      no: 12,
      nama_bulan: "Desember",
    },
  ];

  //tahun
  const [tahun, setTahun] = useState([]);
  const getTahun = async () => {
    try {
      const response = await axios.get("http://localhost:5000/bulantahun");
      setTahun(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTahun();
  }, []);

  return (
    <div className="contain">
      <h1 className="judul mb-4">Data Nikah Rujuk</h1>
      <div className="tabs-container mt-3">
        <div className="tabs">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th>
                  <button
                    className={`tab ${activeTab === "bulanan" ? "active" : ""}`}
                    onClick={() => setActiveTab("bulanan")}
                  >
                    Bulanan
                  </button>
                </th>
                <th>
                  <button
                    className={`tab ${activeTab === "tahunan" ? "active" : ""}`}
                    onClick={() => setActiveTab("tahunan")}
                  >
                    Tahunan
                  </button>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {activeTab === "bulanan" && (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">No</th>
                  <th className="py-3 px-6 text-left">Nama Bulan</th>
                  <th className="py-3 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {bulan.map((bulandata) => (
                  <tr
                    key={bulandata.no}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">{bulandata.no}</td>
                    <td className="py-3 px-6 text-left">
                      {bulandata.nama_bulan}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <button
                          className="p-2 border border-gray-100 rounded bg-gray-600 hover:bg-gray-500 ml-2"
                          title="Edit"
                          onClick={() =>
                            navigate(
                              `/saria/data-nikah-rujuk/bulanan/${bulandata.nama_bulan}/${bulandata.no}`
                            )
                          }
                        >
                          <IoSettings color="white" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "tahunan" && (
        <div>
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
                {tahun.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">{index + 1}</td>
                    <td className="py-3 px-6 text-left">{item?.nama_bulan}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <button
                          className="p-2 border border-gray-100 rounded bg-gray-600 hover:bg-gray-500 ml-2"
                          title="Edit"
                          onClick={() =>
                            navigate(
                              `/saria/data-nikah-rujuk/tahunan/${item?.nama_bulan}/`
                            )
                          }
                        >
                          <IoSettings color="white" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataNikahRujuk;
