import React from "react";
import ambulance from "../assets/ambulance.png";

const Loading = () => {
  return (
    <div className="w-full h-16 overflow-hidden relative">
      <div className="absolute left-0 animate-ambulance w-full">
        <img
          src={ambulance}
          alt="Loading..."
          className="w-full max-w-xxs h-auto"
        />
      </div>
    </div>
  );
};

export default Loading;
