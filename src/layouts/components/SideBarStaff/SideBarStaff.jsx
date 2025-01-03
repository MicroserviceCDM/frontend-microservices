import { Link, useLocation } from "react-router-dom";
import config from "../../../config";
import {
  ArrowRightOnRectangleIcon,
  HomeIcon,
  NewspaperIcon,
  ShoppingBagIcon,
  TicketIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

function SideBarStaff() {
  const sidebarItem = [
    {
      icon: <HomeIcon className="w-6 h-auto  text-black dark:text-white" />,
      title: "Dashboard",
      to: config.routes.staffhome,
    },
    {
      icon: (
        <UserCircleIcon className="w-6 h-auto  text-black dark:text-white" />
      ),
      title: "Profile Settings",
      to: config.routes.staffprofile,
    },
    {
      icon: (
        <ShoppingBagIcon className="w-6 h-auto  text-black dark:text-white" />
      ),
      title: "Order",
      to: config.routes.stafforder,
    },
    {
      icon: (
        <NewspaperIcon className="w-6 h-auto  text-black dark:text-white" />
      ),
      title: "Reports",
      to: config.routes.staffreport,
    },
    {
      icon: (
        <UserGroupIcon className="w-6 h-auto  text-black dark:text-white" />
      ),
      title: "Customers",
      to: config.routes.staffcustomer,
    },
    {
      icon: <TicketIcon className="w-6 h-auto  text-black dark:text-white" />,
      title: "Voucher",
      to: config.routes.staffcoupon,
    },
    {
      icon: (
        <ArrowRightOnRectangleIcon className="w-6 h-auto  text-black dark:text-white" />
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
      <div className="flex flex-col space-y-4">
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

export default SideBarStaff;
