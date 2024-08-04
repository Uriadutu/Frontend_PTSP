import React from "react";
import Navbar from "../component/Navbar";
import BackgroundTop from "../img/Bg-APK.png";
import Sidebar from "../component/Sidebar";
import Jejak from "../component/Jejak";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex  min-h-screen m-0 bg-white pt-10 ">
        <div className="sm:block hidden">
          <Sidebar />
        </div>
        <div
          className="flex p-2 pt-5 sm:p-5  mt-7 w-full"
          style={{
            backgroundImage: `url(${BackgroundTop})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <main className="min-h-screen m-0 w-full sm:ml-[300px] ">
            <Jejak />
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
