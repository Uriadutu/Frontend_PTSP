import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoAPK from "../img/LogoPTSP.png";
import logoRes from "../img/logoRes.png";
import kemenag from "../img/depag.png";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "./Sidebar";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="bg-gray-100 border-b w-full fixed z-30 flex items-center">
        <NavLink
          to="/dashboard"
          exact
          className="text-blue-500 sm:hidden block"
        >
          <img src={logoRes} alt="Logo" className="h-[30px] sm:h-[60px]" />
        </NavLink>
        <h1 className="text-black text-[10px] items-start sm:text-md sm:hidden block">
          SAPA SANTUN DEKAPI UMAT, LAYANAN ADMINISTRASI MANAJERIAL ORGANISASI
        </h1>
      </div>
      <div className="bg-[#013500] border-b w-full sm:top-0 top-7 fixed flex justify-between items-center px-4 py-2 z-10 drop-shadow-lg">
        <div className="flex gap-2 items-center">
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? (
                <FaTimes className="text-white h-6 w-6" />
              ) : (
                <FaBars className="text-white h-6 w-6" />
              )}
            </button>
          </div>
          <NavLink
            to="/dashboard"
            exact
            className="text-blue-500 hidden sm:block"
          >
            <img src={LogoAPK} alt="Logo" className="h-[60px]" />
          </NavLink>
          <h1 className="text-white text-xs font-semibold sm:text-md hidden sm:block">
            SAPA SANTUN DEKAPI UMAT, LAYANAN ADMINISTRASI MANAJERIAL ORGANISASI
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <img src={kemenag} alt="" className="h-10" />
        </div>
      </div>
      <div
        className={`top-7 fixed z-side left-0 ${isOpen ? "flex" : "hidden"}`}
      >
        <Sidebar tutupSidebar={setIsOpen}/>
      </div>
    </>
  );
};

export default Navbar;
