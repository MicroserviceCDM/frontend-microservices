import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import arrow icons from react-icons
import SimpleAreaChart from './index';

const CardWithAreaChart = ({monthlyRevenue}) => {
  const [chartDataIndex, setChartDataIndex] = useState(0);
  const chartData = Object.entries(monthlyRevenue).map(([name, value]) => ({ name, value }));
  useEffect(() => {
    console.log("chart data");
    console.log(chartData);
  }, [chartData]);

  const handlePreviousClick = () => {
    setChartDataIndex((prevIndex) => (prevIndex === 0 ? chartData.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setChartDataIndex((prevIndex) => (prevIndex === chartData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="bg-white dark:bg-gray-200 rounded-lg shadow-md p-4 w-11/12 ">
      <div className="relative h-64 ">
        <div className="absolute inset-0 flex items-center justify-center">
          <SimpleAreaChart data={monthlyRevenue} />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePreviousClick}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:text-black focus:outline-none"
        >
          <FaArrowLeft />
        </button>
        <h2>Revenue this year</h2>
        <button
          onClick={handleNextClick}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:text-black focus:outline-none"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CardWithAreaChart;
