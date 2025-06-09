import React from "react";
import { Phone, Mail, Github, Linkedin, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[120px]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#9C96FE"
            d="M0,160L60,165.3C120,171,240,181,360,170.7C480,160,600,128,720,128C840,128,960,160,1080,176C1200,192,1320,192,1380,192L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
          <path
            fill="#B5B1FF"
            fillOpacity="1"
            d="M0,224L60,213.3C120,203,240,181,360,165.3C480,149,600,139,720,144C840,149,960,171,1080,186.7C1200,203,1320,213,1380,218.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>
      </div>

      <div className="flex flex-col justify-between items-center px-80 py-8 bg-[#9C96FE] mt-10">
        <section className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-5">
            <h1 className="text-white text-xl font-medium tracking-wide">
              Contact Details
            </h1>
            <div className="flex items-center gap-2 text-white font-medium">
              <Phone />
              <p>+977-9821582637</p>
            </div>
            <div className="flex items-center gap-2 text-white font-medium hover:text-blue-800 transition-all hover:underline">
              <Mail />
              <Link to={""}>nightowlsnepal@gmail.com</Link>
            </div>
          </div>
          <div className="h-[130px] w-[3px] bg-white"></div>
          <div className="flex flex-col gap-4">
            <p className="text-black text-2xl font-medium tracking-wide">
              Civic{" "}
              <span className="text-[#6C63FF] font-bold text-3xl">सेवा</span>
            </p>
            <div className="flex gap-4 justify-center items-center">
              <Github fill="black" />
              <Linkedin fill="black" />
              <Facebook fill="black" />
            </div>
          </div>
        </section>
        <section className="mt-10 ms-25">
          <p className="font-medium tracking-wide text-white text-center">
            @2025 Civic Sewa. All rights reserved.
          </p>
          <div className="flex gap-4 justify-center items-center mt-2">
            <p className="text-white font-medium tracking-wide hover:underline transition-all cursor-pointer">
              Privacy Policy
            </p>
            <p className="text-white font-medium tracking-wide hover:underline transition-all cursor-pointer">
              Terms of Service
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Footer;
