import { faHouse, faRightFromBracket, faUser, faUsers, faPeopleGroup, faCube , faFileLines } from '@fortawesome/free-solid-svg-icons';
import './ManagerSideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import config from '../../../config';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import EarbudsBatteryOutlinedIcon from '@mui/icons-material/EarbudsBatteryOutlined';
import {
  FaHome,
  FaGithubSquare,
  FaInstagramSquare,
  FaTwitterSquare
} from 'react-icons/fa'


import { ArrowRightOnRectangleIcon, CreditCardIcon, HomeIcon, NewspaperIcon, ShoppingBagIcon, UserCircleIcon, UsersIcon, UserGroupIcon, Square3Stack3DIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'
import { Chat, CreditCard, ShoppingBag } from '@mui/icons-material';

function ManagerSideBar() {
  const sidebarItem = [
    {
      icon: <HomeIcon className='w-6 h-auto dark:text-white' />,
      title: 'Dashboard',
      to: config.routes.managerhome
    },
    {
      icon: <UserCircleIcon className='w-6 h-auto dark:text-white' />,
      title: 'Profile Settings',
      to: config.routes.managerprofile
    },
    {
      icon: <UserGroupIcon  className='w-6 h-auto dark:text-white' />,
      title: 'Staffs',
      to: config.routes.managestaff
    },
    {
      icon: <UsersIcon className='w-6 h-auto dark:text-white' />,
      title: 'Customers',
      to: config.routes.managecustomer
    },
    // {
    //   icon: <EarbudsBatteryOutlinedIcon className='w-6 h-auto' />,
    //   title: 'Products',
    //   to: config.routes.manageshop
    // },
    // {
    //   icon: <DirectionsCarFilledOutlinedIcon className='w-6 h-auto' />,
    //   title: 'Inventories',
    //   to: config.routes.managecar
    // }
    // ,
    {
      icon: <NewspaperIcon className='w-6 h-auto dark:text-white' />,
      title: 'Reports',
      to: config.routes.managereport
    }
    ,
    {
      icon: <ChatBubbleBottomCenterTextIcon className='w-6 h-auto dark:text-white' />,
      title: 'Conversation',
      to: config.routes.managerchat
    }
    ,
    {
      icon: <ArrowRightOnRectangleIcon className='w-6 h-auto dark:text-white' />,
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

export default ManagerSideBar;