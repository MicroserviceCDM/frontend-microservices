import { useEffect } from "react";
import './searchbar.css';
function index() {
  useEffect(() => {});

  return (
      
      <div className=" flex justify-start float-right relative bg-white"  style={{width: 280}}>
              <input
                className="bg-white text-sm leading-none text-left text-gray-600 px-4 py-3 w-full border rounded border-gray-300 outline-none"
                type="text"
                placeholder="Search"
              />
              <svg
                className="absolute right-3 z-10 cursor-pointer mt-2"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                  stroke="#4B5563"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 21L15 15"
                  stroke="#4B5563"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

  );
}

export default index;
