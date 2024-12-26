import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import React from "react";
import { motion } from "framer-motion";
import { FaCopy, FaClock, FaGift } from "react-icons/fa";

function Coupon({ data }) {
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="my-4 w-full max-w-xl"
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        
        {/* Decorative circles */}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-100 dark:bg-gray-900 rounded-full" />
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-100 dark:bg-gray-900 rounded-full" />
        
        {/* Dashed border */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 border-dashed border-2 border-gray-300 dark:border-gray-600" />

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FaGift className="text-2xl text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Special Offer
              </h3>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <FaClock className="text-purple-600 dark:text-purple-400" />
              <span>Expires: {data.exdate}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {data.description}
            </p>
          </div>

          {/* Coupon Code Section */}
          <div className="flex items-stretch">
            <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-l-lg p-4 flex items-center justify-center border-2 border-r-0 border-dashed border-purple-300 dark:border-purple-700">
              <span className="text-2xl font-mono font-bold text-purple-600 dark:text-purple-400 tracking-wider">
                {data.code}
              </span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(data.code);
                setSnackbar({
                  children: "Coupon code copied to clipboard!",
                  severity: "success",
                });
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 rounded-r-lg flex items-center space-x-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <FaCopy className="text-lg" />
              <span className="font-semibold">Copy</span>
            </button>
          </div>

          {/* Save indicator */}
          <div className="mt-4 text-center">
            <span className="inline-flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <span>💰</span>
              <span>Save up to ${data.value}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      {!!snackbar && (
        <Snackbar
          open
          onClose={handleCloseSnackbar}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert 
            {...snackbar} 
            onClose={handleCloseSnackbar}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            icon={<FaCopy className="text-purple-600" />}
          />
        </Snackbar>
      )}
    </motion.div>
  );
}

export default Coupon;
