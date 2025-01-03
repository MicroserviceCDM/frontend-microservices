import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { cdmApi } from "../../../misc/cdmApi";
import { useNavigate } from "react-router-dom";
import { config } from "../../../misc/Constants";

function VehicleDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({}); // Initialize as an empty object

  const fetchInfo = async () => {
    try {
      const res = await cdmApi.getCarById(params.id);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Panel */}
      <div className="w-2/3 flex flex-col">
        <div className="relative flex-grow">
          {/* Image Container */}
          <img
            src={data.imgSrc}
            alt={data.model}
            className="w-full h-full object-cover"
          />
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faChevronRight}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl cursor-pointer"
          />
        </div>

        {/* Price Card */}
        <div className="flex p-4 bg-gray-200">
          <div className="flex-1 text-center">
            <p className="text-lg font-semibold">
              {data.orgPrice ? data.orgPrice.toLocaleString() : "N/A"}
            </p>
            <p>Original Price</p>
          </div>
          <div className="w-px mx-4 bg-gray-500"></div>
          <div className="flex-1 text-center">
            <p className="text-lg font-semibold">
              {data.disPrice ? data.disPrice.toLocaleString() : "N/A"}
            </p>
            <p>After Probable Saving</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/3 p-6 overflow-y-auto bg-white">
        {/* Warranty Information */}
        <div className="bg-gray-800 text-white p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Warranty Information</h2>
          <h3 className="font-semibold text-lg">
            1. New Vehicle Limited Warranty
          </h3>
          <p className="text-sm font-light mb-4">
            Your vehicle is protected by a New Vehicle Limited Warranty, which
            includes the Basic Vehicle Limited Warranty, the Supplemental
            Restraint System Limited Warranty and the Battery and Drive Unit
            Limited Warranty.
          </p>
          <h3 className="font-semibold text-lg">
            2. Basic Vehicle Limited Warranty
          </h3>
          <p className="text-sm font-light mb-4">
            The Basic Vehicle Limited Warranty covers your vehicle for 4 years or
            50,000 miles, whichever comes first.
          </p>
          <a
            href="https://www.tesla.com/support/vehicle-warranty"
            className="text-blue-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            See Details...
          </a>
        </div>

        {/* Vehicle Details */}
        <h2 className="text-2xl font-bold text-center">{data.model}</h2>
        <p className="text-sm font-semibold text-center">{data.trim}</p>

        {/* Key Figures */}
        <div className="flex justify-around mt-8">
          <div>
            <p className="text-xl font-bold text-center">
              {data.range ? data.range : "N/A"}
            </p>
            <p className="text-center">Range (EPA est.)</p>
          </div>
          <div>
            <p className="text-xl font-bold text-center">
              {data.topSpeed ? data.topSpeed : "N/A"}
            </p>
            <p className="text-center">Top Speed</p>
          </div>
          <div>
            <p className="text-xl font-bold text-center">
              {data.timeToReach ? data.timeToReach : "N/A"}
            </p>
            <p className="text-center">0 - 60 mph</p>
          </div>
        </div>

        {/* Key Features */}
        <h2 className="text-2xl font-bold text-center mt-8">Key Features</h2>
        <ul className="mt-4 list-disc list-inside">
          <li>Solid Black Paint</li>
          <li>20 Induction Wheels</li>
          <li>Black and White Premium Interior</li>
          <li>Autopilot</li>
          <li>Five Seat Interior</li>
          <li>Tow Hitch</li>
          <li>30-Day Premium Connectivity Trial</li>
        </ul>

        {/* Make Appointment */}
        <h2 className="text-2xl font-bold text-center mt-8">
          Make Appointment
        </h2>
        <button
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/customerhome/bookappointment")}
        >
          Make
        </button>
      </div>
    </div>
  );
}

export default VehicleDetail;