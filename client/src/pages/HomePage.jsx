import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, LogIn } from "lucide-react";
import Card from "../components/card";

const HomePage = () => {
  return (
    <Layout>
      <div className="flex justify-around items-center gap-10 mt-28">
        <section className="flex justify-around items-center ">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold">
              Civic <span className="text-[#6C63FF] font-black">सेवा</span>
            </h1>
            <h1 className="text-4xl font-bold">KNOW BEFORE YOU GO</h1>
            <p className="text-lg w-96">
              Skip the confusion. Our Chatbot gives you fast, clear answers
              about government services.
            </p>
            <div className="flex gap-4 mt-5">
              <Link
                to={"/register"}
                className="bg-[#6C63FF] text-white px-4 py-2 rounded-[15px] font-medium flex gap-2 hover:opacity-80 transition-all duration-300"
              >
                Get Your सेवा <ArrowRight className="text-white w-5" />
              </Link>
              <Link
                to={"/login"}
                className="bg-[#6C63FF] text-white px-4 py-2 rounded-[15px] font-medium flex gap-2 hover:opacity-80 transition-all duration-300"
              >
                Login <LogIn className="text-white w-5" />
              </Link>
            </div>
          </div>
          <div></div>
        </section>
        <section>
          <img src="/intro.png" alt="home" className="w-96 scale-x-[-1]" />
        </section>
      </div>
      <div className="flex flex-col items-center justify-center mt-20 bg-gray-100 py-10">
        <h1 className="text-4xl font-bold">
          Services We <span className="text-[#6C63FF]">Provide</span>
        </h1>
        <div className="flex justify-around items-center gap-10 mt-10">
          <Card
            imageUrl="/time.png"
            title="24/7 Service"
            point1="Get the information you need in seconds"
            point2="No more waiting in lines or browsing confusing websites"
          />
          <Card
            imageUrl="/dynamic.png"
            title="Dynamic Response"
            point1="Get instant answers with our smart chatbot that adapts to your questions in real-time"
            point2="Delivering fast and accurate government info without delay."
          />
          <Card
            imageUrl="/faq.png"
            title="FAQ's"
            point1="Quickly browse answers to the most common questions about government services"
            point2="Get clear, simplified instructions for completing government tasks"
          />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
