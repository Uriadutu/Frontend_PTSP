import React from "react";
import logoKemenag from "../../img/depag.png";
import { tanggalPDF } from "../../utils/helper";

const InfoHajiPDF = React.forwardRef(({ haji }, ref) => {
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
      <h1 className="text-center mb-2">INFO KEBERANGKATAN HAJI DAN UMRAH</h1>
      <div className="mt-4">
        <h1 className="text-left mb-1">
          Layanan Seksi Penyelenggara Haji dan Umrah (Akesahu)
        </h1>
        <h1 className="text-left">
          Tanggal <span className="ml-4">: {tanggalPDF(new Date())}</span>
        </h1>
      </div>

      <table className="w-full border-collapse text-sm mt-6">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              No
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nomor Porsi
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Tanggal Daftar
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Jamaah Haji
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jenis Kelamin
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Keberangkatan
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Tanggal Berangkat
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Tahun Berangkat
            </th>
          </tr>
        </thead>
        <tbody>
          {haji.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="border border-gray-300 p-2 text-left">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nomor_porsi}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.tanggal_porsi}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nama_jamaah}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.jenis_kelamin}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.status_keberangkatan}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.tgl_berangkat}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.tahun_berangkat}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default InfoHajiPDF;
