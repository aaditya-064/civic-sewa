import React from "react";

const TeamCard = ({ image, alternate, name, role }) => {
  return (
    <div className="flex flex-col items-center justify-center relative w-64 h-auto">
      <img
        src={image}
        alt={alternate}
        className="w-full h-auto rounded-xl drop-shadow-[0_8px_12px_#7280EF] hover:scale-105 transition-all duration-300"
      />
      <div className="flex flex-col items-center justify-center gap-2 absolute bottom-2 left-0 w-full bg-white py-2 opacity-90">
        <p className="text-2xl font-medium z-10">{name}</p>
        <p className="text-lg font-medium z-10">{role}</p>
      </div>
    </div>
  );
};

export default TeamCard;
