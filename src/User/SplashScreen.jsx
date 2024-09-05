import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PantauDs from "./PantauDs";
import PengaduanUser from "./PengaduanUser";

const SplashScreen = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <div className="flex sm:mt-20 mt-10 mr-0 justify-center sm:justify-start sm:pl-10 w-full h-[90vh] sm:h-[100vh]">
        <div className="mt-6 font-bold text-white">
          <h1 className="sm:text-left text-center text-[12px] sm:text-[20px] text-green-400">
            SASADU LAMO
          </h1>
          <h1 className="sm:text-left text-center text-[20px] sm:text-[40px]">
            Sapa Santun Dekapi Umat,
            <br />
            Layanan Administrasi Menejerial Organisasi
          </h1>
          <h1 className="mt-2 sm:text-left text-center font-normal text-[10px] sm:text-[20px]">
            Kementrian Agama Kabupaten Halmahera Barat
          </h1>
          <div className="flex sm:justify-start justify-center items-center mt-[120px]">
            <Link
              to="#layanan"
              className="text-lg mr-4 underline p-1 hover:text-green-500 transition-opacity"
            >
              Layanan
            </Link>
            <div className="border-l border-white h-6"></div>
            <Link
              to="#pengaduan"
              className="text-lg mx-4 underline p-1 hover:text-green-500 transition-opacity"
            >
              Pengaduan
            </Link>
            <div className="border-l border-white h-6"></div>
            <Link
              to="/login"
              className="text-lg ml-4 underline p-1 hover:text-green-500 transition-opacity"
            >
              Masuk
            </Link>
          </div>
        </div>
      </div>

      <div className="flex pt-10  sm:px-2">
        <section className="pt-20 " id="layanan">
          <div className="mt-[10px] flex w-full bg-white bg-opacity-100 rounded-t-lg">
            <PantauDs />
          </div>
        </section>
      </div>
      <div className="flex pt-0 sm:pt-10 ">
        <section className=" " id="pengaduan">
          <div className="w-full mt-[10px] flex ">
            <PengaduanUser />
          </div>
        </section>
      </div>
    </>
  );
};

export default SplashScreen;
