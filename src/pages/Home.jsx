import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Welcome from "../component/Welcome.jsx";
import { getMe } from "../features/authSlice.js";

const Home = () => {
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
  }, [isError, user, navigate]);

  return (
    <Layout>
      <Welcome />
    </Layout>
  );
};

export default Home;
