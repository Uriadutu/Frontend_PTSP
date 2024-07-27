import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import axios from "axios";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [satker, setSatker] = useState([])
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Detect active route and keep dropdown open
    const path = location.pathname;
    if (path.startsWith("/lapasi")) {
      setOpenDropdown("lapasi");
    } else if (path.startsWith("/pantai-disa")) {
      setOpenDropdown("pantaiDisa");
    } else if (path.startsWith("/akesahu")) {
      setOpenDropdown("akesahu");
    } else if (path.startsWith("/saria")) {
      setOpenDropdown("saria");
    } else if (path.startsWith("/sahu")) {
      setOpenDropdown("sahu");
    } else if (path.startsWith("/paludi")) {
      setOpenDropdown("paludi");
    } else {
      setOpenDropdown(null);
    }
  }, [location]);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prevDropdown) =>
      prevDropdown === dropdownName ? null : dropdownName
    );
  };

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const satuanKerja = user?.satuan_kerja;
  const satuan_kerja = satker?.nama_satker
  const getSatker = async(id) => {
    try {
      const response = await axios.get(`http://localhost:5000/satker/${id}`)
      setSatker(response.data)
    } catch (error) {
      console.log(error);
    }
  } 

  useEffect(()=> {getSatker(satuanKerja)},[satuanKerja]);
  const getNavLinkClass = ({ isActive }) =>
    `block p-3 pl-10 ${isActive ? "bg-[#DDFFDC]" : "hover:bg-gray-200"}`;

  return (
    <aside className="mt-7 w-[300px] fixed bg-white drop-shadow-xl overflow-y-scroll h-[90%]">
      <div className="mb-4 p-4 bg-gray-50 drop-shadow-xl">
        {user && user.role === "Admin" && (
          <div className="">
            <h1 className="text-xl font-bold">{user && user.name}</h1>
            <h1 className="text-lg">Admin</h1>
          </div>
        )}
        {user && user.UUID === "UUID" && (
          <div className="">
            <h1 className="text-xl font-bold">{user && user.nama_pegawai}</h1>
            <h1 className="text-lg">{satuan_kerja}</h1>
          </div>
        )}
      </div>
      <div className="mb-4">
        <h1 className="text-lg font-semibold pl-4 mb-0">Menu</h1>
        <nav>
          <NavLink to="/dashboard" className={getNavLinkClass}>
            Dashboard
          </NavLink>
          {/* lapasi */}
          {(user?.role === "Admin" || user?.hakAkses?.lapasi === true) && (
            <div className="relative">
              <button
                className="flex items-center justify-between w-full p-3 pl-10 hover:bg-gray-200"
                onClick={() => toggleDropdown("lapasi")}
              >
                <span>Lapasi</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    openDropdown === "lapasi" ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {openDropdown === "lapasi" && (
                <div className="pl-6 transition-all duration-500 ease-out">
                  <NavLink
                    to="/lapasi/data-satuan-kerja"
                    className={getNavLinkClass}
                  >
                    Data Satuan Kerja
                  </NavLink>
                  <NavLink
                    to="/lapasi/data-jabatan"
                    className={getNavLinkClass}
                  >
                    Data Jabatan
                  </NavLink>
                  <NavLink
                    to="/lapasi/data-pegawai"
                    className={getNavLinkClass}
                  >
                    Data Pegawai
                  </NavLink>
                  <NavLink to="/lapasi/surat-masuk" className={getNavLinkClass}>
                    Data Surat Masuk
                  </NavLink>
                  <NavLink
                    to="/lapasi/surat-keluar"
                    className={getNavLinkClass}
                  >
                    Data Surat Keluar
                  </NavLink>
                </div>
              )}
            </div>
          )}

          {/* pantai-disa */}
          {(user?.role === "Admin" || user?.hakAkses?.pantai_disa === true) && (
            <div className="relative">
              <button
                className="flex items-center justify-between w-full p-3 pl-10 hover:bg-gray-200"
                onClick={() => toggleDropdown("pantaiDisa")}
              >
                <span>Pantai Disa</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    openDropdown === "pantaiDisa" ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {openDropdown === "pantaiDisa" && (
                <div className="pl-6 transition-all duration-500 ease-out">
                  <NavLink
                    to="/pantai-disa/data-sekolah"
                    className={getNavLinkClass}
                  >
                    Data Sekolah
                  </NavLink>
                  <NavLink
                    to="/pantai-disa/data-guru"
                    className={getNavLinkClass}
                  >
                    Data Guru
                  </NavLink>
                  <NavLink
                    to="/pantai-disa/data-siswa"
                    className={getNavLinkClass}
                  >
                    Data Siswa
                  </NavLink>
                  <NavLink
                    to="/pantai-disa/surat-masuk"
                    className={getNavLinkClass}
                  >
                    Data Surat Masuk
                  </NavLink>
                  <NavLink
                    to="/pantai-disa/surat-keluar"
                    className={getNavLinkClass}
                  >
                    Data Surat Keluar
                  </NavLink>
                </div>
              )}
            </div>
          )}

          {/* akusahu */}
          {(user?.role === "Admin" || user?.hakAkses?.aksesahu === true) && (
            <div className="relative">
              <button
                className="flex items-center justify-between w-full p-3 pl-10 hover:bg-gray-200"
                onClick={() => toggleDropdown("akesahu")}
              >
                <span>Akesahu</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    openDropdown === "akesahu" ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {openDropdown === "akesahu" && (
                <div className="pl-6 transition-all duration-500 ease-out">
                  <NavLink to="/akesahu/data-haji" className={getNavLinkClass}>
                    Data Haji
                  </NavLink>
                  <NavLink to="/akesahu/info-haji" className={getNavLinkClass}>
                    Info Haji
                  </NavLink>
                  <NavLink
                    to="/akesahu/surat-masuk"
                    className={getNavLinkClass}
                  >
                    Data Surat Masuk
                  </NavLink>
                  <NavLink
                    to="/akesahu/surat-keluar"
                    className={getNavLinkClass}
                  >
                    Data Surat Keluar
                  </NavLink>
                </div>
              )}
            </div>
          )}

          {/* saria */}
          {(user?.role === "Admin" || user?.hakAkses?.saria === true) && (
            <div className="relative">
              <button
                className="flex items-center justify-between w-full p-3 pl-10 hover:bg-gray-200"
                onClick={() => toggleDropdown("saria")}
              >
                <span>Saria</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    openDropdown === "saria" ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {openDropdown === "saria" && (
                <div className="pl-6 transition-all duration-500 ease-out">
                  <NavLink to="/saria/data-umat" className={getNavLinkClass}>
                    Data Umat
                  </NavLink>
                  <NavLink to="/saria/data-masjid" className={getNavLinkClass}>
                    Data Rumah Ibadah
                  </NavLink>
                  <NavLink
                    to="/saria/data-majelis-ta'lim"
                    className={getNavLinkClass}
                  >
                    Data Majelis Ta'lim
                  </NavLink>
                  <NavLink
                    to="/saria/data-organisasi-masyarakat"
                    className={getNavLinkClass}
                  >
                    Data Organisasi Masyarakat
                  </NavLink>
                  <NavLink
                    to="/saria/data-lembaga-keagamaan"
                    className={getNavLinkClass}
                  >
                    Data Lembaga Keagamaan
                  </NavLink>
                  <NavLink to="/saria/data-kua" className={getNavLinkClass}>
                    Data KUA
                  </NavLink>
                  <NavLink to="/saria/surat-masuk" className={getNavLinkClass}>
                    Data Surat Masuk
                  </NavLink>
                  <NavLink to="/saria/surat-keluar" className={getNavLinkClass}>
                    Data Surat Keluar
                  </NavLink>
                </div>
              )}
            </div>
          )}
          {/* paludi */}
          {(user?.role === "Admin" || user?.hakAkses?.paludi === true) && (
            <div className="relative">
              <button
                className="flex items-center justify-between w-full p-3 pl-10 hover:bg-gray-200"
                onClick={() => toggleDropdown("paludi")}
              >
                <span>Paludi</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    openDropdown === "paludi" ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {openDropdown === "paludi" && (
                <div className="pl-6 transition-all duration-500 ease-out">
                  <NavLink
                    to="/paludi/data-umat-kristen"
                    className={getNavLinkClass}
                  >
                    Data Umat
                  </NavLink>
                  <NavLink to="/paludi/data-gereja" className={getNavLinkClass}>
                    Data Rumah Ibadah
                  </NavLink>
                  <NavLink
                    to="/paludi/data-sekolah-paludi"
                    className={getNavLinkClass}
                  >
                    Data Sekolah
                  </NavLink>
                  <NavLink
                    to="/paludi/data-guru-pak"
                    className={getNavLinkClass}
                  >
                    Data Guru PAK
                  </NavLink>
                  <NavLink
                    to="/paludi/data-penyuluh"
                    className={getNavLinkClass}
                  >
                    Data Penyuluh
                  </NavLink>
                  <NavLink
                    to="/paludi/data-organisasi-masyarakat/"
                    className={getNavLinkClass}
                  >
                    Data Organisasi Masyarakat
                  </NavLink>

                  <NavLink
                    to="/paludi/data-lembaga-keagamaan/"
                    className={getNavLinkClass}
                  >
                    Data Lembaga Keagamaan
                  </NavLink>
                  <NavLink to="/paludi/surat-masuk" className={getNavLinkClass}>
                    Data Surat Masuk
                  </NavLink>
                  <NavLink
                    to="/paludi/surat-keluar"
                    className={getNavLinkClass}
                  >
                    Data Surat Keluar
                  </NavLink>
                </div>
              )}
            </div>
          )}

          {/* sahu */}
          {(user?.role === "Admin" || user?.hakAkses?.sahu === true) && (
            <div className="relative">
              <button
                className="flex items-center justify-between w-full p-3 pl-10 hover:bg-gray-200"
                onClick={() => toggleDropdown("sahu")}
              >
                <span>Sahu</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    openDropdown === "sahu" ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {openDropdown === "sahu" && (
                <div className="pl-6 transition-all duration-500 ease-out">
                  <NavLink
                    to="/sahu/data-kecamatan"
                    className={getNavLinkClass}
                  >
                    Data Kecamatan
                  </NavLink>
                  <NavLink
                    to="/sahu/data-penerima-penyaluran-zakat"
                    className={getNavLinkClass}
                  >
                    Data Penerima dan Penyaluran Zakat
                  </NavLink>
                  <NavLink
                    to="/sahu/data-tanah-wakaf"
                    className={getNavLinkClass}
                  >
                    Data Tanah Wakaf
                  </NavLink>
                  <NavLink to="/sahu/surat-masuk" className={getNavLinkClass}>
                    Data Surat Masuk
                  </NavLink>
                  <NavLink to="/sahu/surat-keluar" className={getNavLinkClass}>
                    Data Surat Keluar
                  </NavLink>
                </div>
              )}
            </div>
          )}

          <NavLink to="/layanan-pengaduan" className={getNavLinkClass}>
            Layanan Pengaduan
          </NavLink>
          {user?.role === "Admin" && (
            <NavLink to="/manajemen-akun" className={getNavLinkClass}>
              Manajemen Akun
            </NavLink>
          )}
          <button className="flex p-4 my-2 w-full" onClick={logout}>
            Logout
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
