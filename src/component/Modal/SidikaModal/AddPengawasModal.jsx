import React, { useEffect, useState } from "react";
import axios from "axios";

const AddPengawasModal = ({ setIsOpenModalAdd, getDataPengawas }) => {
  const [idPegawai, setIdPegawai] = useState("");
  const [jenisPengawas, setJenisPengawas] = useState("Madrasah");
  const [wilayahPengawas, setWilayahPengawas] = useState([""]);
  const [filteredPegawai, setFilteredPegawai] = useState([]);
  const [pegawai, setPegawai] = useState([]);

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

  console.log(wilayahPengawas, "wilayah");
  

  useEffect(() => {
    //madrasa
    getMadrasa("sekolah-dasar", setMadrasaSD);
    getMadrasa("sekolah-menengah-pertama", setMadrasaSMP);
    getMadrasa("sekolah-menengah-atas", setMadrasaSMA);

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

  let filteredWilayahPengawas  = null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Filter out empty strings from wilayahPengawas
      filteredWilayahPengawas = wilayahPengawas.filter(
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
    }
  };

  console.log(filteredWilayahPengawas);
  ;

  
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

  console.log("id");
  console.log(idPegawai, "id");

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 z-top bg-opacity-30"
    >
      <form
        onSubmit={handleSubmit}
        className=" bg-white rounded-lg shadow-lg overflow-y-scroll h-[80%] inline"
      >
        <div className="w-full h-full ">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
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
          <div className="p-4 space-y-4 inline-block">
            <div className="flex grid grid-cols-2 gap-4 items-center">
              <label className="text-gray-700 font-medium">ID Pegawai:</label>
              <div className="relative">
                <input
                  type="text"
                  className="input"
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
                  <h1>Sekolah Dasar</h1>
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
                      {madrasahSD.map((item, index) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left">{index + 1}</td>
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
                      ))}
                    </tbody>
                  </table>
                  <h1>Sekolah Menengah Pertama</h1>
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
                      {madrasahSMP.map((item, index) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left">{index + 1}</td>
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
                      ))}
                    </tbody>
                  </table>
                  <h1>Sekolah Menengah Atas</h1>
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
                      {madrasahSMA.map((item, index) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left">{index + 1}</td>
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
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {jenisPengawas === "Pak" && (
              <div className="flex grid gap-4 items-center">
                <label className="text-gray-700 font-medium">
                  Wilayah Pengawas:
                </label>
                <h1>Sekolah Swasta</h1>
                <div className="overflow-x-auto mt-2">
                  <h1>Sekolah Dasar</h1>
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">No</th>
                        <th className="py-3 px-6 text-left">Nama Sekolah</th>
                        <th className="py-3 px-6 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {pakSDS.map((item, index) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left">{index + 1}</td>
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
                      ))}
                    </tbody>
                  </table>
                  <h1>Sekolah Menengah Pertama</h1>
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">No</th>
                        <th className="py-3 px-6 text-left">Nama Sekolah</th>
                        <th className="py-3 px-6 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {pakSMPS.map((item, index) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left">{index + 1}</td>
                          <td className="py-3 px-6 text-left">
                            {item && item.nama_sekolah}
                          </td>
                          <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                            <input
                              type="checkbox"
                              id={`paksmps-${item.id}`}
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
                      ))}
                    </tbody>
                  </table>
                  <h1>Sekolah Menengah Atas</h1>
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">No</th>
                        <th className="py-3 px-6 text-left">Nama Sekolah</th>
                        <th className="py-3 px-6 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {pakSMAS.map((item, index) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left">{index + 1}</td>
                          <td className="py-3 px-6 text-left">
                            {item && item.nama_sekolah}
                          </td>
                          <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                            <input
                              type="checkbox"
                              id={`paksmas-${item.id}`}
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
                      ))}
                    </tbody>
                  </table>
                </div>
                <h1>Sekolah Negeri</h1>
                <div className="overflow-x-auto mt-2">
                  <h1>Sekolah Dasar</h1>
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">No</th>
                        <th className="py-3 px-6 text-left">Nama Sekolah</th>
                        <th className="py-3 px-6 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {pakSDN.map((item, index) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left">{index + 1}</td>
                          <td className="py-3 px-6 text-left">
                            {item && item.nama_sekolah}
                          </td>
                          <td className="py-3 px-6 text-center flex justify-around whitespace-nowrap">
                            <input
                              type="checkbox"
                              id={`paksds-${item.id}`}
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
                      ))}
                    </tbody>
                  </table>
                  <h1>Sekolah Menengah Pertama</h1>
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">No</th>
                        <th className="py-3 px-6 text-left">Nama Sekolah</th>
                        <th className="py-3 px-6 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {pakSMPN.map((item, index) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left">{index + 1}</td>
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
                      ))}
                    </tbody>
                  </table>
                  <h1>Sekolah Menengah Atas</h1>
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">No</th>
                        <th className="py-3 px-6 text-left">Nama Sekolah</th>
                        <th className="py-3 px-6 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {pakSMAN.map((item, index) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left">{index + 1}</td>
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
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
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
        </div>
      </form>
    </div>
  );
};

export default AddPengawasModal;
