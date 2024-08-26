import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import Layout from "../../Layout";
import DataNRTahunan from "../../../component/Saria/Tahunan/DataNRTahunan";

const DataNRTahunanPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError || user?.hakAkses?.saria === false) {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <DataNRTahunan />
    </Layout>
  );
};

export default DataNRTahunanPage;
