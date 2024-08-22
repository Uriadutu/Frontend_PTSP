import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SekolahPDF from "../../Export/PantaiDisaExport/SekolahPDF";
import { useReactToPrint } from "react-to-print";
import { IoDocument } from "react-icons/io5";

const DataSekolah = () => {
  const [activeJenjang, setActiveJenjang] = useState(null);
  const [totalRA, setTotalRA] = useState(0);
  const [totalSD, setTotalSD] = useState(0);
  const [totalSMP, setTotalSMP] = useState(0);
  const [totalSMA, setTotalSMA] = useState(0);
  //====================================
  const [totalRAN, setTotalRAN] = useState(0);
  const [totalRAS, setTotalRAS] = useState(0);
  const [totalRAP, setTotalRAP] = useState(0);
  const [totalRAM, setTotalRAM] = useState(0);
  const [totalSDN, setTotalSDN] = useState(0);
  const [totalSDS, setTotalSDS] = useState(0);
  const [totalSDP, setTotalSDP] = useState(0);
  const [totalSDM, setTotalSDM] = useState(0);
  const [totalSMPN, setTotalSMPN] = useState(0);
  const [totalSMPS, setTotalSMPS] = useState(0);
  const [totalSMPP, setTotalSMPP] = useState(0);
  const [totalSMPM, setTotalSMPM] = useState(0);
  const [totalSMAN, setTotalSMAN] = useState(0);
  const [totalSMAS, setTotalSMAS] = useState(0);
  const [totalSMAP, setTotalSMAP] = useState(0);
  const [totalSMAM, setTotalSMAM] = useState(0);
  const navigate = useNavigate();
  const ComponentToPDF = useRef();

  const toggleSubMenu = (jenjang) => {
    setActiveJenjang((prevJenjang) =>
      prevJenjang === jenjang ? null : jenjang
    );
  };

  const navigateToSekolah = (jenjang, type) => {
    navigate(`/pantai-disa/data-sekolah/${jenjang}/${type}`);
  };

  const dataSekolah = [
    {
      no: 1,
      jenjang: "Raudhatul Athfal (RA)",
      value: "raudhatul-athfal",
      total: totalRA,
      subTotal: {
        negeri: totalRAN,
        swasta: totalRAS,
        pondokPesantren: totalRAP,
        madin: totalRAM,
      },
    },
    {
      no: 2,
      jenjang: "Madrasah Ibtidaiyah (MI)",
      value: "madrasah-ibtidaiyah",
      total: totalSD,
      subTotal: {
        negeri: totalSDN,
        swasta: totalSDS,
        pondokPesantren: totalSDP,
        madin: totalSDM,
      },
    },
    {
      no: 3,
      jenjang: "Madrasah Tsanawiyah (MTs)",
      value: "madrasah-tsanawiyah",
      total: totalSMP,
      subTotal: {
        negeri: totalSMPN,
        swasta: totalSMPS,
        pondokPesantren: totalSMPP,
        madin: totalSMPM,
      },
    },
    {
      no: 4,
      jenjang: "Madrasah Aliyah (MA)",
      value: "madrasah-aliyah",
      total: totalSMA,
      subTotal: {
        negeri: totalSMAN,
        swasta: totalSMAS,
        pondokPesantren: totalSMAP,
        madin: totalSMAM,
      },
    },
  ];

  const getJumlahSekolah = async (jenjang, setter) => {
    try {
      const response = await fetch(
        `http://localhost:5000/sekolah/jumlah/${jenjang}`
      );
      const data = await response.json();
      setter(data.length);
    } catch (error) {
      console.error(`Error fetching ${jenjang} data: `, error);
    }
  };

  const getJumlahSekolahPerStatus = async (status, setter) => {
    const response = await fetch(
      `http://localhost:5000/sekolah/status/${status}`
    );
    const data = await response.json();
    setter(data.length);
  };

  useEffect(() => {
    getJumlahSekolahPerStatus("raudhatul-athfalnegeri", setTotalRAN);
    getJumlahSekolahPerStatus("raudhatul-athfalswasta", setTotalRAS);
    getJumlahSekolahPerStatus("raudhatul-athfalpondok-pesantren", setTotalRAP);
    getJumlahSekolahPerStatus("raudhatul-athfalmadrasa-diniyah", setTotalRAM);

    getJumlahSekolahPerStatus("madrasah-ibtidaiyahnegeri", setTotalSDN);
    getJumlahSekolahPerStatus("madrasah-ibtidaiyahswasta", setTotalSDS);
    getJumlahSekolahPerStatus(
      "madrasah-ibtidaiyahpondok-pesantren",
      setTotalSDP
    );
    getJumlahSekolahPerStatus(
      "madrasah-ibtidaiyahmadrasa-diniyah",
      setTotalSDM
    );
    getJumlahSekolahPerStatus("madrasah-tsanawiyahnegeri", setTotalSMPN);
    getJumlahSekolahPerStatus("madrasah-tsanawiyahswasta", setTotalSMPS);
    getJumlahSekolahPerStatus(
      "madrasah-tsanawiyahpondok-pesantren",
      setTotalSMPP
    );
    getJumlahSekolahPerStatus(
      "madrasah-tsanawiyahmadrasa-diniyah",
      setTotalSMPM
    );
    getJumlahSekolahPerStatus("madrasah-aliyahnegeri", setTotalSMAN);
    getJumlahSekolahPerStatus("madrasah-aliyahswasta", setTotalSMAS);
    getJumlahSekolahPerStatus("madrasah-aliyahpondok-pesantren", setTotalSMAP);
    getJumlahSekolahPerStatus("madrasah-aliyahmadrasa-diniyah", setTotalSMAM);
  }, [
    setTotalRAN,
    setTotalRAS,
    setTotalRAP,
    setTotalRAM,
    setTotalSDN,
    setTotalSDS,
    setTotalSDP,
    setTotalSDM,
    setTotalSMPN,
    setTotalSMPS,
    setTotalSMPP,
    setTotalSMPM,
    setTotalSMAN,
    setTotalSMAS,
    setTotalSMAP,
    setTotalSMAM,
  ]);

  useEffect(() => {
    getJumlahSekolah("raudhatul-athfal", setTotalRA);
    getJumlahSekolah("madrasah-ibtidaiyah", setTotalSD);
    getJumlahSekolah("madrasah-tsanawiyah", setTotalSMP);
    getJumlahSekolah("madrasah-aliyah", setTotalSMA);
  }, [setTotalRA, setTotalSD, setTotalSMP, setTotalSMA]);

  const printPDF = useReactToPrint({
    content: () => ComponentToPDF.current,
    documentTitle: `DataSekolah(pantai_disa).pdf`,
  });

  return (
    <div className="contain">
      <div style={{ display: "none" }}>
        <SekolahPDF ref={ComponentToPDF} />
      </div>
      <h1 className="judul">Data Sekolah</h1>
      <button onClick={printPDF} className="btn-pdf hidden sm:block">
        Print PDF
      </button>
      <button onClick={printPDF} className="btn-pdf sm:hidden block">
        <IoDocument color="white" />
      </button>
      <div className="mt-2 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left whitespace-nowrap">No</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Jenjang Sekolah
              </th>
              <th className="py-3 px-6 text-center whitespace-nowrap">
                Jumlah Sekolah
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {dataSekolah.map((item, index) => (
              <React.Fragment key={index}>
                <tr
                  className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                  onClick={() => toggleSubMenu(item.value)}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {item.no}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {item.jenjang}
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    Total ({item.total})
                  </td>
                </tr>
                {activeJenjang === item.value && (
                  <>
                    <tr className="bg-gray-100 hover:bg-gray-200 transition-colors">
                      <td className="py-3 px-6 text-left whitespace-nowrap"></td>
                      <td
                        className="py-3 px-6 text-left whitespace-nowrap cursor-pointer"
                        onClick={() => navigateToSekolah(item.value, "negeri")}
                      >
                        Negeri
                      </td>
                      <td className="py-3 px-6 text-center whitespace-nowrap">
                        {item.subTotal.negeri}
                      </td>
                    </tr>
                    <tr className="bg-gray-100 hover:bg-gray-200 transition-colors">
                      <td className="py-3 px-6 text-left whitespace-nowrap"></td>
                      <td
                        className="py-3 px-6 text-left whitespace-nowrap cursor-pointer"
                        onClick={() => navigateToSekolah(item.value, "swasta")}
                      >
                        Swasta
                      </td>
                      <td className="py-3 px-6 text-center whitespace-nowrap">
                        {item.subTotal.swasta}
                      </td>
                    </tr>
                    <tr className="bg-gray-100 hover:bg-gray-200 transition-colors">
                      <td className="py-3 px-6 text-left whitespace-nowrap"></td>
                      <td
                        className="py-3 px-6 text-left whitespace-nowrap cursor-pointer"
                        onClick={() =>
                          navigateToSekolah(item.value, "pondok-pesantren")
                        }
                      >
                        Pondok Pesantren
                      </td>
                      <td className="py-3 px-6 text-center whitespace-nowrap">
                        {item.subTotal.pondokPesantren}
                      </td>
                    </tr>
                    <tr className="bg-gray-100 hover:bg-gray-200 transition-colors">
                      <td className="py-3 px-6 text-left whitespace-nowrap"></td>
                      <td
                        className="py-3 px-6 text-left whitespace-nowrap cursor-pointer"
                        onClick={() =>
                          navigateToSekolah(item.value, "madrasa-diniyah")
                        }
                      >
                        Madrasa Diniyah
                      </td>
                      <td className="py-3 px-6 text-center whitespace-nowrap">
                        {item.subTotal.madin}
                      </td>
                    </tr>
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataSekolah;
