import React, { useEffect, useRef, useState } from "react";
import UkFlag from "../assets/images/uk-flag.png";
import profileImage from "../assets/images/profile-img.png";
import { IconComponent, Input, Select } from "@/components/common";
import Skeleton from "react-loading-skeleton";
import { api } from "../utils/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { remove } from "@/features/tokenSlice";
import { AUTH_SESSION_KEY, DARK_MODE_KEY } from "@/utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem(DARK_MODE_KEY) === "true",
  );

  const fetchLanguages = async () => {
    try {
      const response = await api.get("/languages");
      const data = response.data.filter((item) => {
        return (item.image = UkFlag);
      });
      setSelectedLanguage(data[0])
      setLanguages(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem(DARK_MODE_KEY, String(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    const closeMenuOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenuOutside);
    return () => document.removeEventListener("mousedown", closeMenuOutside);
  }, []);

  const changeLanguage = (selectedOption) => {
    setSelectedLanguage(selectedOption);
  };

  const onLogout = () => {
    dispatch(remove());
    setIsMenuOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <div className="dark:bg-dark flex bg-white justify-between w-full">
      <div className="ml-[78px] my-4">
        {loading ? (
          <Skeleton width={388} height={30} />
        ) : (
          <Input
            divClassName="h-[38px] !bg-[#F5F6FA] !border-[#D5D5D5] !rounded-[19px]"
            placeholder="Search"
            startIcon="search"
            className="w-[388px]"
            inputClassName=""
          />
        )}
      </div>
      <div className="mr-[31px] flex items-center py-[13px]">
        {loading ? (
          <Skeleton width={30} height={30} />
        ) : (
          <div className="relative flex items-center justify-center">
            <IconComponent icon="bell" />
            <div className="absolute flex items-center justify-center h-[18px] -top-[8px] -right-[4px] w-[18px] rounded-full bg-[#F93C659C]">
              <span className="h-[14px] w-[14px] rounded-full text-sm flex items-center justify-center text-white bg-pink-500">
                <span className="p-[1px]">6</span>
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center ml-[26px] justify-center">
          <div>
            {loading ? (
              <Skeleton width={100} height={30} />
            ) : (
              <Select
                onChange={changeLanguage}
                options={languages}
                className={""}
                value={selectedLanguage}
              />
            )}
          </div>
        </div>
        {loading ? (
          <Skeleton width={150} className="ml-6" height={30} />
        ) : (
          <div className="relative ml-[26.92px]" ref={menuRef}>
            <button
              type="button"
              className="flex items-center jstify-center cursor-pointer"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <img className="h-[44px] w-[44px]" src={profileImage} alt="Profile" />
              <div className="ml-5 flex flex-col text-left">
                <span className="text-[#404040] font-bold text-sm">Moni Roy</span>
                <span className="text-[#565656] mt-[3px] text-xs font-semibold">
                  Admin
                </span>
              </div>
              <div className="ml-[26px]">
                <IconComponent icon="circle-down" className="h-[18px] w-[18px]" />
              </div>
            </button>

            <div
              className={`${isMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"} absolute right-0 mt-2 min-w-[220px] rounded-lg border border-[#E5E7EB] bg-white p-2 shadow-md transition-all duration-150`}
            >
              <div
                type="button"
                onClick={() => setIsDarkMode((prev) => !prev)}
                className="flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm text-[#111827] hover:bg-[#F3F4F6]"
              >
                <span>{isDarkMode ? "Disable Dark Mode" : "Enable Dark Mode"}</span>
                <span
                  className={`h-2.5 w-2.5 rounded-full ${isDarkMode ? "bg-green-500" : "bg-gray-400"}`}
                ></span>
              </div>
              <div
                type="button"
                onClick={onLogout}
                className="mt-1 w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
