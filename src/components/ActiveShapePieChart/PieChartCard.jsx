import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import arrow icons from react-icons
import ActiveShapePieChart from './index';

const CardWithPieChart = () => {
  const [chartDataIndex, setChartDataIndex] = useState(0);
  const chartData = [
    // Define your different sets of data for the pie chart
    // Example data sets
    [
      { name: 'Category A', value: 400 },
      { name: 'Category B', value: 300 },
      { name: 'Category C', value: 300 },
      { name: 'Category D', value: 200 },
    ],
    // Another set of data
    [
      { name: 'Category E', value: 200 },
      { name: 'Category F', value: 400 },
      { name: 'Category G', value: 100 },
      { name: 'Category H', value: 300 },
    ],
    // Add more data sets if needed
  ];

  const handlePreviousClick = () => {
    setChartDataIndex((prevIndex) => (prevIndex === 0 ? chartData.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setChartDataIndex((prevIndex) => (prevIndex === chartData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-96">
      <div className="relative h-64"> 
        <div className="absolute inset-0 flex items-center justify-center">
          <ActiveShapePieChart data={chartData[chartDataIndex]} />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePreviousClick}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        >
          <FaArrowLeft />
        </button>
        <h2>Model S</h2>
        <button
          onClick={handleNextClick}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CardWithPieChart;
