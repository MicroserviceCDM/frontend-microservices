import React from "react";
import { MoonLoader } from "react-spinners";

function Loading({ setOpenModal }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg flex flex-col items-center space-y-4">
        <MoonLoader size={60} color={"#1976d2"} loading={true} /> 
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;