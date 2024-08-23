import React from "react";
import { useNavigate } from "react-router-dom";
import logoRes from "../img/LogoPTSP.png";
import kemenag from "../img/depag.png";



const NavbarUser = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="bg-[#013500] backdrop-blur-[5px] bg-opacity-[0.8] w-full sm:top-0 top-0 fixed flex justify-between items-center px-4 py-2 z-10 drop-shadow-lg">
        <div className="flex gap-2 items-center">
          <div className="">
            <img src={logoRes} onClick={()=> navigate("/")} alt="Logo" className="h-[40px] sm:h-[60px]" />
          </div>
        </div>
        <img src={kemenag} alt="" className="h-10" />
      </div>
    </>
  );
};

export default NavbarUser;
