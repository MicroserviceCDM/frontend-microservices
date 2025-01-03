import {
  ArrowRightOnRectangleIcon,
  CreditCardIcon,
  HomeIcon,
  NewspaperIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import config from "../../../config";

function SideBar() {
  const sidebarItem = [
    {
      icon: <HomeIcon className="w-6 h-auto text-gray-600 dark:text-gray-300" />,
      title: "Dashboard",
      to: config.routes.customerhome,
    },
    {
      icon: (
        <UserCircleIcon className="w-6 h-auto text-gray-600 dark:text-gray-300" />
      ),
      title: "Profile Settings",
      to: config.routes.customerprofile,
    },
    {
      icon: (
        <CreditCardIcon className="w-6 h-auto text-gray-600 dark:text-gray-300" />
      ),
      title: "Payment Methods",
      to: config.routes.customerpayment,
    },
    {
      icon: (
        <ShoppingBagIcon className="w-6 h-auto text-gray-600 dark:text-gray-300" />
      ),
      title: "Order History",
      to: config.routes.customerorderhis,
    },
    {
      icon: (
        <NewspaperIcon className="w-6 h-auto text-gray-600 dark:text-gray-300" />
      ),
      title: "Report",
      to: config.routes.customerreport,
    },
    {
      icon: (
        <ArrowRightOnRectangleIcon className="w-6 h-auto text-gray-600 dark:text-gray-300" />
      ),
      title: "Sign Out",
      to: config.routes.start,
    },
  ];

  const location = useLocation();
  const handleClick = (title) => {
    if (title === "Sign Out") {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("accessToken");
    }
  };
  return (
    <div className="hidden lg:block h-screen w-64 bg-gray-100 dark:bg-gray-800 p-4">
      <div className="flex flex-col space-y-4 mt-16">
        {sidebarItem.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className={`flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-200 no-underline hover:bg-gray-200 dark:hover:bg-gray-700 ${
              location.pathname === item.to
                ? "bg-gray-200 dark:bg-gray-700"
                : ""
            }`}
            onClick={() => handleClick(item.title)}
          >
            {item.icon}
            <p className="ml-4 text-base font-medium">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideBar;