import React from "react";
import { RotateLoader } from "react-spinners";

function Loading({ setOpenModal }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-25 z-50">
      <div className="bg-transparent p-8 rounded-lg flex flex-col items-center space-y-4">
        <RotateLoader size={15} color={"#1976d2"} loading={true} />
        <p className="text-lg font-semibold text-white">Loading...</p> {/* Changed text color to white */}
      </div>
    </div>
  );
}

export default Loading;