import { faCreditCard, faCube, faHome, faHouse, faRightFromBracket, faShirt, faUser, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import config from '../../../config';

import { ArrowRightOnRectangleIcon, CreditCardIcon, HomeIcon, NewspaperIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import "./SideBar.css"
function SideBar() {
  const sidebarItem = [
    {
      icon: <HomeIcon className='w-6 h-auto text-black dark:text-white' />,
      title: 'Dashboard',
      to: config.routes.customerhome
    },
    {
      icon: <UserCircleIcon className='w-6 h-auto text-black dark:text-white' />,
      title: 'Profile Settings',
      to: config.routes.customerprofile
    },
    {
      icon: <CreditCardIcon  className='w-6 h-auto text-black dark:text-white' />,
      title: 'Payment Methods',
      to: config.routes.customerpayment
    },
    {
      icon: <ShoppingBagIcon className='w-6 h-auto text-black dark:text-white' />,
      title: 'Order History',
      to: config.routes.customerorderhis
    },
    {
      icon: <NewspaperIcon className='w-6 h-auto text-black dark:text-white' />,
      title: 'Report',
      to: config.routes.customerreport
    }
    ,
    {
      icon: <ArrowRightOnRectangleIcon className='w-6 h-auto text-black dark:text-white' />,
      title: 'Sign Out',
      to: config.routes.start
    }
  ];

  const location = useLocation();
  const handleClick = (title) => {
    if (title === 'Sign Out') {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("accessToken");
    }
  };
  return (
   <div style={{height: '90vh'}} className='hidden lg:block'>
     <div className='flex flex-col items-center h-4/5 mt-32' >
      {sidebarItem.map((item, index) => (
        <div key={index}>
          <Link to={item.to} className='no-decoration' onClick={() => handleClick(item.title)}>
            <div className={`sidebar-item-cus hover:bg-gray-200 dark:hover:bg-gray-600 ${location.pathname === item.to ? 'bg-gray-200 dark:bg-gray-600' : 'bg-white dark:bg-slate-800 '} `}>
              {item.icon}
              <div className='flex justify-center items-center '><p className='ml-8 text-black dark:text-white' style={{fontSize: 18}}>{item.title}</p></div>
            </div>
          </Link>
        </div>
      ))}
    </div>
   </div>
  );
}

export default SideBar;