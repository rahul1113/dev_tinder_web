import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/utils";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/user";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: any) => state.user);
  const fetchUserData = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(setUser(res.data));
    } catch (err: any) {
      if (err.status === 400) {
        navigate("/login");
      }
      console.error("Error fetching user data:", err);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 min-h-0 overflow-y-auto pb-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
