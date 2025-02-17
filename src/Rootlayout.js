import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/userinfo/Navbar";  // Adjust path if needed
import Footer from "./components/userinfo/Footer";  // Adjust path if needed

function Rootlayout() {
  return (
    <div>
      <Navbar />
      <Outlet />  {/* This is where child components will be rendered */}
      <Footer />
    </div>
  );
}

export default Rootlayout;
