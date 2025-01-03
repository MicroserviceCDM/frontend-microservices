import React from "react";
import { motion } from "framer-motion";
import backgroundVideo from "../../../assets/intro1.mp4";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden dark:bg-gray-900">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute flex top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70 dark:from-black/80 dark:via-transparent dark:to-black/80 z-1" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white dark:text-gray-200 mb-6 leading-tight tracking-tight">
            Experience Luxury in Motion
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-100 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Discover our exclusive collection of premium vehicles crafted for
            those who demand excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 active:scale-95">
              Explore Collection
            </button>
            <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 dark:hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-gray-500 active:scale-95">
              Book Test Drive
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.svg
            className="w-6 h-6 text-white dark:text-gray-400 animate-bounce"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </motion.svg>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;