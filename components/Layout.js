import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const Layout = ({ children, totalItems }) => {
  const router = useRouter();
  return (
    <div
      className="d-flex flex-column"
      style={{ minHeight: "100vh", height: "fit-content" }}
    >
      {!router.pathname.includes("/Produse/[id]") && (
        <Navbar totalItems={totalItems} />
      )}
      <div
        className={
          styles.children +
          " flex-grow-1 d-flex justify-content-center align-items-center dark"
        }
      >
        {children}
      </div>
      {router.pathname.includes("/Produse/[id]") ? "" : <Footer />}
    </div>
  );
};

export default Layout;
