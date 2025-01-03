import { Fragment, useEffect, useState } from "react";
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
import ShoppingGuide from "../../../pages/NavBar/ShoppingGuide";import React from "react";

const navigation = [
  { name: "Vehicle", href: "/vehicle", current: false },
  { name: "Coupon", href: "/customerhome/coupon", current: false },
  { name: "Shopping Guide", href: "#", current: false },
  { name: "Shop", href: "/shop", current: false },
];

// Mobile navigation (for smaller screens)
const mobile_navigation = [
  ...navigation, // Add all navigation items first
  { name: "Dashboard", href: "/customerhome", current: false },
  { name: "Profile Setting", href: "/customerhome/profile", current: false },
  { name: "Payment Method", href: "/customerhome/payment", current: false },
  { name: "Order History", href: "/customerhome/orderhis", current: false },
  { name: "Report", href: "/customerhome/report", current: false },
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
      } else if (userData.role === "STAFF") {
        navigate("/staffhome");
      } else {
        navigate("/managerhome");
      }
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  // Handle click for navigation items, specifically for "Shopping Guide"
  const handleClick = (name) => {
    if (name === "Shopping Guide") {
      setModalOpen(true);
    }
  };

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });


  useEffect(() => {
    // Apply the theme to the document element
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
    // Save the current theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeSwitch = () => {
      // Toggle the theme
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
  };

  return (
    <Disclosure as="nav" className="bg-slate-800 dark:bg-gray-900">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="px-2 flex items-center lg:px-0">
                {/* Remove lg:hidden to show on all screen size*/}
                <div className="absolute inset-y-0 left-0 flex items-center ">
                  {/* Mobile menu button*/}
                </div>
                <div className="flex-shrink-0">
                  <a href="/">
                    <img
                      className="h-24 w-auto ml-4"
                      src="https://res.cloudinary.com/dqfhfd7ts/image/upload/v1735749663/i3jwqxdc-removebg-preview_mj6icj.png?fbclid=IwZXh0bgNhZW0CMTEAAR12Y7OCWWYXXWSZ1yKy-J3KsomHeOk17uRYxvq9uOoFlSJC6mkYsISQSOM_aem_d7bwwVnag-bGMcdtoQpfzw"
                      alt="Your Company"
                    />
                  </a>
                </div>
                <div className="hidden lg:ml-6 lg:block">
                  <div className="lg:ml-64 flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        onClick={() => handleClick(item.name)}
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-white hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium text-white"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center lg:hidden">
                <div className="flex flex-shrink-0 items-center">
                  <a href="/">
                    <img
                      className="h-24 w-auto"
                      src="https://res.cloudinary.com/dqfhfd7ts/image/upload/v1735749663/i3jwqxdc-removebg-preview_mj6icj.png?fbclid=IwZXh0bgNhZW0CMTEAAR12Y7OCWWYXXWSZ1yKy-J3KsomHeOk17uRYxvq9uOoFlSJC6mkYsISQSOM_aem_d7bwwVnag-bGMcdtoQpfzw"
                      alt="Your Company"
                    />
                  </a>
                </div>
                <div className="hidden sm:ml-6 lg:block">
                  <div className="lg:ml-64 mt-8 flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        onClick={() => handleClick(item.name)}
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-white hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium text-white"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right-side Icons */}
              <div className="flex items-center lg:static lg:inset-auto lg:ml-6 lg:pr-0">
                <button
                  type="button"
                  onClick={handleThemeSwitch}
                  className="ml-4 bg-transparent relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
                <a href="/customerhome/shoppingcart">
                  <button
                    type="button"
                    className="bg-transparent relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <ShoppingCartIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </a>

                {/* Profile dropdown */}
                <button
                  onClick={handleUserButton}
                  type="button"
                  className="bg-transparent ml-4 relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <UserCircleIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu (block lg:hidden) */}
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

          {/* Render the Modal component */}
          <ShoppingGuide open={modalOpen} setOpenModal={setModalOpen} />
        </>
      )}
    </Disclosure>
  );
}