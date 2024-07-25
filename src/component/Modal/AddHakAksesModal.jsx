import React, { useState, useEffect } from "react";
import axios from "axios";

const AddHakAksesModal = ({ setIsOpenModalAdd, selectedPegawai, fetchPegawai }) => {
  const [message, setMessage] = useState("");
  const [existingPassword, setExistingPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lapasi, setLapasi] = useState(false);
  const [pantaiDisa, setPantaiDisa] = useState(false);
  const [akesahu, setAksesahu] = useState(false);
  const [saria, setSaria] = useState(false);
  const [paludi, setPaludi] = useState(false);
  const [sahu, setSahu] = useState(false);

  const getPegawai = async (id) => {
    try {
      const dataPegawai = await axios.get(`http://localhost:5000/pegawai/${id}`);
      const pegawaiData = dataPegawai.data;
      setExistingPassword(pegawaiData.password); // Assuming password is part of the response
    } catch (error) {
      console.log(error);
    }
  };

  const getHakAkses = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/hakakses/pegawai/${id}`);
      const hakAksesData = response.data;
      setLapasi(hakAksesData.lapasi);
      setPantaiDisa(hakAksesData.pantai_disa);
      setAksesahu(hakAksesData.aksesahu);
      setSaria(hakAksesData.saria);
      setPaludi(hakAksesData.paludi);
      setSahu(hakAksesData.sahu);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedPegawai && selectedPegawai.id) {
      getHakAkses(selectedPegawai.id);
      getPegawai(selectedPegawai.id);
    }
  }, [selectedPegawai]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setMessage("Password dan konfirmasi password tidak cocok");
      return;
    }
    try {
      await axios.patch(`http://localhost:5000/hakakses/pegawai/${selectedPegawai.id}`, {
        password: password || existingPassword,
        lapasi,
        pantai_disa: pantaiDisa,
        aksesahu: akesahu,
        saria,
        paludi,
        sahu,
      });
      setIsOpenModalAdd(false);
      fetchPegawai();
    } catch (error) {
      setMessage("Gagal mengupdate hak akses");
      console.error("Failed to update hak akses:", error);
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center bg-gray-500 z-top bg-opacity-30"
    >
      <form onSubmit={handleSubmit}>
        <div className="w-full bg-white rounded-lg shadow-lg h-full inline-block">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Edit Hak Akses
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
              <label className="label">Nama:</label>
              <div className="control">
                <input
                  type="text"
                  className="w-full input input-bordered"
                  value={selectedPegawai.nama_pegawai}
                  disabled
                />
              </div>
            </div>
            <div className="flex grid grid-cols-2 gap-4 items-center">
              <label className="label">Password:</label>
              <div className="control">
                <input
                  type="password"
                  className="w-full input input-bordered"
                  value={existingPassword}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex grid grid-cols-2 gap-4 items-center">
              <label className="label">Konfirmasi Password:</label>
              <div className="control">
                <input
                  type="password"
                  className="w-full input input-bordered"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Hak Akses:</label>
              <div className="control">
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={lapasi}
                    onChange={(e) => setLapasi(e.target.checked)}
                    className="mr-2"
                  />
                  Lapasi
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={pantaiDisa}
                    onChange={(e) => setPantaiDisa(e.target.checked)}
                    className="mr-2"
                  />
                  Pantai Disa
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={akesahu}
                    onChange={(e) => setAksesahu(e.target.checked)}
                    className="mr-2"
                  />
                  Aksesahu
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={saria}
                    onChange={(e) => setSaria(e.target.checked)}
                    className="mr-2"
                  />
                  Saria
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={paludi}
                    onChange={(e) => setPaludi(e.target.checked)}
                    className="mr-2"
                  />
                  Paludi
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={sahu}
                    onChange={(e) => setSahu(e.target.checked)}
                    className="mr-2"
                  />
                  Sahu
                </label>
              </div>
            </div>
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
            {message && <p className="has-text-danger">{message}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddHakAksesModal;
