import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cdmApi } from "../../../misc/cdmApi";
import { FaSearch, FaFilter, FaTimes, FaCarSide } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Vehicle() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);
  const [sortBy, setSortBy] = useState("model");
  const [direction, setDirection] = useState("ASC");
  const [model, setModel] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCars();
  }, [sortBy, direction, page, size, model]);

  const handleChangeModel = (model) => {
    setModel(model);
  };

  const handleSortDirection = (e) => {
    setDirection(e.target.value);
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearch = async (value) => {
    if (value === "") {
      fetchCars();
    } else {
      const data = await cdmApi.getCarByNameContaining(value);
      setData(data.data);
    }
  };

  const fetchCars = async () => {
    try {
      if (model) {
        const res = await cdmApi.getAllCarsByModel(model);
        setData(res.data);
        return;
      }
      const res = await cdmApi.getAllCars(page, size, sortBy, direction);
      setData(res.data.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const VehicleDetailModal = ({ vehicle, onClose }) => {
    if (!vehicle) return null;

    const handleBookAppointment = () => {
      setShowModal(false);
      setSelectedVehicle(null);
      
      navigate('/customerhome/bookappointment', { 
        state: { 
          carId: vehicle.id,
          model: vehicle.model,
          price: vehicle.orgPrice,
          image: vehicle.imgSrc
        } 
      });
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="relative">
            <img 
              src={vehicle.imgSrc} 
              alt={vehicle.model}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
            >
              <FaTimes />
            </button>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {vehicle.model}
                </h2>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                  {vehicle.trim}
                </span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ${vehicle.orgPrice.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  ${vehicle.perMonthPrice}/month
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
                <FaCarSide className="mx-auto text-2xl text-blue-600 dark:text-blue-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Range</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{vehicle.range} mi</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
                <FaCarSide className="mx-auto text-2xl text-blue-600 dark:text-blue-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Top Speed</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{vehicle.topSpeed} mph</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
                <FaCarSide className="mx-auto text-2xl text-blue-600 dark:text-blue-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">0-60 mph</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{vehicle.timeToReach}s</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Features
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{vehicle.tech}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Included Package
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{vehicle.gift}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Mileage
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{vehicle.odo} miles</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
                onClick={handleBookAppointment}
              >
                Book Appointment
              </button>
              <button 
                className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 px-6 rounded-xl font-semibold transition-colors"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Explore Our Fleet
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Discover luxury and performance in every vehicle
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-none bg-white dark:bg-gray-800 shadow-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Search vehicles..."
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-xl"
          >
            <FaFilter className="mr-2" />
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Panel */}
          <motion.div 
            className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-6">
              <div className="space-y-6">
              <div>
  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
    Sort Options
  </h3>
  <div className="relative">
    <select 
      onChange={handleSortBy}
      className="w-full h-11 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white px-4 py-2.5 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="model" className="dark:bg-slate-700">Model</option>
      <option value="orgPrice" className="dark:bg-slate-700">Price</option>
      <option value="perMonthPrice" className="dark:bg-slate-700">Monthly Price</option>
      <option value="range" className="dark:bg-slate-700">Range</option>
      <option value="topSpeed" className="dark:bg-slate-700">Top Speed</option>
      <option value="timeToReach" className="dark:bg-slate-700">Acceleration</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
      </svg>
    </div>
  </div>
</div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Model Series</h3>
                  <div className="space-y-3">
                    {["Model S", "Model 3", "Model X", "Model Y", "Beta Model", "All"].map((modelName) => (
                      <label key={modelName} className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="radio-model"
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                          onChange={() => handleChangeModel(modelName === "All" ? "" : modelName)}
                        />
                        <span className="ml-3 text-gray-700 dark:text-gray-300">
                          {modelName}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vehicle Grid */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {data.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative w-full pt-[56.25%]">
                    <img 
                      src={vehicle.imgSrc}
                      alt={vehicle.model}
                      className="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    {!vehicle.status && (
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 m-2 rounded-full text-sm">
                        Sold Out
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start h-10">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-3 flex-1 mr-2">
                        {vehicle.model}
                      </h3>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm whitespace-nowrap shrink-0">
                        {vehicle.trim}
                      </span>
                    <div className="mt-4 h-12">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ${vehicle.orgPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                        ${vehicle.perMonthPrice}/mo
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 my-6 h-16">
                      <div className="text-center flex flex-col justify-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Range</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{vehicle.range}mi</p>
                      </div>
                      <div className="text-center border-x border-gray-200 dark:border-gray-700 flex flex-col justify-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Top Speed</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{vehicle.topSpeed}mph</p>
                      </div>
                      <div className="text-center flex flex-col justify-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">0-60</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{vehicle.timeToReach}s</p>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button 
                        className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors duration-200
                          ${vehicle.status 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                        disabled={!vehicle.status}
                        onClick={() => vehicle.status && handleViewDetails(vehicle)}
                      >
                        {vehicle.status ? 'View Details' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <VehicleDetailModal
            vehicle={selectedVehicle}
            onClose={() => {
              setShowModal(false);
              setSelectedVehicle(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Vehicle;
