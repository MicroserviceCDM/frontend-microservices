import React from 'react';
import SubscribeCar from '../../../assets/images/LandingPage/subcribe_car.jpg';

const Subscribe = () => {
  return (
    <div className="relative py-24 bg-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Content */}
            <div className="p-12 lg:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Join Our Exclusive Club of Car Enthusiasts
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Get early access to our latest models, exclusive events, and special offers. 
                Be the first to know about our upcoming releases and automotive innovations.
              </p>
              
              <form className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <button className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105">
                  Subscribe Now
                </button>
              </form>

              <p className="mt-6 text-sm text-gray-400">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>

            {/* Right Image */}
            <div className="relative h-full">
              <img
                src={SubscribeCar}
                alt="Luxury Car"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;