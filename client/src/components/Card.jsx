import React from "react";
import { ChevronRight } from "lucide-react";

const Card = ({ imageUrl, title, point1, point2 }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-70 h-96 bg-white rounded-3xl p-4 drop-shadow-[0_8px_12px_#7280EF]">
      <img src={imageUrl} alt="card" className="w-33 h-24" />
      <p className="text-2xl font-bold text-[#6C63FF]">{title}</p>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <ChevronRight className="w-6 h-6" /> {point1}
        </div>
        <div className="flex gap-2">
          <ChevronRight className="w-6 h-6" /> {point2}
        </div>
      </div>
    </div>
  );
};

export default Card;
