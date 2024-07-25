
import React, { useEffect } from "react";
import Layout from "../Layout";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import DetailPegawai from "../../component/Lapasi/DetailPegawai";

const DetailPegawaiPage = () => {
 const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError || user?.hakAkses?.lapasi === false) {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
      <DetailPegawai />
    </Layout>
  );
};

export default DetailPegawaiPage;
