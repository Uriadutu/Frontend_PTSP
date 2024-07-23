import React, { useEffect, useState } from "react";
import axios from "axios";

const HakAkses = () => {
  const [pegawaiList, setPegawaiList] = useState([]);
  const [selectedPegawai, setSelectedPegawai] = useState(null);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    lapasi: false,
    pantai_disa: false,
    aksesahu: false,
    saria: false,
    paludi: false,
    sahu: false,
  });

  useEffect(() => {
    fetchPegawai();
  }, []);

  const fetchPegawai = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pegawai");
      setPegawaiList(response.data);
    } catch (error) {
      console.error("Failed to fetch pegawai:", error);
    }
  };

  const handleEditClick = (pegawai) => {
    setSelectedPegawai(pegawai);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password and confirm password do not match");
      return;
    }
    try {
      await axios.patch(
        `http://localhost:5000/hakakses/pegawai/${selectedPegawai.id}`,
        formData
      );
      alert("Hak akses updated successfully");
      setSelectedPegawai(null);
      fetchPegawai();
    } catch (error) {
      console.error("Failed to update hak akses:", error);
    }
  };

  return (
    <div className="contain">
      <h1 className="text-2xl font-bold mb-4">Hak Akses Pegawai</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg mb-6">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">NIP</th>
            <th className="py-3 px-6 text-left">Nama Pegawai</th>
            <th className="py-3 px-6 text-left">Jenis Pegawai</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {pegawaiList.map((pegawai) => (
            <tr
              key={pegawai.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">{pegawai.NIP}</td>
              <td className="py-3 px-6 text-left">{pegawai.nama_pegawai}</td>
              <td className="py-3 px-6 text-left">{pegawai.jenis_pegawai}</td>
              <td className="py-3 px-6 text-center">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEditClick(pegawai)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPegawai && (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Edit Hak Akses</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col mb-4">
              <label className="text-gray-700 font-medium mb-2">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700 font-medium mb-2">
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700 font-medium mb-2">
                Hak Akses:
              </label>
              {Object.keys(formData)
                .filter(
                  (key) => key !== "password" && key !== "confirmPassword"
                )
                .map((key) => (
                  <label key={key} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name={key}
                      checked={formData[key]}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace("_", " ")}
                  </label>
                ))}
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Update Hak Akses
              </button>
              <button
                type="button"
                onClick={() => setSelectedPegawai(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default HakAkses;
