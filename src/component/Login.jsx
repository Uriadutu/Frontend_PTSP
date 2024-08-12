import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/authSlice";
import bgLogin from "../img/Background.jpg";
import logoSasadu from "../img/LogoPTSP.png";
import LogoKemenag from "../img/depag.png"

const Login = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(loginUser({ Username, Password }));
  };

  return (
    <section
      className="h-screen w-full flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${bgLogin})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="backdrop-filter backdrop-blur-[5px] bg-opacity-50 bg-[#848484] p-6 rounded border border-white shadow-lg w-[30rem] max-w-full">
        <form onSubmit={Auth} className="space-y-4" autocomplete="off">
          {isError && (
            <div className="bg-red-500 text-white px-2 py-1 rounded text-center">
              {message}
            </div>
          )}
          <div className="w-full flex justify-center">
            <img src={LogoKemenag} className="w-32" alt="" />
          </div>
          <div className="flex items-center mb-6 space-y-2">
            <img src={logoSasadu} alt="logo" className="w-32 h-auto" />
            <h1 className="text-white text-[13px]">
              Aplikasi Layanan Terpadu Satu Pintu
              <br /> Kementerian Agama Kabupaten Halmahera Barat
            </h1>
          </div>
          <div className="space-y-2">
            <input
              id="username"
              type="text"
              className="w-full p-2 border border-black "
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="NIP"
            />
            <input
              id="password"
              type="password"
              className="w-full p-2 border border-black "
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-[#08A139] text-white border border-black  hover:bg-[#0BC146]"
          >
            {isLoading ? "Loading..." : "Masuk"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
