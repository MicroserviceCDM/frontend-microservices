import React from "react";
import { motion } from "framer-motion";
import AboutCar from "../../../assets/images/LandingPage/about_car.jpg";

const About = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Redefining Luxury Car Experience
              </h2>
              <div className="h-1 w-20 bg-red-600"></div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              At CDMA, we blend traditional craftsmanship with cutting-edge technology 
              to deliver an unparalleled automotive experience. Our commitment to excellence 
              drives everything we do.
            </p>

            <div className="grid grid-cols-3 gap-8">
              {[
                { number: "25+", label: "Years Experience" },
                { number: "1000+", label: "Cars Delivered" },
                { number: "100%", label: "Client Satisfaction" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-red-500 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <button className="group relative px-8 py-4 bg-transparent overflow-hidden">
              <div className="absolute inset-0 w-3 bg-red-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative text-white group-hover:text-white">
                Learn More
              </span>
            </button>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[600px] rounded-lg overflow-hidden">
              <img
                src={AboutCar}
                alt="Luxury Car"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;