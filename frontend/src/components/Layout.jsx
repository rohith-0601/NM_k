import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container-fluid py-4">
        {children}
      </div>
    </>
  );
};

export default Layout;
