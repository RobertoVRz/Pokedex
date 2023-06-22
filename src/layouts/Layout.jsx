import React from "react";
import Navbar from "@/components/layout/Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto">{children}</main>
    </>
  );
}

export default Layout;
