import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LayananPengaduan from "../component/LayananPengaduan.jsx";
import { getMe } from "../features/authSlice.js";

const LayananPengaduanPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <LayananPengaduan />
    </Layout>
  );
};

export default LayananPengaduanPage;
