import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {
  const Navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-10 py-3 bg-gradient-to-r from-[#6A85F1] to-[#8F6EE9]">
      <img src="/civicsewa.png" alt="logo" className="w-[50px]" />
      <div className="flex items-center gap-[40px]">
        <Link
          to={"/"}
          className="font-medium text-white hover:text-gray-800 transition-all duration-300"
        >
          Home
        </Link>
        <Link
          to={"/about"}
          className="font-medium text-white hover:text-gray-800 transition-all duration-300"
        >
          About
        </Link>
        <Link
          to={"/chatbot"}
          className="font-medium text-white hover:text-gray-800 transition-all duration-300"
        >
          Chat Bot
        </Link>
      </div>
      {localStorage.getItem("token") ? (
        <Link
          to={"/"}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            Navigate("/");
            toast.success("Logged Out Successfully");
          }}
          className="bg-[#6C63FF] text-white px-4 py-2 rounded-[25px] font-medium drop-shadow-[0_2px_4px_#000000] hover:bg-[#5A53E9] transition-all duration-300"
        >
          Logout
        </Link>
      ) : (
        <Link
          to={"/register"}
          className="bg-[#6C63FF] text-white px-4 py-2 rounded-[25px] font-medium drop-shadow-[0_2px_4px_#000000] hover:bg-[#5A53E9] transition-all duration-300"
        >
          Sign Up
        </Link>
      )}
    </div>
  );
};

export default Header;
