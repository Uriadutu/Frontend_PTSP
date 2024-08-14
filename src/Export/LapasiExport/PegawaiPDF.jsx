import React, { useEffect, useState } from "react";
import logoKemenag from "../../img/depag.png";

const PegawaiPDF = React.forwardRef(({ pegawai }, ref) => {
  const [masaKerja, setMasaKerja] = useState("");
  
  const calculateMasaKerja = (tmtPengangkatan) => {
    const tmtDate = dayjs(tmtPengangkatan);
    const now = dayjs();
    let diffYears = now.diff(tmtDate, "year");
    tmtDate.add(diffYears, "year");
    let diffMonths = now.diff(tmtDate, "month");

    if (diffMonths >= 12) {
      const extraYears = Math.floor(diffMonths / 12);
      diffYears += extraYears;
      diffMonths %= 12;
    }

    let result = "";
    if (diffYears > 0) {
      result += `${diffYears} tahun `;
    }
    if (diffMonths > 0) {
      result += `${diffMonths} bulan`;
    }

    setMasaKerja(result.trim());
  };
  useEffect(()=> {
    calculateMasaKerja(pegawai.tmt_pengangkatan)
  }, [pegawai.tmt_pengangkatan])


  return (
    <div ref={ref} className="py-3 pl-4 pr-3 mx-5 mt-10">
      <div className="flex items-center justify-center mb-5 pb-4 border-b-2 border-separate border-black">
        <div className="flex items-end w-full relative">
          <div className="absolute left-0">
            <img src={logoKemenag} alt="" className="w-[80px]" />
          </div>
          <div className="w-full flex justify-center ">
            <div className="">
              <h1 className="text-center text-xl font-bold upercase">
                Kantor Kementrian Agama Kabupaten Halmahera Barat
              </h1>
              <p className="text-center">
                Jln. Pengabdian Nomor 03 Kompleks Kantor Bupati Jailolo 97752
              </p>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-center mb-2">DATA PEGAWAI</h1>
      <div className="mt-4">
        <h1 className="text-left mb-1">
          Layanan Profesional Administrasi (Lapasi)
        </h1>
        <h1 className="text-left mb-2">
          Tanggal{" "}
          <span className="ml-4">: {new Date().toLocaleDateString()}</span>
        </h1>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              No
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              NIP
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jenis Pegawai
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Nama Pegawai
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Pangkat/Golongan
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Jabatan
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              TMT Terakhir
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              TMT Pengangkatan
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              Masa Kerja
            </th>
            <th className="border border-gray-300 p-2 text-left bg-gray-100">
              TMT Pensiun
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
              Janis Kelamin
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
              Satuan Kerja
            </th>
          </tr>
        </thead>
        <tbody>
          {pegawai.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-left">
                {index + 1}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.NIP}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.jenis_pegawai}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.nama_pegawai}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.pangkat_gol}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.jabatan}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.tmt_terakhir}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.tmt_pengangkatan}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {masaKerja}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.pend_terakhir}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.jurusan}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.tahun_lulus}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.jenis_kelamin}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.temp_lahir}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.tgl_lahir}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.agama}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {item.satuan_kerja}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default PegawaiPDF;
