import React, { useEffect } from "react";
import Layout from "../Layout";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import DataHaji from "../../component/Akesahu/DajiHaji";

const DataHajiPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    } else if (user && user.role === "Pegawai" && !user.hakAkses) {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
      <DataHaji />
    </Layout>
  );
};

export default DataHajiPage;
