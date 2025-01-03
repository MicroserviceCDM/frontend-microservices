import ManagerSideBar from "../../../layouts/components/ManagerSideBar";
// import "./ManagerHome.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import CardWithPieChart from "../../../components/ActiveShapePieChart/PieChartCard";
import CardWithAreaChart from "../../../components/SimpleAreaChart/AreaChartCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { cdmApi } from "../../../misc/cdmApi";
import { config } from "../../../misc/Constants";

function ManagerHome() {
  const [revenue, setRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [allUsers, setAllUsers] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [numberOfOrders, setNumberOfOrders] = useState(0);

  const fetchInfo = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
  
    try {
      // Total Revenue
      const revenueRes = await axios.get(
        `${config.url.API_BASE_URL}/api/v1/orders/getTotalRevenue`,
        { headers }
      );
      setRevenue(revenueRes.data);
  
      // Monthly Revenue
      const monthlyRevenueRes = await axios.get(
        `${config.url.API_BASE_URL}/api/v1/orders/getMonthlyRevenue`,
        { headers }
      );
      setMonthlyRevenue(monthlyRevenueRes.data);
  
      // All Users
      const usersRes = await cdmApi.getAllUsers();
      setAllUsers(usersRes.data.size);
  
      // Average Order Value
      const avgOrderRes = await axios.get(
        `${config.url.API_BASE_URL}/api/v1/orders/getAverageOrderValue`,
        { headers }
      );
      setAverageOrderValue(avgOrderRes.data);
  
      // Orders Per Month
      const ordersPerMonthRes = await axios.get(
        `${config.url.API_BASE_URL}/api/v1/orders/getOrdersPerMonth`,
        { headers }
      );
  
      const getNumberOfOrdersForCurrentMonth = (ordersData) => {
        const date = new Date();
        const month = date
          .toLocaleString("en-US", { month: "long" })
          .toUpperCase();
        return ordersData[month];
      };
  
      const currentMonthOrders = getNumberOfOrdersForCurrentMonth(ordersPerMonthRes.data);
      setNumberOfOrders(currentMonthOrders);
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const StatsCardUpward = ({ title, value, trend }) => {
    return (
      <div className="w-64 bg-white dark:bg-gray-500 shadow-md rounded-lg p-4 flex items-center">
        <div className="text-blue-500 mr-2 dark:text-green-600">
          <FaArrowUp size={20} /> {/* Change the icon and size as needed */}
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 dark:text-white">{title}</span>
          <span className="text-2xl font-bold dark:text-white">{value}</span>
          <span
            className={`text-sm ${
              trend > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend > 0 ? "+" : "-"} {Math.abs(trend)}%
          </span>
        </div>
      </div>
    );
  };
  const StatsCardDownward = ({ title, value, trend, current }) => {
    return (
      <div className="w-64 bg-white shadow-md rounded-lg p-4 flex items-center dark:bg-gray-500">
        <div className="text-red-500 mr-2">
          <FaArrowDown size={20} /> {/* Use the downward arrow icon */}
        </div>
        <div className="flex flex-col ">
          <span className="text-gray-600 dark:text-white">{title}</span>
          <span className="text-2xl font-bold dark:text-white">
            {value} {current}
          </span>
          <span className="text-sm text-red-500 ">- {Math.abs(trend)}%</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex bg-white dark:bg-slate-800">
        <ManagerSideBar />
        <div className="ml-8 hidden sm:block flex flex-col">
          <h1 className="font-medium text-3xl mt-16 dark:text-white">
            Dashboard
          </h1>
          {/* Stats */}
          <div
            className="flex mt-4 space-x-2 style={{width: '70vw', height: '20vh'}}"
            style={{ width: "70vw", height: "20vh" }}
          >
            <div className="w-56 rounded-lg flex flex-1 opacity-90 justify-center items-center">
              <StatsCardUpward
                title="Revenue"
                value={revenue}
                current={"vnd"}
                trend={4.75}
              />
            </div>
            <div className="w-56 rounded-lg flex flex-1 opacity-90 justify-center items-center">
              <StatsCardUpward
                title="Number of Users"
                value={allUsers}
                trend={54.02}
              />
            </div>
            <div className="w-56 rounded-lg flex flex-1 opacity-90 justify-center items-center">
              <StatsCardDownward
                title="Average Order Value"
                value={averageOrderValue.toLocaleString()}
                current={"vnd"}
                trend={-1.39}
              />
            </div>
            <div className="w-56 rounded-lg flex flex-1 opacity-90 justify-center items-center">
              <StatsCardUpward
                title="Number of Orders"
                value={numberOfOrders}
                trend={10.18}
              />
            </div>
          </div>
          {/* Charts */}
          <div className="flex mt-4 space-x-2 ">
            {/* <div className="rounded-lg flex flex-1 opacity-90 justify-center items-center">
              <CardWithPieChart />
            </div> */}
            <div className="rounded-lg flex flex-auto opacity-90 justify-center items-center">
              <CardWithAreaChart monthlyRevenue={monthlyRevenue} />
            </div>
          </div>
        </div>
      </div>

      <div className="block sm:hidden">
        {/* Stats */}
        <div
          className="flex flex-col mt-4 space-x-2"
          style={{ width: "100vw", height: "20vh" }}
        >
          <div className="w-screen rounded-lg flex flex-1 opacity-90 justify-center items-center pl-4">
            <StatsCardUpward title="Revenue" value="$405,091.00" trend={4.75} />
          </div>
          <div className="w-screen rounded-lg flex flex-1 opacity-90 justify-center items-center pt-8">
            <StatsCardUpward
              title="Overdue invoices"
              value="$12,787.00"
              trend={54.02}
            />
          </div>
          <div className="w-screen rounded-lg flex flex-1 opacity-90 justify-center items-center pt-8">
            <StatsCardDownward
              title="Outstanding invoices"
              value="$245,988.00"
              trend={-1.39}
            />
          </div>
          <div className="w-screen rounded-lg flex flex-1 opacity-90 justify-center items-center pt-8">
            <StatsCardUpward
              title="Expenses"
              value="$30,156.00"
              trend={10.18}
            />
          </div>
          <div className="rounded-lg flex-col flex-1 opacity-90 justify-center items-center">
            <CardWithAreaChart monthlyRevenue={monthlyRevenue} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerHome;
