import React, { Fragment, useState, useEffect } from "react";
import "./NavBarStaff.css";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserCircleIcon,
  ShoppingCartIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import EarbudsBatteryOutlinedIcon from "@mui/icons-material/EarbudsBatteryOutlined";

const navigation = [
  // { name: 'Vehicle', href: '/vehicle', current: false },
  { name: "Manage Vehicle", href: "/staffhome/car", current: false },
  { name: "Manage Product", href: "/staffhome/shop", current: false },
  // { name: 'Shop', href: '/shop', current: false },
];

const mobile_navigation = [
  { name: "Manage Vehicle", href: "/staffhome/car", current: false },
  { name: "Manage Product", href: "/staffhome/shop", current: false },

  { name: "Dashboard", href: "/staffhome", current: false },
  { name: "Profile Setting", href: "/staffhome/profile", current: false },
  { name: "Orders", href: "/staffhome/order", current: false },
  { name: "Reports", href: "/staffhome/report", current: false },
  { name: "Customers", href: "/staffhome/customer", current: false },
  { name: "Vouchers", href: "/staffhome/coupon", current: false },
  { name: "Sign out", href: "/", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || ""
  );

  const handleUserButton = () => {
    if (userData == "") {
      navigate("/login");
    } else {
      if (userData.role === "CUSTOMER") {
        navigate("/customerhome");
      } else if (userData === "STAFF") {
        navigate("/staffhome");
      } else {
        navigate("/managerhome");
      }
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = (name) => {
    if (name === "Shopping Guide") {
      setModalOpen(true);
    }
  };

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    let tmp = localStorage.getItem("theme");
    if (tmp) {
      if (tmp === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    console.log(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <Disclosure as="nav" className="bg-slate-800 dark:bg-gray-600">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-slate-800 dark:bg-gray-600">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <a href="/">
                    <img
                      className="h-24 w-auto"
                      src="https://res.cloudinary.com/droondbdu/image/upload/v1702194603/wepik-gradient-modern-car-detail-clean-amp-repair-logo-20231210074938LRYR_dyz3ez.png"
                      alt="Your Company"
                    />
                  </a>
                </div>
                <div className="hidden sm:ml-6 lg:block">
                  <div className="lg:ml-64 mt-8 flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <a href="/staffhome/shop">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <EarbudsBatteryOutlinedIcon className="h-6 w-6" aria-hidden="true"/>
                </button>
                </a>

                <a href="/staffhome/car">
                <button
                  type="button"
                  className="ml-4 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <DirectionsCarFilledOutlinedIcon className="h-6 w-6" aria-hidden="true"/>
                </button>
                </a> */}

                {/* Profile dropdown */}
                <button
                  type="button"
                  onClick={handleThemeSwitch}
                  className="ml-4 bg-transparent relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <MoonIcon
                    className={`h-6 w-6 ${
                      theme === "dark" ? "hidden" : "block"
                    }`}
                    aria-hidden="true"
                  />
                  <SunIcon
                    className={`h-6 w-6 ${
                      theme === "light" ? "hidden" : "block"
                    }`}
                    aria-hidden="true"
                  />{" "}
                </button>
                <div className="w-0.5 h-8 bg-gray-400 mx-2"></div>
                <a href="/staffhome">
                  <button
                    type="button"
                    className="ml-4 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </a>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="block lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {mobile_navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
