import SideBar from '../../../layouts/components/sideBar/SideBar';
import DashboardItem from '../../../components/DashboardItem';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CustomerHome() {
  const navigate = useNavigate();
  const dashboardItems = [
    {
      img: (
        <img
          src="https://digitalassets.tesla.com/oxp/image/upload/solar-marketing_636x300_4bd7119e4705e.jpg"
          alt="solar"
          className="w-full h-[149px] object-cover rounded-t-lg" 
        />
      ),
      article: 'Appointment',
      content: 'Book a test drive or get your car',
      button: (
        <button
          className="text-black dark:text-white bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 py-1 px-3 border-b-2 border-transparent hover:border-black dark:hover:border-white text-left text-sm"
          onClick={() => navigate('/customerhome/bookappointment')}
        >
          Book Appointment
        </button>
      ),
    },
    {
      img: (
        <img
          src="https://digitalassets.tesla.com/oxp/image/upload/v1692297205/dscf6059-4_acb1b643864e2.png"
          alt="order"
          className="w-full h-[149px] object-cover rounded-t-lg"
        />
      ),
      article: 'Vehicle',
      content: 'Discover our vehicle now',
      button: (
        <button
          className="text-black dark:text-white bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 py-1 px-3 border-b-2 border-transparent hover:border-black dark:hover:border-white text-left text-sm"
          onClick={() => navigate('/vehicle')}
        >
          View All
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 min-h-screen">
      <div className="flex">
        <SideBar />
        <div className="hidden sm:block flex-col w-full">
          <h1 className="font-medium text-3xl mt-16 ml-10 text-black dark:text-white">
            Dashboard
          </h1>
          <div className="flex mt-4 ml-10 space-x-4">
            <DashboardItem data={dashboardItems[0]} />
            <DashboardItem data={dashboardItems[1]} />
          </div>
        </div>
      </div>
      <div className="block sm:hidden p-4">
        <DashboardItem data={dashboardItems[0]} />
        <DashboardItem data={dashboardItems[1]} className="mt-4" />
      </div>
    </div>
  );
}

export default CustomerHome;