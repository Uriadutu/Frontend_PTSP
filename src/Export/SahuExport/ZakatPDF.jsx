import React from "react";
import logoKemenag from "../../img/depag.png";
import { tanggalPDF } from "../../utils/helper";

const DataZakatPDF = React.forwardRef(({ zakat }, ref) => {
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
      <h1 className="text-center mb-2">DATA PENYALURAN DAN PENERIMA ZAKAT</h1>
      <div className="mt-4">
        <h1 className="text-left mb-1">Layanan Zakat dan Wakaf (Sahu)</h1>
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
              Kecamatan
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Kategori
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Sumber
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jumlah Sumber
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jenis
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Beras
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Uang
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Noinal Uang
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Sedekah
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jumlah Zakat
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Tahun Zakat
            </th>
          </tr>
        </thead>
        <tbody>
          {zakat.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="border border-gray-300 p-2 text-left">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.Kecamatan && item.Kecamatan.nama_kecamatan}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.kategori}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.sumber}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.jumlah_sumber}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.jenis}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.beras}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.uang}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.nominal_uang}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.sedekah}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.jumlah_zakat}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.tahun_zakat}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default DataZakatPDF;
