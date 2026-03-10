import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SIDEBAR_SECTIONS } from "@/utils/constants";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleItemClick = (item) => {
    setActiveItem(item.key);
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="w-[15.7299%] sticky top-0 h-screen no-scrollbar overflow-y-auto bg-white flex flex-col font-semibold nunito-font">
      <div className="pt-6 pl-[66px]">
        <img src="/images/dashtack.png" className="cursor-pointer" alt="Dashtack" />
      </div>

      {SIDEBAR_SECTIONS.map((section, sectionIndex) => (
        <React.Fragment key={section.key}>
          <div className={`${sectionIndex === 0 ? "mt-[30px]" : ""} flex w-full flex-col`}>
            {section.heading ? (
              <div className="font-bold text-black/60 text-xs uppercase mt-4 ml-10 mb-4">
                {section.heading}
              </div>
            ) : null}

            {section.items.map((item) => {
              const isActive = item.path
                ? pathname === item.path
                : activeItem === item.key;

              return (
                <div
                  key={item.key}
                  className={`relative dashboard w-full ${isActive ? "active" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className="text-sm pt-4 sidemenu pb-[14px] pl-[54px] ml-[24px] mr-6 rounded-[6px] text-[#202224] w-[calc(100%-48px)] text-left cursor-pointer"
                  >
                    <span>{item.label}</span>
                  </button>
                  <div className="h-[50px] rounded-[4px] leftbar top-0 left-[-5px] w-[9px] absolute rounded-[6px]"></div>
                </div>
              );
            })}
          </div>

          {sectionIndex < SIDEBAR_SECTIONS.length - 1 ? (
            <div className="h-[1px] w-full my-4 bg-[#E0E0E0]"></div>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Sidebar;
