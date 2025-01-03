import { faBatteryHalf, faCar, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

function CarCard({ data }) {
  const navigate = useNavigate();

  async function viewDetail() {
    navigate(`/vehicledetail/${data.id}`);
  }

  return (
    <div className="w-[430px] h-[600px] bg-white rounded-lg hover:shadow-xl hover:shadow-gray-400 cursor-pointer xl:m-12 mx-0 mt-4 dark:bg-gray-200">
      <div className="flex">
        <p className="text-3xl font-semibold text-left ml-5 mt-2 dark:text-slate-800">
          {data.model}
        </p>
        <p className="mt-2 mr-5 text-right flex-1">
          <span className="text-3xl font-semibold dark:text-slate-800">
            {data.priceAfterDiscount}
          </span>
          <span className="line-through ml-1 dark:text-slate-800">
            {data.price}
          </span>
        </p>
      </div>
      <div className="flex">
        <p className="text-sm ml-5 dark:text-slate-800">{data.type}</p>
        <p className="text-sm mr-5 mt-[-10px] flex-1 text-right dark:text-slate-800">
          {data.pricepermonth}
        </p>
      </div>
      <p className="text-sm ml-5 mt-[-10px] dark:text-slate-800">
        {data.mileodometer} mile odometer
      </p>
      <div>{data.image}</div>
      <div className="flex mt-5">
        <div className="flex flex-col justify-center items-center flex-1">
          <p className="dark:text-slate-800">
            <span className="text-xl font-semibold dark:text-slate-800">
              {data.fig1}
            </span>
            mi
          </p>
          <p className="dark:text-slate-800 text-center">Range (EPA est.)</p>
        </div>
        <div className="w-[0.5px] h-12 bg-black dark:bg-slate-800"></div>
        <div className="flex flex-col justify-center items-center flex-1">
          <p className="dark:text-slate-800">
            <span className="text-xl font-semibold dark:text-slate-800">
              {data.fig2}
            </span>
            mph
          </p>
          <p className="dark:text-slate-800 text-center">Top Speed</p>
        </div>
        <div className="w-[0.5px] h-12 bg-black dark:bg-slate-800"></div>
        <div className="flex flex-col justify-center items-center flex-1">
          <p className="dark:text-slate-800">
            <span className="text-xl font-semibold dark:text-slate-800">
              {data.fig3}
            </span>
            s
          </p>
          <p className="dark:text-slate-800 text-center">0 - 60 mph</p>
        </div>
      </div>
      <br />
      <div className="flex">
        <div className="flex-1 py-4"></div>
        <button
          className="flex-1 py-2 bg-black hover:bg-gray-800 text-white font-medium dark:bg-blue-500 dark:hover:bg-blue-700"
          onClick={viewDetail}
        >
          View Details
        </button>
        <div className="flex-1"></div>
      </div>

      <div className="flex ml-8 mt-4">
        <FontAwesomeIcon icon={faCar} className="dark:text-slate-800" />
        <p className="ml-2 dark:text-slate-800">{data.feature}</p>
      </div>
      <div className="flex ml-8 mt-4">
        <FontAwesomeIcon
          icon={faBatteryHalf}
          className="dark:text-slate-800"
        />
        <p className="ml-2 dark:text-slate-800">{data.power}</p>
      </div>
      <div className="flex ml-8 mt-4">
        <FontAwesomeIcon icon={faCircleCheck} className="dark:text-slate-800" />
        <p className="ml-2 dark:text-slate-800">{data.isAvailable}</p>
      </div>
    </div>
  );
}

export default CarCard;