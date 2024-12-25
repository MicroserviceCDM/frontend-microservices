import "./SideBarStaff.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightFromBracket,
  faUser,
  faFileLines,
  faUsers,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import EarbudsBatteryOutlinedIcon from "@mui/icons-material/EarbudsBatteryOutlined";
import config from "../../../config";
import {
  ArrowRightCircleIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  NewspaperIcon,
  PaperClipIcon,
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
    // {
    //   icon: <EarbudsBatteryOutlinedIcon className='w-6 h-auto' />,
    //   title: 'Products',
    //   to: config.routes.staffshop
    // },
    // {
    //   icon: <DirectionsCarFilledOutlinedIcon className='w-6 h-auto' />,
    //   title: 'Inventories',
    //   to: config.routes.staffcar
    // },
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
    <div style={{ height: "auto" }}>
      <div className="flex flex-col items-center h-4/5 mt-24 hidden lg:block">
        {sidebarItem.map((item, index) => (
          <div key={index}>
            <Link
              to={item.to}
              className="no-decoration"
              onClick={() => handleClick(item.title)}
            >
              <div
                className={`sidebar-item-cus hover:bg-gray-200 dark:hover:bg-gray-600 ${
                  location.pathname === item.to
                    ? "bg-gray-200 dark:bg-gray-600"
                    : "bg-white dark:bg-slate-800 "
                } `}
              >
                {item.icon}
                <div className="flex justify-center items-center">
                  <p
                    className="ml-8 text-black dark:text-white"
                    style={{ fontSize: 18 }}
                  >
                    {item.title}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBarStaff;
