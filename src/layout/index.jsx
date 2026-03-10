import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const index = () => {
  return (
    <div className="nunito-font flex">
      <Sidebar />
      <div className="layout-surface flex-1 bg-[#F5F6FA] w-[calc(100% - 15.7299%)]">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default index;
