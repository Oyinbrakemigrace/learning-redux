import React, { useEffect } from "react";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setBannerData,
  setImageUrl,
} from "./features/gboxSlice";

function App() {
  const dispatch = useDispatch();
  const fetchTrendingData = async () => {
    try {
      const response = await axios.get("/trending/all/week");
      dispatch(setBannerData(response.data.results));
      //console.log("response:", response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");
      dispatch(setImageUrl(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.log("error", error);
    }
  };

 const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  /*The above provides the current location object, and
  it triggers the scroll to top when the pathname changes.
  This fixes the problem where scroll position is maintained across 
  route changes*/

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);
  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className="min-h-[90vh]">
        <Outlet />
      </div>
      <Footer />
      <MobileNav />
    </main>
  );
}

export default App;
