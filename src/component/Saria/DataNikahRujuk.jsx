import React, { useState } from "react";
import { IoSettings, IoDocument } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const DataNikahRujuk = () => {
  const [activeTab, setActiveTab] = useState("bulanan");
  const navigate = useNavigate()

  const bulan = [
    {
    no : 1,
    nama_bulan : "Januari",
    totalData : "0",
  },
  { 
    no : 2,
    nama_bulan : "Febuari",
    totalData : 0,
  },
  {
    no : 3,
    nama_bulan : "Maret",
    totalData : 0,
  },
  {
    no : 4,
    nama_bulan : "April",
    totalData : 0,
  },
  {
    no : 5,
    nama_bulan : "Mei",
    totalData : 0,
  },
  {
    no : 6,
    nama_bulan : "Juni",
    totalData : 0,
  },
  {
    no : 7,
    nama_bulan : "Juli",
    totalData : 0,
  },
  {
    no : 8,
    nama_bulan : "Agustus",
    totalData : 0,
  },
  {
    no : 9,
    nama_bulan : "September",
    totalData : 0,
  },
  {
    no : 10,
    nama_bulan : "Oktober",
    totalData : 0,
  },
  {
    no : 11,
    nama_bulan : "November",
    totalData : 0,
  },
  {
    no : 12,
    nama_bulan : "Desember",
    totalData : 0,
  }
]

  return (
    <div className="contain">
      <h1 className="judul mb-4">Info Haji</h1>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {activeTab === "bulanan" && (
            <div className="flex items-center space-x-2">
              <button className="btn-pdf hidden sm:block">Print PDF</button>
              <button className="btn-pdf sm:hidden block">
                <IoDocument color="white" />
              </button>
            </div>
          )}
          {activeTab === "tahunan" && (
            <div className="flex items-center gap-2">
              <button className="btn-pdf hidden sm:block">Print PDF</button>
              <button className="btn-pdf sm:hidden block">
                <IoDocument color="white" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="tabs-container mt-3">
        <div className="tabs">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
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
                  <th className="py-3 px-6 text-left">Total Data</th>
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
                    <td className="py-3 px-6 text-left">
                      {bulandata.totalData}
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
                  <th className="py-3 px-6 text-left">Jumlah Jamaah</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">1</td>
                  <td className="py-3 px-6 text-left">2002</td>
                  <td className="py-3 px-6 text-left">21</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataNikahRujuk;
