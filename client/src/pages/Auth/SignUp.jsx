import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeClosed } from "lucide-react";

const SignUp = () => {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const Navigate = useNavigate();

  // const url = "http://localhost:8080";
  const url = "https://civic-sewa.onrender.com";

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (info.password !== confirmPassword) {
        toast.error("Confirm Password does not match with Password");
        return;
      }
      await axios({
        url: `${url}/api/v1/auth/register`,
        method: "post",
        data: info,
      });
      setInfo({ username: "", email: "", phoneNumber: "", password: "" });
      setConfirmPassword("");
      toast.success("Sign Up Successfully");
      Navigate("/login");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleConfirmPassword = (e) => {
    // const { name, value } = e.target;
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="flex items-center justify-center h-screen gap-20">
      <div className="flex flex-col gap-4">
        <img src="/civicsewa.png" alt="logo" className="w-[70px]" />
        <h1 className="text-4xl font-bold text-[#8575EC]">SIGN UP</h1>
        <p className="text-[#8575EC] text-md">Hi, Welcome!</p>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-[#8575EC] font-medium tracking-wide"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="border-2 border-gray-300 rounded-md p-2 w-96"
              value={info.username}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-[#8575EC] font-medium tracking-wide"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border-2 border-gray-300 rounded-md p-2 w-46"
                value={info.email}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
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
                className="border-2 border-gray-300 rounded-md p-2 w-46"
                value={`+977${info.phoneNumber}`}
                onChange={(e) => {
                  let input = e.target.value.replace(/^\+977/, "");
                  setInfo({ ...info, phoneNumber: input });
                }}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[#8575EC] font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="border-2 border-gray-300 rounded-md p-2 w-46 pr-10"
                  value={info.password}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5 text-gray-500" />
                  ) : (
                    <EyeClosed className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirmPassword"
                className="text-[#8575EC] font-medium"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="border-2 border-gray-300 rounded-md p-2 w-46 pr-10"
                  value={confirmPassword}
                  onChange={(e) => {
                    handleConfirmPassword(e);
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye className="w-5 h-5 text-gray-500" />
                  ) : (
                    <EyeClosed className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#6C63FF] text-white px-4 py-2 rounded-lg font-medium drop-shadow-[0_2px_4px_#000000] hover:bg-[#5A53E9] transition-all duration-300 mt-4"
          >
            Sign Up
          </button>
          <div className="flex flex-col items-center gap-2">
            <p className="text-gray-500 font-normal">or sign up with</p>
            <div className="flex items-center gap-10">
              <img src="/google.png" alt="google" className="w-7 h-7" />
              <img src="/facebook.png" alt="facebook" className="w-7 h-7" />
            </div>
          </div>
        </form>
        <p className="text-gray-500 font-normal">
          Already have an account?{" "}
          <Link to={"/login"} className="text-[#8575EC] font-medium">
            Login
          </Link>
        </p>
      </div>
      <img src="/register.png" alt="login" className="w-150" />
    </div>
  );
};

export default SignUp;
