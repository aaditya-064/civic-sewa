import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import TeamCard from "../components/TeamCard";

const AboutPage = () => {
  return (
    <Layout>
      <div className="py-10">
        <p className="text-4xl font-bold text-[#6C63FF] ms-20">Our Mission</p>
        <section className="flex justify-around items-center mt-10 bg-gray-100 py-10 px-40">
          <p className="w-150 bg-white p-20 rounded-3xl text-2xl font-medium tracking-wide drop-shadow-[0_8px_12px_#7280EF]">
            Our goal is to simplify and open up government information, making
            it fast and easy for every citizen to find accurate public service
            details with confidence.
          </p>
          <div className="h-60 w-1 bg-[#6C63FF]"></div>
          <img src="/about.png" alt="about" className="w-120 fill-gray-100" />
        </section>

        {/* Team Section */}
        <p className="text-center text-4xl font-bold mt-10 text-[#6C63FF] underline">
          Team
        </p>
        <section className="flex justify-around items-center mt-10">
          <TeamCard
            image="/Team/biura1.png"
            alternate="team1"
            name="Mission Acharya"
            role="Leading Owl"
          />
          <TeamCard
            image="/Team/Aaditya.jpg"
            alternate="team2"
            name="Aaditya Shrestha"
            role="Full Stack Owl"
          />
          <TeamCard
            image="/Team/Shasank.jpg"
            alternate="te am3"
            name="Shasank Shrestha"
            role="Designing Owl"
          />
          <TeamCard
            image="/Team/Prazwal.jpg"
            alternate="team4"
            name="Prazwal Roka"
            role="Helping Owl"
          />
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
