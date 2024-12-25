import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCar, faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { cdmApi } from "../../../misc/cdmApi";
import { motion } from "framer-motion";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import OtherLoading from "../../../components/OtherLoading";

function BookAppointment() {
  const location = useLocation();
  const carFromVehicle = location.state;
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = React.useState(null);
  const [isOK, setIsOK] = useState(false);
  const [cars, setCars] = useState([]);
  
  const [userData] = useState(JSON.parse(localStorage.getItem("currentUser")) || "");
  const [selectedCar, setSelectedCar] = useState(carFromVehicle?.carId || "");
  const [name, setName] = useState(userData.username || "");
  const [phone, setPhone] = useState(userData.phoneNumber || "");
  const [email, setEmail] = useState(userData.email || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [serviceType, setServiceType] = useState("test-drive");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await cdmApi.getAllCars(0, 100, "model", "ASC");
      setCars(res.data.content.filter(car => car.status)); // Chỉ lấy xe còn available
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleCloseSnackbar = () => setSnackbar(null);

  const submitApp = async () => {
    if (!selectedCar || !name || !phone || !email || !date || !time) {
      setSnackbar({
        children: "Please fill in all required fields",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    try {
      await cdmApi.createAppointment({
        carId: selectedCar,
        email: email,
        date: formatDate(date),
        time: formatTime(time),
        phone: phone,
        note: serviceType === "test-drive" ? "Test Drive" : "Consulting and Buying",
      });
      setIsOK(true);
    } catch (error) {
      setSnackbar({
        children: "Failed to book appointment. Please try again.",
        severity: "error",
      });
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString;
  };

  return (
    <>
      {loading && <OtherLoading setOpenModal={setLoading} />}
      
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-xl text-gray-700 dark:text-gray-200" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Book an Appointment
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 space-y-8"
          >
            {/* Vehicle Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Vehicle *
              </label>
              <div className="relative">
                <select
                  value={selectedCar}
                  onChange={(e) => setSelectedCar(e.target.value)}
                  className="w-full h-11 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white px-4 py-2.5 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="" className="dark:bg-slate-700">Choose a vehicle</option>
                  {cars.map((car) => (
                    <option key={car.id} value={car.id} className="dark:bg-slate-700">
                      {car.model} - ${car.orgPrice.toLocaleString()}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date *
                </label>
                <div className="relative">
                  <FontAwesomeIcon 
                    icon={faCalendar} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full h-11 pl-10 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time *
                </label>
                <div className="relative">
                  <FontAwesomeIcon 
                    icon={faClock} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full h-11 pl-10 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Service Type *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 ${
                    serviceType === "test-drive"
                      ? "border-blue-500 bg-blue-50 dark:bg-slate-700/50"
                      : "border-gray-200 dark:border-slate-600"
                  }`}
                  onClick={() => setServiceType("test-drive")}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      serviceType === "test-drive" ? "border-blue-500" : "border-gray-400"
                    }`}>
                      {serviceType === "test-drive" && (
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Test Drive</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">1 Hour</p>
                    </div>
                  </div>
                </div>
                
                <div
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 ${
                    serviceType === "consulting"
                      ? "border-blue-500 bg-blue-50 dark:bg-slate-700/50"
                      : "border-gray-200 dark:border-slate-600"
                  }`}
                  onClick={() => setServiceType("consulting")}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      serviceType === "consulting" ? "border-blue-500" : "border-gray-400"
                    }`}>
                      {serviceType === "consulting" && (
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Consulting and Buying</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">1 Hour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={submitApp}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Book Appointment
            </button>
          </motion.div>
        </div>
      </div>

      {/* Snackbar */}
      {!!snackbar && (
        <Snackbar
          open
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert 
            {...snackbar} 
            onClose={handleCloseSnackbar}
            className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
          />
        </Snackbar>
      )}
    </>
  );
}

export default BookAppointment;
