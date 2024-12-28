import React from "react";
import { motion } from "framer-motion"; // Thêm animation
import backgroundVideo from "../../../assets/intro1.mp4";
console.log(backgroundVideo)

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video/Image with Overlay */}
      {/* <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ minHeight: '100%', minWidth: '100%' }}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute flex top-0 left-0 w-full h-full object-cover z-0"
          style={{
            objectPosition: "center 30%", // Điều chỉnh % để video dịch lên trên
            // hoặc dùng transform
            transform: "translateY(10.9%) scale(1.0)" // Điều chỉnh % để video dịch lên trên
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient overlay nằm trên video */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-1" />
      </div>


      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto"
          
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Experience Luxury in Motion
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Discover our exclusive collection of premium vehicles crafted for those who demand excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Explore Collection
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300">
              Book Test Drive
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;