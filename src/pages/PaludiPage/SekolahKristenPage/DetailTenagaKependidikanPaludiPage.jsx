import React, { useEffect } from "react";
import Layout from "../../Layout";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import DetailTenagaKependidikanPaludi from "../../../component/Paludi/SekolahPaludi/DetailTenagaKependidikanPaludi";

const DetailTenagaKependidikanPaludiPage = () => {
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
      <DetailTenagaKependidikanPaludi />
    </Layout>
  );
};

export default DetailTenagaKependidikanPaludiPage;
