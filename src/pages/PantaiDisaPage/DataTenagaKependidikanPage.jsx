import React, { useEffect } from "react";
import Layout from "../Layout"

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import DataTenagaKependidikan from "../../component/PantaiDisa/DataTenagaKependidikan";

const DataTenagaKependidikanPage = () => {
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError || user?.hakAkses?.pantai_disa === false) {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <DataTenagaKependidikan />
    </Layout>
  );
};

export default DataTenagaKependidikanPage;
