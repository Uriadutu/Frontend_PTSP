import React from "react";
import { formatRupiah } from "../../utils/helper";

const NRBulananPDF = React.forwardRef(({ nrbulanan, tahun, bulan }, ref) => {
  let totalJumlahNikah = 0;
  let totalIsbatNikah = 0;
  let totalRujuk = 0;
  let totalKantor = 0;
  let totalLuarKantor = 0;
  let totalNasab = 0;
  let totalHakim = 0;
  let totalCampuran = 0;
  let totalPoligami = 0;
  let totalPriaA = 0;
  let totalPriaB = 0;
  let totalPriaC = 0;
  let totalWanitaA = 0;
  let totalWanitaB = 0;
  let totalWanitaC = 0;
  let totalSuamiSD = 0;
  let totalIstriSD = 0;
  let totalSuamiSMP = 0;
  let totalIstriSMP = 0;
  let totalSuamiSMA = 0;
  let totalIstriSMA = 0;
  let totalSuamiS1 = 0;
  let totalIstriS1 = 0;
  let totalSuamiS1Plus = 0;
  let totalIstriS1Plus = 0;
  let totalPNBP = 0;
  return (
    <div ref={ref} className="px-1 pl-4 pr-3 mx-5 mt-10 printable-content">
      <div className="flex items-center justify-center mb-5 pb-4">
        <div className="w-full uppercase font-semibold text-center items-center flex justify-center ">
          REKAPITULASI DATA NIKAH RUJUK
          <br />
          KABUPATEN HALMAHERA BARAT
          <br />
          BULAN {bulan} Tahun {tahun}
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-left mb-1">Layanan Seksi Bimas Islam (Saria)</h1>
      </div>

      <table className="mt-5 min-w-full bg-white border border-black">
        <thead className="font-light">
          <tr className="text-black uppercase text-xs  leading-normal">
            <th
              rowSpan="3"
              className="font-light px-1 text-center border border-black"
            >
              No
            </th>
            <th
              rowSpan="3"
              className="font-light px-1 text-center border border-black"
            >
              Kecamatan
            </th>
            <th
              rowSpan="3"
              className="font-light px-1 text-center border border-black"
            >
              Jumlah Nikah
            </th>
            <th
              rowSpan="3"
              className="font-light px-1 text-center border border-black"
            >
              Isbat Nikah
            </th>
            <th
              rowSpan="3"
              className="font-light px-1 text-center border border-black"
            >
              Rujuk
            </th>
            <th
              colSpan="2"
              className="font-light px-1 text-center border border-black"
            >
              Tempat Nikah
            </th>
            <th
              colSpan="2"
              className="font-light px-1 text-center border border-black"
            >
              Wali Hakim
            </th>
            <th
              colSpan="10"
              className="font-light text-center border border-black"
            >
              Nikah
            </th>
            <th
              colSpan="10"
              className="font-light text-center border border-black"
            >
              Pendidikan Suami/Istri
            </th>
            <th
              rowSpan="3"
              className="font-light px-1 text-center border border-black"
            >
              Total PNBP
            </th>
          </tr>
          <tr className="text-black uppercase text-sm leading-normal">
            <th
              rowSpan="2"
              className="font-light px-1 text-center border border-black"
            >
              Kantor
            </th>
            <th
              rowSpan="2"
              className="font-light px-1 text-center border border-black"
            >
              Luar Kantor
            </th>
            <th
              rowSpan="2"
              className="font-light px-1 text-center border border-black"
            >
              Hakim
            </th>
            <th
              rowSpan="2"
              className="font-light px-1 text-center border border-black"
            >
              Nasab
            </th>
            <th
              rowSpan="2"
              className="font-light px-1 text-center border border-black"
            >
              Camp-uran
            </th>
            <th
              rowSpan="2"
              className="font-light px-1 text-center border border-black"
            >
              Poli-gami
            </th>
            <th
              colSpan="8"
              className="font-light px-1 text-center border border-black"
            >
              Bawah Umur
            </th>
            <th
              colSpan={2}
              rowSpan="1"
              className="font-light px-1 text-center border border-black"
            >
              SD/MI
            </th>
            <th
              rowSpan="1"
              colSpan={2}
              className="font-light px-1 text-center border border-black"
            >
              SMP/MTS
            </th>
            <th
              colSpan={2}
              rowSpan="1"
              className="font-light px-1 text-center border border-black"
            >
              SMA/MA
            </th>
            <th
              colSpan={2}
              rowSpan="1"
              className="font-light px-1 text-center border border-black"
            >
              S1
            </th>
            <th
              colSpan={2}
              rowSpan="1"
              className="font-light px-1 text-center border border-black"
            >
              S1+
            </th>
          </tr>
          <tr className="text-black uppercase text-sm leading-normal">
            <th className="px-1 font-light text-center border border-black">
              Pria
            </th>
            <th className="px-1 font-light text-center border border-black">
              Pria {"<18"}
            </th>
            <th className="px-1 font-light text-center border border-black">
              Pria {"19-21"}
            </th>
            <th className="px-1 font-light text-center border border-black">
              Pria {">21"}
            </th>
            <th className="px-1 font-light text-center border border-black">
              Wanita
            </th>
            <th className="px-1 font-light text-center border border-black">
              wanita {"<18"}
            </th>
            <th className="px-1 font-light text-center border border-black">
              wanita {"19-21"}
            </th>
            <th className="px-1 font-light text-center border border-black">
              wanita {">21"}
            </th>
            <th className="px-1 font-light text-center border border-black">
              Pria
            </th>
            <th className="px-1 font-light text-center border border-black">
              Wanita
            </th>
            <th className="px-1 font-light text-center border border-black">
              Pria
            </th>
            <th className="px-1 font-light text-center border border-black">
              Wanita
            </th>
            <th className="px-1 font-light text-center border border-black">
              Pria
            </th>
            <th className="px-1 font-light text-center border border-black">
              Wanita
            </th>
            <th className="px-1 font-light text-center border border-black">
              Pria
            </th>
            <th className="px-1 font-light text-center border border-black">
              Wanita
            </th>
            <th className="px-1 font-light text-center border border-black">
              Pria
            </th>
            <th className="px-1 font-light text-center border border-black">
              Wanita
            </th>
          </tr>
        </thead>
        <tbody className="text-black text-xs font-light">
          {nrbulanan.map((bulandata, index) => {
            totalJumlahNikah += bulandata.jumlahNikah;
            totalIsbatNikah += bulandata.isbatNikah;
            totalRujuk += bulandata.rujuk;
            totalKantor += bulandata.kantor;
            totalLuarKantor += bulandata.luarKantor;
            totalNasab += bulandata.nasab;
            totalHakim += bulandata.hakim;
            totalCampuran += bulandata.campuran;
            totalPoligami += bulandata.poligami;
            totalPriaA += bulandata.priaA;
            totalPriaB += bulandata.priaB;
            totalPriaC += bulandata.priaC;
            totalWanitaA += bulandata.wanitaA;
            totalWanitaB += bulandata.wanitaB;
            totalWanitaC += bulandata.wanitaC;
            totalSuamiSD += bulandata.suamiSD;
            totalIstriSD += bulandata.istriSD;
            totalSuamiSMP += bulandata.suamiSMP;
            totalIstriSMP += bulandata.istriSMP;
            totalSuamiSMA += bulandata.suamiSMA;
            totalIstriSMA += bulandata.istriSMA;
            totalSuamiS1 += bulandata.suamiS1;
            totalIstriS1 += bulandata.istriS1;
            totalSuamiS1Plus += bulandata.suamiS1Plus;
            totalIstriS1Plus += bulandata.istriS1Plus;
            totalPNBP += parseInt(bulandata.totalPNBP);

            return (
              <tr key={bulandata.id} className="border-b border-black">
                <td className="px-1 text-center border border-black text-black">
                  {index + 1}
                </td>
                <td className="px-1 text-left border border-black text-black">
                  {bulandata.nama_kecamatan}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.jumlahNikah}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.isbatNikah}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.rujuk}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.kantor}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.luarKantor}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.nasab}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.hakim}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.campuran}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.poligami}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.priaA + bulandata.priaB + bulandata.priaC}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.priaA}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.priaB}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.priaC}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.wanitaA + bulandata.wanitaB + bulandata.wanitaC}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.wanitaA}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.wanitaB}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.wanitaC}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.suamiSD}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.istriSD}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.suamiSMP}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.istriSMP}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.suamiSMA}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.istriSMA}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.suamiS1}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.istriS1}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.suamiS1Plus}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {bulandata.istriS1Plus}
                </td>
                <td className="px-1 text-center border border-black text-black">
                  {formatRupiah(bulandata.totalPNBP)}
                </td>
              </tr>
            );
          })}
          <tr className="border-b bg-gray-300 border-black">
            <td
              colSpan={2}
              className="px-1 text-left border border-black text-black"
            >
              Jumlah
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalJumlahNikah}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalIsbatNikah}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalRujuk}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalKantor}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalLuarKantor}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalNasab}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalHakim}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalCampuran}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalPoligami}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalPriaA + totalPriaB + totalPriaC}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalPriaA}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalPriaB}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalPriaC}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalWanitaA + totalWanitaB + totalWanitaC}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalWanitaA}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalWanitaB}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalWanitaC}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalSuamiSD}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalIstriSD}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalSuamiSMP}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalIstriSMP}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalSuamiSMA}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalIstriSMA}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalSuamiS1}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalIstriS1}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalSuamiS1Plus}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {totalIstriS1Plus}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {formatRupiah(totalPNBP)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default NRBulananPDF;
