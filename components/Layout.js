import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";


const Layout = ({ children, totalItems }) => {
  const router = useRouter();
  return (
    <div
      className="d-flex flex-column"
      style={{ minHeight: "100vh", height: "100vh" }}
    >
      {!router.pathname.includes("/Produse/[id]") && (
        <Navbar totalItems={totalItems} />
      )}
      <div className="flex-grow-1 border border-danger d-flex justify-content-center align-items-center">
        {children}
      </div>
      {router.pathname.includes("/Produse/[id]") ? "" : <Footer />}
    </div>
  );
};

export default Layout;
