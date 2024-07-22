import React from "react";
import { NavLink } from "react-router-dom";
import LogoAPK from "../img/LogoPTSP.png";
// import halbar from "../img/halbar.png"
import kemenag from "../img/depag.png"

const Navbar = () => {

  return (
    <div className="bg-[#013500]  border-b w-full fixed flex justify-between items-center px-4 py-2 z-10 drop-shadow-lg">
      <div className="flex gap-2 items-center">
        <NavLink to="/dashboard" exact className="text-blue-500">
          <img src={LogoAPK} alt="Logo" className="h-[60px]" />
        </NavLink>
        <h1 className="text-white text-md font-semibold">
          SAPA SANTUN DEKAPI UMAT, LAYANAN ADMINISTRASI MANAJERIAL ORGANISASI
        </h1>
      </div>
      <div className="flex items-center gap-3">
        {/* <img src={halbar} alt="" className="h-10" /> */}
        <img src={kemenag} alt="" className="h-10" />
      </div>
    </div>
  );
};

export default Navbar;
