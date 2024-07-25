import React, { useEffect } from "react";
import Layout from "../Layout";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import DataPenerimaZakat from "../../component/Sahu/DataPenerimaZakat";

const DataPenerimaZakatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError || user?.hakAkses?.sahu === false) {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <DataPenerimaZakat />
    </Layout>
  );
};

export default DataPenerimaZakatPage;
