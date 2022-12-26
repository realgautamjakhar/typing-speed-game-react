import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const Layout = () => {
  return (
    <main className="max-w-7xl mx-auto bg-White duration-300 ease-in-out transition-all grid grid-rows-[auto_1fr] h-screen">
      <Header />
      <section className="h-full flex items-center">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
