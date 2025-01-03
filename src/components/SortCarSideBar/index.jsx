import React from 'react';

function SortCarSideBar() {
  const gradientBlack = 'linear-gradient(to bottom, #000000, #ffffff)';
  const gradientRed = 'linear-gradient(to bottom, #f90000, #fff8f8)';
  const gradientBlue = 'linear-gradient(to bottom, #ececec, #0071f9)';
  const gradientGreen = 'linear-gradient(to bottom, #ececec, #055904)';
  const gradientGray = 'linear-gradient(to bottom, #ffffff, #cfd1cf)';

  return (
    <div className="hidden bg-gray-100 dark:bg-gray-800 xl:block p-4">
      <select className="w-full border-2 border-black px-4 py-2 bg-gray-100 dark:bg-gray-900 text-black dark:text-white font-medium rounded-md mb-4">
        <option value="option1">Price: Low to High</option>
        <option value="option2">Price: High to Low</option>
      </select>

      <p className="text-base font-semibold mb-2">Model</p>
      <div className="space-y-2">
        <label className="flex items-center">
          <input type="radio" name="radio-model" className="form-radio h-5 w-5 text-gray-600 dark:text-gray-300" />
          <span className="ml-2 text-gray-700 dark:text-gray-200">Model S</span>
        </label>
        <label className="flex items-center">
          <input type="radio" name="radio-model" className="form-radio h-5 w-5 text-gray-600 dark:text-gray-300" />
          <span className="ml-2 text-gray-700 dark:text-gray-200">Model 3</span>
        </label>
        <label className="flex items-center">
          <input type="radio" name="radio-model" className="form-radio h-5 w-5 text-gray-600 dark:text-gray-300" />
          <span className="ml-2 text-gray-700 dark:text-gray-200">Model X</span>
        </label>
        <label className="flex items-center">
          <input type="radio" name="radio-model" className="form-radio h-5 w-5 text-gray-600 dark:text-gray-300" />
          <span className="ml-2 text-gray-700 dark:text-gray-200">Model Y</span>
        </label>
      </div>

      <p className="text-base font-semibold mt-4 mb-2">Trim</p>
      <div className="space-y-2">
        <label className="flex items-center">
          <input type="checkbox" name="checkbox-model" className="form-checkbox h-5 w-5 text-gray-600 dark:text-gray-300" />
          <span className="ml-2 text-gray-700 dark:text-gray-200">Performance All-Wheel Drive</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="checkbox-model" className="form-checkbox h-5 w-5 text-gray-600 dark:text-gray-300" />
          <span className="ml-2 text-gray-700 dark:text-gray-200">Long Range All-Wheel Drive</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="checkbox-model" className="form-checkbox h-5 w-5 text-gray-600 dark:text-gray-300" />
          <span className="ml-2 text-gray-700 dark:text-gray-200">Model Y All-Wheel Drive</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="checkbox-model" className="form-checkbox h-5 w-5 text-gray-600 dark:text-gray-300" />
          <span className="ml-2 text-gray-700 dark:text-gray-200">Model Y Rear-Wheel Drive</span>
        </label>
      </div>

      <p className="text-base font-semibold mt-4 mb-2">Exterior Paint</p>
      <div className="flex space-x-2">
        <button type='button' className="w-12 h-12 rounded-full border border-gray-400 hover:shadow-md" style={{ backgroundImage: gradientBlack }}></button>
        <button type='button' className="w-12 h-12 rounded-full border border-gray-400 hover:shadow-md" style={{ backgroundImage: gradientRed }}></button>
        <button type='button' className="w-12 h-12 rounded-full border border-gray-400 hover:shadow-md" style={{ backgroundImage: gradientBlue }}></button>
        <button type='button' className="w-12 h-12 rounded-full border border-gray-400 hover:shadow-md" style={{ backgroundImage: gradientGreen }}></button>
        <button type='button' className="w-12 h-12 rounded-full border border-gray-400 hover:shadow-md" style={{ backgroundImage: gradientGray }}></button>
      </div>

      <p className="text-base font-semibold mt-4 mb-2">Interior Color</p>
      <div className="flex space-x-2">
        <button type='button' className="w-12 h-12 rounded-full border border-gray-400 hover:shadow-md" style={{ backgroundColor: 'black' }}></button>
        <button type='button' className="w-12 h-12 rounded-full border border-gray-400 hover:shadow-md" style={{ backgroundColor: 'white' }}></button>
        <button type='button' className="w-12 h-12 rounded-full border border-gray-400 hover:shadow-md" style={{ backgroundColor: '#7c471f' }}></button>
      </div>
    </div>
  );
}

export default SortCarSideBar;