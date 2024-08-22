import React from "react";
import logoKemenag from "../../img/depag.png";
import { tanggalPDF } from "../../utils/helper";

const AkademikPDF = React.forwardRef(({ akademik }, ref) => {
  if (!akademik || akademik.length === 0) {
    return null;
  }

  // Group data by supervisor
  const groupedData = akademik.reduce((acc, item) => {
    const idPegawai = item.id_pegawai;
    if (!acc[idPegawai]) {
      acc[idPegawai] = {
        namaPegawai: item.Pegawai.nama_pegawai,
        NIP: item.Pegawai.NIP,
        rows: [],
      };
    }
    acc[idPegawai].rows.push(item);
    return acc;
  }, {});

  return (
    <div ref={ref} className="py-3 pl-4 pr-3 mx-5 mt-10">
      <div className="flex items-center justify-center mb-5 pb-4 border-b-2 border-separate border-black">
        <div className="flex items-end w-full relative">
          <div className="absolute left-0">
            <img src={logoKemenag} alt="" className="w-[80px]" />
          </div>
          <div className="w-full flex justify-center ">
            <div className="">
              <h1 className="text-center text-xl font-bold ">
                Kantor Kementrian Agama Kabupaten Halmahera Barat
              </h1>
              <p className="text-center">
                Jln. Pengabdian Nomor 03 Kompleks Kantor Bupati Jailolo 97752
              </p>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-center mb-2">DATA PENDAMPINGAN AKADEMIK</h1>
      <div className="mt-4">
        <h1 className="text-left mb-1">Layanan Kepengawasan (Sidika)</h1>
        <h1 className="text-left">
          Tanggal <span className="ml-4">: {tanggalPDF(new Date())}</span>
        </h1>
      </div>

      {Object.values(groupedData).map((group, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-left mb-2 text-lg font-semibold">
            {group.NIP} - {group.namaPegawai}
          </h2>
          <table className="w-full border-collapse text-sm mb-4">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  No
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  NIP
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Nama Sekolah
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Status Akademik
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Jumlah Peserta
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2 text-left">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.Pegawai.NIP}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.nama_sekolah}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.status_akademik}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.jumlah_peserta}
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

export default AkademikPDF;
