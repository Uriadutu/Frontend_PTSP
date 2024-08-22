import React from "react";
import logoKemenag from "../../img/depag.png";
import { tanggalPDF } from "../../utils/helper";

const DataGuruPakPDF = React.forwardRef(({ pak }, ref) => {
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
      <h1 className="text-center mb-2">DATA GURU PAK</h1>
      <div className="mt-4">
        <h1 className="text-left mb-1">Layanan Seksi Bimas Kristen (Paludi)</h1>
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
              Tempat Tugas
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              NIP
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Guru
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Status Pegawai
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Kategori Guru
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jenis Guru
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Pangkat
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jabatan
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Tanggal Mulai
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Tempat Lahir
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Tanggal Lahir
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jenis Kelamin
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Pendidikan Terakhir
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jurusan
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Tahun Lulus
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              No Telepon
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {pak.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="border border-gray-300 p-2 text-left">
                  {index + 1}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.SekolahKristen && item.SekolahKristen.nama_sekolah}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.nip_guru}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.nama_guru}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.status_pegawai}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.kategori_guru}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.jenis_guru}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.pangkat_gol}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.jabatan}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.tgl_mulai_kerja}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.tempat_lahir}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.tanggal_lahir}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.jenis_kelamin}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.pendidikan_terakhir}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.jurusan}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.tahun_lulus}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.no_telp}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item && item.email}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default DataGuruPakPDF;
