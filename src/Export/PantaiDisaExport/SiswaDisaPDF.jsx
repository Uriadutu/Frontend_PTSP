import React from "react";
import logoKemenag from "../../img/depag.png";
import { tanggalPDF } from "../../utils/helper";

const SiswaDisaPDF = React.forwardRef(({ siswa }, ref) => {
  // Mengelompokkan siswa berdasarkan sekolah
  const groupedBySchool = siswa.reduce((acc, item) => {
    if (!acc[item.id_sekolah]) {
      acc[item.id_sekolah] = {
        sekolah: item.Sekolah.nama_sekolah,
        data: [],
      };
    }
    acc[item.id_sekolah].data.push(item);
    return acc;
  }, {});

  const formatJenjangSekolah = (jenjang) => {
    if (!jenjang) return "";

    return jenjang
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
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
      <h1 className="text-center mb-2">DATA SISWA</h1>
      <div className="mt-4">
        <h1 className="text-left mb-1">
          Layanan Seksi Pendidikan Islam (Pantai Disa)
        </h1>
        <h1 className="text-left mb-2">
          Tanggal <span className="ml-4">: {tanggalPDF(new Date())}</span>
        </h1>
      </div>
      {Object.values(groupedBySchool).map((schoolGroup, index) => (
        <div key={index} className="mb-10">
          <h1 className="text-left mt-4 text-xl font-bold">
            {schoolGroup.sekolah}
          </h1>
          <h2 className="text-left text-xl mb-4">
            {schoolGroup.data.length > 0
              ? formatJenjangSekolah(schoolGroup.data[0].jenjang_sekolah)
              : ""}{" "}
            - ({" "}
            {schoolGroup.data.length > 0
              ? schoolGroup.data[0].Sekolah.s_sekolah
              : ""}
            )
          </h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  No
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Tahun Ajaran
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Nomor Induk
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  NISN
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Nama Siswa
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Jenis Kelamin
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Tempat Lahir
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Tanggal Lahir
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Agama
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Nama Ayah
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Pendidikan Ayah
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Pekerjaan Ayah
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Nama Ibu
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Pendidikan Ibu
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Pekerjaan Ibu
                </th>
                <th className="border border-gray-300 p-2 text-left bg-gray-100">
                  Alamat
                </th>
              </tr>
            </thead>
            <tbody>
              {schoolGroup.data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2 text-left">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.tahun_ajaran}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.nomor_induk}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.NISN}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.nama_siswa}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.jenis_kelamin}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.tempat_lahir}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.tanggal_lahir}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.agama}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.nama_ayah}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.pendidikan_ayah}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.pekerjaan_ayah}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.nama_ibu}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.pendidikan_ibu}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.pekerjaan_ibu}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {item.alamat}
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

export default SiswaDisaPDF;
