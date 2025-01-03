import { useState } from 'react';

function DashboardItem({ data, payment_method }) {
  return (
    <div className="flex bg-white dark:bg-gray-600 p-4 mb-4 rounded-lg shadow-md">
      <div className="flex flex-col border border-gray-300 rounded-lg p-3">
        {payment_method === data.article && (
          <div className="w-3 h-3 bg-green-400 rounded-full mb-2"></div>
        )}
        {data.img}
        <p className="text-base font-bold mt-2 text-black dark:text-white">
          {data.article}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {data.content}
        </p>
        {/* <button className='text-black dark:text-white bg-white dark:bg-gray-600'>{data.button}</button> */}
        {data.button}
      </div>
    </div>
  );
}

export default DashboardItem;