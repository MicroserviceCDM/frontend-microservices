import React from "react";
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import dealershipImage from "../../../assets/images/LandingPage/dealership.jpg";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      {/* Support Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="border-b border-gray-700 pb-20">
          <h2 className="text-3xl font-bold text-white mb-12">
            We're Here to Help
            <div className="h-1 w-20 bg-red-600 mt-4"></div>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Contact Card */}
            <div className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
              <div className="flex items-center mb-6">
                <FaPhoneAlt className="text-red-500 text-2xl mr-4" />
                <h3 className="text-xl font-semibold text-white">Contact Us</h3>
              </div>
              <p className="text-2xl font-bold text-white mb-2">1800 8192</p>
              <p className="text-gray-400">24/7 Customer Support</p>
            </div>

            {/* Location Card */}
            <div className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
              <div className="flex items-center mb-6">
                <FaMapMarkerAlt className="text-red-500 text-2xl mr-4" />
                <h3 className="text-xl font-semibold text-white">Visit Us</h3>
              </div>
              <p className="text-white mb-2">Ho Chi Minh City</p>
              <p className="text-gray-400">Alexandre De Rhodes Street, District 1</p>
            </div>

            {/* Hours Card */}
            <div className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
              <div className="flex items-center mb-6">
                <FaClock className="text-red-500 text-2xl mr-4" />
                <h3 className="text-xl font-semibold text-white">Working Hours</h3>
              </div>
              <p className="text-white mb-2">Mon-Fri: 8am-6pm</p>
              <p className="text-gray-400">Sat: 8am-12pm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-500">CDMA.</h2>
            <p className="text-gray-400">
              Redefining the future of automotive luxury with innovation, 
              performance, and unparalleled customer service.
            </p>
            <div className="flex space-x-4">
              <FaFacebookSquare className="text-2xl hover:text-red-500 cursor-pointer transition-colors" />
              <FaInstagramSquare className="text-2xl hover:text-red-500 cursor-pointer transition-colors" />
              <FaTwitterSquare className="text-2xl hover:text-red-500 cursor-pointer transition-colors" />
              <FaGithubSquare className="text-2xl hover:text-red-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          {[
            {
              title: "Solutions",
              links: ["Analytics", "Marketing", "Commerce", "Insights"]
            },
            {
              title: "Support",
              links: ["Pricing", "Documentation", "Guides", "API Status"]
            },
            {
              title: "Company",
              links: ["About", "Blog", "Jobs", "Press", "Partners"]
            }
          ].map((column, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-6">{column.title}</h3>
              <ul className="space-y-4">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 CDMA. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-red-500 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 text-sm transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;