import React from "react";
import logoKemenag from "../../img/depag.png";
import { tanggalPDF } from "../../utils/helper";

const MenejerialPDF = React.forwardRef(({ menejerial }, ref) => {
  if (!menejerial || menejerial.length === 0) {
    return null;
  }

  // Group the menejerial data by id_pegawai
  const groupedByPegawai = menejerial.reduce((acc, item) => {
    const { id_pegawai, Pegawai } = item;
    if (!acc[id_pegawai]) {
      acc[id_pegawai] = {
        namaPegawai: Pegawai?.nama_pegawai || "Nama Pegawai Tidak Tersedia",
        NIP: Pegawai?.NIP || "Nama Pegawai Tidak Tersedia",
        data: [],
      };
    }
    acc[id_pegawai].data.push(item);
    return acc;
  }, {});

  return (
    <div ref={ref} className="py-3 pl-4 pr-3 mx-5 mt-10">
      <div className="flex items-center justify-center mb-5 pb-4 border-b-2 border-separate border-black">
        <div className="flex items-end w-full relative">
          <div className="absolute left-0">
            <img src={logoKemenag} alt="" className="w-[80px]" />
          </div>
          <div className="w-full flex justify-center">
            <div className="">
              <h1 className="text-center text-xl font-bold">
                Kantor Kementrian Agama Kabupaten Halmahera Barat
              </h1>
              <p className="text-center">
                Jln. Pengabdian Nomor 03 Kompleks Kantor Bupati Jailolo 97752
              </p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-center mb-2">DATA PENDAMPINGAN MENEJERIAL</h1>
      <div className="mt-4">
        <h1 className="text-left mb-1">Layanan Kepengawasan (Sidika)</h1>
        <h1 className="text-left">
          Tanggal <span className="ml-4">: {tanggalPDF(new Date())}</span>
        </h1>
      </div>

      {Object.values(groupedByPegawai).map((pegawaiGroup, idx) => (
        <div key={idx} className="mt-6">
          <h2 className="text-left font-semibold mb-2">
            {pegawaiGroup.NIP} - {pegawaiGroup.namaPegawai}
          </h2>
          <table className="w-full border-collapse text-sm mt-2">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  No
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Nama Sekolah
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Kepala Sekolah
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Bersertifikat
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Status Pegawai
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody>
              {pegawaiGroup.data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2 text-left">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.nama_sekolah}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.nama_kepsek}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.status_sertifikat}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.status_pegawai}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.keterangan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
});

export default MenejerialPDF;
