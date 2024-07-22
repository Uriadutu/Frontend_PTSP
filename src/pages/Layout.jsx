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
        <Sidebar />
        <div
          className="flex p-5 mt-7 w-full"
          style={{
            backgroundImage: `url(${BackgroundTop})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <main className="min-h-screen m-0 w-full ml-[300px]">
            <Jejak />
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
