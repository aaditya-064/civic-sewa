import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [info, setInfo] = useState({
    phoneNumber: "",
    password: "",
  });

  const Navigate = useNavigate();

  // const url = "http://localhost:8080";
  const url = "https://civic-sewa.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios({
        url: `${url}/api/v1/auth/login`,
        method: "post",
        data: info,
      });
      const payload = data.data;
      const token = payload.token;
      // localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", token);
      toast.success("Login Successfully");
      Navigate("/");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  return (
    <div className="flex items-center justify-center h-screen gap-20">
      <div className="flex flex-col gap-4">
        <img src="/civicsewa.png" alt="logo" className="w-[70px]" />
        <h1 className="text-4xl font-bold text-[#8575EC]">LOGIN</h1>
        <p className="text-[#8575EC] text-md">Hi, Welcome back!</p>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="text-[#8575EC] font-medium tracking-wide"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="border-2 border-gray-300 rounded-md p-2 w-96"
              value={`+977${info.phoneNumber}`}
              onChange={(e) => {
                let input = e.target.value.replace(/^\+977/, "");
                setInfo({ ...info, phoneNumber: input });
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[#8575EC] font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border-2 border-gray-300 rounded-md p-2"
              value={info.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>

          {/* reamining to integrate */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <p className="text-[#8575EC] font-medium">Remember me</p>
            </div>
            <Link to={""} className="text-gray-500 font-normal">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="bg-[#6C63FF] text-white px-4 py-2 rounded-lg font-medium drop-shadow-[0_2px_4px_#000000] hover:bg-[#5A53E9] transition-all duration-300 mt-4"
          >
            Login
          </button>
          <div className="flex flex-col items-center gap-2">
            <p className="text-gray-500 font-normal">or login with</p>
            <div className="flex items-center gap-10">
              <img src="/google.png" alt="google" className="w-7 h-7" />
              <img src="/facebook.png" alt="facebook" className="w-7 h-7" />
            </div>
          </div>
        </form>
        <p className="text-gray-500 font-normal">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-[#8575EC] font-medium">
            Sign Up
          </Link>
        </p>
      </div>
      <img src="/login.png" alt="login" className="w-150" />
    </div>
  );
};

export default Login;
