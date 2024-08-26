import React from "react";
import { useParams } from "react-router-dom";

const NRTahunanPDF = React.forwardRef(({ tahunan }, ref) => {
  const {tahun} = useParams();
  let TotalDiKantor = 0;
  let TotalDiLuarKantor = 0;
  let TotalIsbatNikah = 0;
  let TotalCerai = 0;
  let TotalTotalNR = 0;
  let TotalTotalPNBP = 0;
  return (
    <div ref={ref} className="px-1 pl-4 pr-3 mx-5 mt-10 printable-content">
      <div className="flex bulandatas-center justify-center mb-5 pb-4">
        <div className="w-full uppercase font-semibold text-center bulandatas-center flex justify-center ">
          LAPORAN REKAPAN NIKAH/RUJUK, ISBAT DAN CERAI
          <br />
          KANTOR KEMENTERIAN AGAMA KAB. HALMAHERA BARAT<br />
          Tahun {tahun}
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-left mb-1">Layanan Seksi Bimas Islam (Saria)</h1>
      </div>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className=" text-black uppercase text-sm leading-normal">
            <th
              rowSpan={2}
              className="py-1 px-6 text-center border border-black"
            >
              No
            </th>
            <th
              rowSpan={2}
              className="py-1 px-6 text-center border border-black"
            >
              Nama Kecamatan
            </th>
            <th
              colSpan={4}
              className="py-1 px-6 text-center border border-black"
            >
              Jumlah Peristiwa N/R
            </th>
            <th
              rowSpan={2}
              className="py-1 px-6 text-center border border-black"
            >
              Total N/R
            </th>
            <th
              rowSpan={2}
              className="py-1 px-6 text-center border border-black"
            >
              Total PNBP NR (RP)
            </th>
          </tr>
          <tr className=" text-black uppercase text-sm leading-normal">
            <th className="py-1 px-6 text-center border border-black">
              Di Kantor
            </th>
            <th className="py-1 px-6 text-center border border-black">
              Di Luar Kantor
            </th>
            <th className="py-1 px-6 text-center border border-black">
              Isbat Nikah
            </th>
            <th className="py-1 px-6 text-center border border-black">
              Cerai
            </th>
          </tr>
        </thead>
        <tbody className="text-black text-sm">
          {tahunan.map((bulandata, index) => {
            TotalDiKantor += bulandata.di_kantor;
            TotalDiLuarKantor += bulandata.di_luar_kantor;
            TotalIsbatNikah += bulandata.isbat_nikah;
            TotalCerai += bulandata.cerai;
            TotalTotalNR += bulandata.total_nr;
            TotalTotalPNBP += bulandata.total_pnbp;
            return (
              <tr
                key={bulandata.id}
                className=""
              >
                <td className="py-1 px-6 text-center border border-black">{index + 1}</td>
                <td className="py-1 px-6 text-center border border-black">
                  {bulandata?.nama_kecamatan}
                </td>
                <td className="py-1 px-6 text-center border border-black">
                  {bulandata?.di_kantor}
                </td>
                <td className="py-1 px-6 text-center border border-black">
                  {bulandata?.di_luar_kantor}
                </td>
                <td className="py-1 px-6 text-center border border-black">
                  {bulandata?.isbat_nikah}
                </td>
                <td className="py-1 px-6 text-center border border-black">{bulandata?.cerai}</td>
                <td className="py-1 px-6 text-center border border-black">
                  {bulandata?.total_nr}
                </td>
                <td className="py-1 px-6 text-center border border-black">
                  {bulandata?.total_pnbp}
                </td>
              </tr>
            );
          })}
          <tr className="border border-black">
            <td
              colSpan={2}
              className="px-1 text-center border border-black text-black"
            >
              Jumlah
            </td>
            <td className="px-1 text-center border border-black text-black">
              {TotalDiKantor}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {TotalDiLuarKantor}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {TotalIsbatNikah}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {TotalCerai}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {TotalTotalNR}
            </td>
            <td className="px-1 text-center border border-black text-black">
              {TotalTotalPNBP}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default NRTahunanPDF;
