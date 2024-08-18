import React from "react";
import logoKemenag from "../../img/depag.png";
import { tanggalPDF } from "../../utils/helper";

const SatuanKerjaPDF = React.forwardRef(({ satker }, ref) => {
  return (
    <div ref={ref} className="py-3 pl-4 pr-3 mx-5 mt-10">
      <div className="flex items-center justify-center mb-5 pb-4 border-b-2 border-separate border-black">
        <div className="flex items-end w-full relative">
          <div className="absolute left-0">
            <img src={logoKemenag} alt="" className="w-[80px]" />
          </div>
          <div className="w-full flex justify-center ">
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
      <h1 className="text-center mb-2">DATA SATUAN KERJA</h1>
      <div className="mt-4">
        <h1 className="text-left mb-1">
          Layanan Profesional Administrasi (Lapasi)
        </h1>
        <h1 className="text-left mb-2">
          Tanggal{" "}
          <span className="ml-4">: {tanggalPDF(new Date())}</span>
        </h1>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              No
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Kode Satker
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Satker
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Alamat Satker
            </th>
          </tr>
        </thead>
        <tbody>
          {satker.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-left">
                {index + 1}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.kode_satker}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.nama_satker}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.alamat_satker}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default SatuanKerjaPDF;
