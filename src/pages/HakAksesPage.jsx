import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice.js";
import HakAkses from "../component/HakAkses.jsx";

const HakAksesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user) {
      if (user.role !== "Admin") {
        navigate("/dashboard");
      }
      if (user.UUID === "lita") {
        navigate("/dashboard");
      }
    }
  }, [isError, navigate, user]);
  return (
    <Layout>
      <HakAkses />
    </Layout>
  );
};

export default HakAksesPage;
