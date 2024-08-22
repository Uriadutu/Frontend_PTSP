import React from "react";
import logoKemenag from "../../img/depag.png";
import { tanggalPDF } from "../../utils/helper";

const GerejaPDF = React.forwardRef(({ gereja }, ref) => {
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
      <h1 className="text-center mb-2">DATA RUMAH IBADAH</h1>
      <div className="mt-4">
        <h1 className="text-left mb-1">
          Layanan Seksi Bimas Kristen (Paludi)
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
              Nama Gereja
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nomor Lapor
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Ijin
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nomor IMB
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Gedung
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Tanah
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Luas Bangunan
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Luas Tanah
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Tahun Berdiri
            </th>
          </tr>
        </thead>
        <tbody>
          {gereja.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="border border-gray-300 p-2 text-left">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nama_gereja}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.no_lapor}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.status_ijin}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.nomor_ibm}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.status_gedung}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.status_tanah}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.luas_bangunan}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.luas_tanah}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.tahun_berdiri}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default GerejaPDF;
