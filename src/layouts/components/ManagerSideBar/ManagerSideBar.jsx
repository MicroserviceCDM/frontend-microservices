import {
  ArrowRightOnRectangleIcon,
  HomeIcon,
  NewspaperIcon,
  UserCircleIcon,
  UsersIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import config from "../../../config";

function ManagerSideBar() {
  const sidebarItem = [
    {
      icon: <HomeIcon className="w-6 h-auto text-gray-600 dark:text-gray-300" />,
      title: "Dashboard",
      to: config.routes.managerhome,
    },
    {
      icon: (
        <UserCircleIcon className="w-6 h-auto text-gray-600 dark:text-gray-300" />
      ),
      title: "Profile Settings",
      to: config.routes.managerprofile,
    },
    {
      icon: (
        <UserGroupIcon className="w-6 h-auto text-gray-600 dark:text-gray-300" />
      ),
      title: "Staffs",
      to: config.routes.managestaff,
    },
    {
      icon: (
        <UsersIcon className="w-6 h-auto text-gray-600 dark:text-gray-300" />
      ),
      title: "Customers",
      to: config.routes.managecustomer,
    },
    {
      icon: (
        <NewspaperIcon className="w-6 h-auto text-gray-600 dark:text-gray-300" />
      ),
      title: "Reports",
      to: config.routes.managereport,
    },
    {
      icon: (
        <ChatBubbleBottomCenterTextIcon className="w-6 h-auto text-gray-600 dark:text-gray-300" />
      ),
      title: "Conversation",
      to: config.routes.managerchat,
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

export default ManagerSideBar;