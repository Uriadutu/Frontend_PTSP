import React, { useEffect, useState } from "react";
import axios from "axios";

const AddPengawasModal = ({ setIsOpenModalAdd, getDataPengawas }) => {
  const [idPegawai, setIdPegawai] = useState("");
  const [jenisPengawas, setJenisPengawas] = useState("Madrasah");
  const [wilayahPengawas, setWilayahPengawas] = useState([""]);
  const [filteredPegawai, setFilteredPegawai] = useState([]);
  const [pegawai, setPegawai] = useState([]);
  const [msg, setMsg] = useState("");

  const [swastaRA, setSwastaRA] = useState([]);
  const [swastaSD, setSwastaSD] = useState([]);
  const [swastaSMP, setSwastaSMP] = useState([]);
  const [swastaSMA, setSwastaSMA] = useState([]);
  const [negeriRA, setNegeriRA] = useState([]);
  const [negeriSD, setNegeriSD] = useState([]);
  const [negeriSMP, setNegeriSMP] = useState([]);
  const [negeriSMA, setNegeriSMA] = useState([]);
  const [pesantrenRA, setPesantrenRA] = useState([]);
  const [pesantrenSD, setPesantrenSD] = useState([]);
  const [pesantrenSMP, setPesantrenSMP] = useState([]);
  const [pesantrenSMA, setPesantrenSMA] = useState([]);
  const [madrasahRA, setMadrasaRA] = useState([]);
  const [madrasahSD, setMadrasaSD] = useState([]);
  const [madrasahSMP, setMadrasaSMP] = useState([]);
  const [madrasahSMA, setMadrasaSMA] = useState([]);

  const [pakSDS, setPakSDS] = useState([]);
  const [pakSMPS, setPakSMPS] = useState([]);
  const [pakSMAS, setPakSMAS] = useState([]);

  const [pakSDN, setPakSDN] = useState([]);
  const [pakSMPN, setPakSMPN] = useState([]);
  const [pakSMAN, setPakSMAN] = useState([]);

  const getPegawai = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pegawai");
      setPegawai(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSwastaI = async (jenjang, set) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/sekolah/status/${jenjang}swasta`
      );
      set(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNegeriI = async (jenjang, set) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/sekolah/status/${jenjang}negeri`
      );
      set(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPondokPesantrenI = async (jenjang, set) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/sekolah/status/${jenjang}pondok-pesantren`
      );
      set(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMadrasa = async (jenjang, set) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/sekolah/status/${jenjang}madrasa-diniyah`
      );
      set(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPakSwasta = async (jenjang, set) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/sekolah-kristen/status/${jenjang}swasta`
      );
      set(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPakNegeri = async (jenjang, set) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/sekolah-kristen/status/${jenjang}negeri`
      );
      set(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //negeri
    getNegeriI("raudhatul-athfal", setNegeriRA);
    getNegeriI("madrasah-ibtidaiyah", setNegeriSD);
    getNegeriI("madrasah-tsanawiyah", setNegeriSMP);
    getNegeriI("madrasah-aliyah", setNegeriSMA);
    //swasta
    getSwastaI("raudhatul-athfal", setSwastaRA);
    getSwastaI("madrasah-ibtidaiyah", setSwastaSD);
    getSwastaI("madrasah-tsanawiyah", setSwastaSMP);
    getSwastaI("madrasah-aliyah", setSwastaSMA);
    //pesantren
    getPondokPesantrenI("raudhatul-athfal", setPesantrenRA);
    getPondokPesantrenI("madrasah-ibtidaiyah", setPesantrenSD);
    getPondokPesantrenI("madrasah-tsanawiyah", setPesantrenSMP);
    getPondokPesantrenI("madrasah-aliyah", setPesantrenSMA);
    //madrasa
    getMadrasa("raudhatul-athfal", setMadrasaRA);
    getMadrasa("madrasah-ibtidaiyah", setMadrasaSD);
    getMadrasa("madrasah-tsanawiyah", setMadrasaSMP);
    getMadrasa("madrasah-aliyah", setMadrasaSMA);

    //swastapak
    getPakSwasta("sekolah-dasar", setPakSDS);
    getPakSwasta("sekolah-menengah-pertama", setPakSMPS);
    getPakSwasta("sekolah-menengah-atas", setPakSMAS);

    //negeripak
    getPakNegeri("sekolah-dasar", setPakSDN);
    getPakNegeri("sekolah-menengah-pertama", setPakSMPN);
    getPakNegeri("sekolah-menengah-atas", setPakSMAN);

    getPegawai();
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      // Tambahkan item ke array jika checkbox dicentang
      setWilayahPengawas([...wilayahPengawas, value]);
    } else {
      // Hapus item dari array jika checkbox tidak dicentang
      setWilayahPengawas(wilayahPengawas.filter((item) => item !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Filter out empty strings from wilayahPengawas
      const filteredWilayahPengawas = wilayahPengawas.filter(
        (item) => item !== ""
      );

      await axios.post("http://localhost:5000/peta", {
        id_pegawai: idPegawai,
        jenis_pengawas: jenisPengawas,
        wilayah_mengawas: filteredWilayahPengawas,
      });
      setIsOpenModalAdd(false);
      getDataPengawas();
    } catch (error) {
      console.error("Failed to add pengawas:", error);
      setMsg(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (idPegawai.trim() !== "") {
      const filtered = pegawai.filter((item) =>
        item.NIP.toLowerCase().startsWith(idPegawai.toLowerCase())
      );
      setFilteredPegawai(filtered);
    } else {
      setFilteredPegawai([]);
    }
  }, [idPegawai, pegawai]);
  const handleSelectNIP = (selectedNIP) => {
    setIdPegawai(selectedNIP);
    setFilteredPegawai([]); // Clear suggestions after selection
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 z-top bg-opacity-30"
    >
      <form
        onSubmit={handleSubmit}
        className=" relative bg-white rounded-lg shadow-lg overflow-y-scroll w-[90%] h-full xl:h-[90%] xl:w-[50%] inline-block"
      >
        <div className="">
          <div className=" w-full h-full ">
            <div className=" flex items-center justify-between p-4 border-b  rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Tambah Pengawas
              </h3>
              <button
                onClick={() => setIsOpenModalAdd(false)}
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 inline-block w-full">
              <div className="flex grid mb-1 grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">
                  NIP Pegawai:
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    className="input w-full"
                    value={idPegawai}
                    onChange={(e) => setIdPegawai(e.target.value)}
                    required
                  />
                  {filteredPegawai.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {filteredPegawai.map((item, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSelectNIP(item.NIP)}
                        >
                          {item.NIP} - {item.nama_pegawai}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="flex grid grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">
                  Jenis Pengawas:
                </label>
                <select
                  className="input"
                  value={jenisPengawas}
                  onChange={(e) => setJenisPengawas(e.target.value)}
                >
                  <option value="Madrasah">Madrasah</option>
                  <option value="Pak">Pak</option>
                </select>
              </div>
              {jenisPengawas === "Madrasah" && (
                <div className="flex grid gap-4 items-center">
                  <label className="text-gray-700 font-medium">
                    Wilayah Pengawas:
                  </label>
                  <div className="overflow-x-auto mt-2">
                    <h1>Raudhatul Athfal (Negeri)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {negeriRA.length > 0 ? (
                          negeriRA.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.s_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  value={item && item.nama_sekolah}
                                  id={`sdm-${index + 1}`}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={4} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                    <h1>Madrasah Ibtidaiyah (Negeri)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {negeriSD.length > 0 ? (
                          negeriSD.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.s_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  value={item && item.nama_sekolah}
                                  id={`sdm-${index + 1}`}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={4} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                    <h1 className="mt-3">Madrasah Tsanawiyah(Negeri)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {negeriSMP.length > 0 ? (
                          negeriSMP.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.s_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  id={`smpm-${item.id}`}
                                  //   checked={item && item.nama_sekolah}
                                  value={item && item.nama_sekolah}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />{" "}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={4} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                    <h1 className="mt-3">Madrasah Aliyah (Negeri)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {negeriSMA.length > 0 ? (
                          negeriSMA.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.s_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  id={`smam-${item.id}`}
                                  //   checked={item && item.nama_sekolah}
                                  value={item && item.nama_sekolah}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={4} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="overflow-x-auto mt-2">
                    <h1>Raudhatul Athfal (Swasta)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {swastaRA.length > 0 ? (
                          swastaRA.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.s_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  value={item && item.nama_sekolah}
                                  id={`sdm-${index + 1}`}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={4} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                    <h1>Madrasah Ibtidaiyah (Swasta)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {swastaSD.length > 0 ? (
                          swastaSD.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.s_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  value={item && item.nama_sekolah}
                                  id={`sdm-${index + 1}`}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={4} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                    <h1 className="mt-3">Madrasah Tsanawiyah(Swasta)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {swastaSMP.length > 0 ? (
                          swastaSMP.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.s_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  id={`smpm-${item.id}`}
                                  //   checked={item && item.nama_sekolah}
                                  value={item && item.nama_sekolah}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />{" "}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={4} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                    <h1 className="mt-3">Madrasah Aliyah (Swasta)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {swastaSMA.length > 0 ? (
                          swastaSMA.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.s_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  id={`smam-${item.id}`}
                                  //   checked={item && item.nama_sekolah}
                                  value={item && item.nama_sekolah}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={4} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="overflow-x-auto mt-2">
                    <h1>Raudhatul Athfal (Pondok Pesantren)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {pesantrenRA.length > 0 ? (
                          pesantrenRA.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.s_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  value={item && item.nama_sekolah}
                                  id={`sdm-${index + 1}`}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={4} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                    <h1>Madrasah Ibtidaiyah (Pondok Pesantren)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {pesantrenSD.length > 0 ? (
                          pesantrenSD.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.s_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  value={item && item.nama_sekolah}
                                  id={`sdm-${index + 1}`}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={4} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                    <h1 className="mt-3">
                      Madrasah Tsanawiyah(Pondok Pesantren)
                    </h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {pesantrenSMP.length > 0 ? (
                          pesantrenSMP.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.s_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  id={`smpm-${item.id}`}
                                  //   checked={item && item.nama_sekolah}
                                  value={item && item.nama_sekolah}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />{" "}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={4} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                    <h1 className="mt-3">Madrasah Aliyah (Pondok Pesantren)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {pesantrenSMA.length > 0 ? (
                          pesantrenSMA.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.s_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  id={`smam-${item.id}`}
                                  //   checked={item && item.nama_sekolah}
                                  value={item && item.nama_sekolah}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={4} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="overflow-x-auto mt-2">
                    <h1>Raudhatul Athfal (Madrasah Diniyah)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {madrasahRA.length > 0 ? (
                          madrasahRA.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.s_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  value={item && item.nama_sekolah}
                                  id={`sdm-${index + 1}`}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={4} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                    <h1>Madrasah Ibtidaiyah (Madrasah Diniyah)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {madrasahSD.length > 0 ? (
                          madrasahSD.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.s_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  value={item && item.nama_sekolah}
                                  id={`sdm-${index + 1}`}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={4} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                    <h1 className="mt-3">
                      Madrasah Tsanawiyah (Madrasah Diniyah)
                    </h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {madrasahSMP.length > 0 ? (
                          madrasahSMP.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.s_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  id={`smpm-${item.id}`}
                                  //   checked={item && item.nama_sekolah}
                                  value={item && item.nama_sekolah}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />{" "}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={4} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                    <h1 className="mt-3">Madrasah Aliyah (Madrasah Diniyah)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-left">Status</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {madrasahSMA.length > 0 ? (
                          madrasahSMA.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.s_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  id={`smam-${item.id}`}
                                  //   checked={item && item.nama_sekolah}
                                  value={item && item.nama_sekolah}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={4} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {jenisPengawas === "Pak" && (
                <div className="flex grid items-center">
                  <label className="text-gray-700 font-medium">
                    Wilayah Pengawas:
                  </label>
                  <div className="overflow-x-auto mt-2">
                    <h1>Sekolah Dasar (Swasta)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {pakSDS.length > 0 ? (
                          pakSDS.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  id={`paksds-${item.id}`}
                                  value={item && item.nama_sekolah}
                                  //   checked={item && item.nama_sekolah}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={3} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                    <h1 className="mt-3">Sekolah Menengah Pertama (Swasta)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {pakSMPS.length > 0 ? (
                          pakSMPS.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  id={`paksmps-${item.id + index + 1}`}
                                  //   checked={item && item.nama_sekolah}
                                  value={item && item.nama_sekolah}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={3} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                    <h1 className="mt-3">Sekolah Menengah Atas (Swasta)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {pakSMAS.length > 0 ? (
                          pakSMAS.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  id={`paksmas-${item.id + index + 1}`}
                                  value={item && item.nama_sekolah}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={3} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="overflow-x-auto mt-6">
                    <h1>Sekolah Dasar (Negeri)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {pakSDN.length > 0 ? (
                          pakSDN.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  id={`paksdn-${item.id + index + 1}`}
                                  //   checked={item && item.nama_sekolah}
                                  value={item && item.nama_sekolah}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={3} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                    <h1 className="mt-3">Sekolah Menengah Pertama (Negeri)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {pakSMPN.length > 0 ? (
                          pakSMPN.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  id={`paksmpn-${item.id}`}
                                  //   checked={item && item.nama_sekolah}
                                  value={item && item.nama_sekolah}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={3} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                    <h1 className="mt-3">Sekolah Menengah Atas (Negeri)</h1>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">No</th>
                          <th className="py-3 px-6 text-left">Nama Sekolah</th>
                          <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {pakSMAN.length > 0 ? (
                          pakSMAN.map((item, index) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-6 text-left">
                                {index + 1}
                              </td>
                              <td className="py-3 px-6 text-left">
                                {item && item.nama_sekolah}
                              </td>
                              <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  id={`paksman-${item.id}`}
                                  //   checked={item && item.nama_sekolah}
                                  value={item && item.nama_sekolah}
                                  onChange={handleCheckboxChange}
                                  checked={wilayahPengawas.includes(
                                    item.nama_sekolah
                                  )}
                                  className="form-checkbox"
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <td colSpan={3} className="py-3 px-6 text-center">
                            Tidak ada data
                          </td>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
          <div className="flex sticky bg-white w-full bottom-0 items-center justify-between p-4 space-x-3 border-t border-gray-200 rounded-b">
            <h1>{msg}</h1>
            <div className="flex gap-3">
              <button type="submit" className="btn btn-simpan">
                Simpan
              </button>
              <button
                onClick={() => setIsOpenModalAdd(false)}
                type="button"
                className="btn-batal"
              >
                Batal
              </button>
            </div>
          </div>
      </form>
    </div>
  );
};

export default AddPengawasModal;
