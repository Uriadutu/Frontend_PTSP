import React from "react";
import logoKemenag from "../../img/depag.png";
import { tanggalPDF } from "../../utils/helper";

const DataUmatPaludiPDF = React.forwardRef(({ umat }, ref) => {
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
      <h1 className="text-center mb-2">DATA UMAT</h1>
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
              Nama Pimpinan
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Denominasi
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jumlah Umat
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jumlah Pria
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jumlah Wanita
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Desa
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Kecamatan
            </th>
          </tr>
        </thead>
        <tbody>
          {umat.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="border border-gray-300 p-2 text-left">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nama_gereja}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.nama_pimpinan}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.demonisasi}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.jumlah_umat}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.jumlah_pria}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.jumlah_wanita}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.nama_desa}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.kecamatan}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default DataUmatPaludiPDF;
