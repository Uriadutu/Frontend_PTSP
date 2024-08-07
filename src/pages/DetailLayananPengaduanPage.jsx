import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LayananPengaduan from "../component/LayananPengaduan.jsx";
import { getMe } from "../features/authSlice.js";
import DetailLayanan from "../component/DetailLayanan.jsx";

const DetailLayananPengaduanPage = () => {
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
      <DetailLayanan />
    </Layout>
  );
};

export default DetailLayananPengaduanPage;
