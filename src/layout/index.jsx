import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const index = () => {
  return (
    <div className="nunito-font flex h-screen overflow-hidden">
      <Sidebar />
      <div className="layout-surface flex w-[calc(100% - 15.7299%)] flex-1 flex-col bg-[#F5F6FA] h-screen overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default index;
