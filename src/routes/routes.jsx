import React, { lazy, Suspense } from 'react';
import config from "../config"; // Assuming this holds route paths
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
const DefaultLayout = lazy(() => import("../layouts/defaultLayout"));
const loginregisLayout = lazy(() => import("../layouts/loginregisLayout"));
const landingLayout = lazy(() => import("../layouts/landingLayout"));
const staffLayout = lazy(() => import("../layouts/staffLayout"));
const ManagerLayout = lazy(() => import("../layouts/managerLayout/"));

// Pages - Manager
const ManagerHome = lazy(() => import("../pages/Manager/ManagerHome"));
const ManagerProfile = lazy(() => import("../pages/Manager/ManagerProfile"));
const ManagerVehicleModelS = lazy(() => import("../pages/Manager/ManagerVehicle/VehicleModelS"));
const ManageCustomerPage = lazy(() => import("../pages/Manager/ManageCustomer/ManageCustomer"));
const ManageStaffPage = lazy(() => import("../pages/Manager/ManageStaff/ManageStaff"));
const ManageReport = lazy(() => import("../pages/Manager/ManagerReport"));
const ManageCarPage = lazy(() => import("../pages/Manager/ManageCar/ManageCar"));
const ManageShopPage = lazy(() => import("../pages/Manager/ManageShop/ManageShop"));
const ManagerChat = lazy(() => import("../pages/Manager/ManagerChat/ManagerChat")); // Consider moving Chat into ManagerChat if it's always used together
const Chat = lazy(() => import("../pages/Manager/Chat")); // Likely used standalone as well

// Pages - Customer
const CustomerHome = lazy(() => import("../pages/Customer/CustomerHome"));
const CustomerOrderHistory = lazy(() => import("../pages/Customer/CustomerOrderHistory"));
const CustomerPayment = lazy(() => import("../pages/Customer/CustomerPayment"));
const CustomerProfile = lazy(() => import("../pages/Customer/CustomerProflie"));
const CustomerReport = lazy(() => import("../pages/Customer/CustomerReport"));
const ShoppingCart = lazy(() => import("../pages/Customer/ShoppingCart/ShoppingCart"));
const BookAppointment = lazy(() => import("../pages/Customer/BookAppointment"));

// Pages - Staff
const StaffHome = lazy(() => import("../pages/Staff/StaffHome"));
const StaffReport = lazy(() => import("../pages/Staff/StaffReport"));
const StaffOrder = lazy(() => import("../pages/Staff/StaffOrder/StaffOrder"));
const StaffManageCustomerPage = lazy(() => import("../pages/Staff/StaffCustomer/StaffManageCustomer"));
const StaffManageCarPage = lazy(() => import("../pages/Staff/StaffCar/StaffManageCar"));
const StaffManageShopPage = lazy(() => import("../pages/Staff/StaffShop/StaffManageShop"));
const StaffProfile = lazy(() => import("../pages/Staff/StaffProfile/StaffProfile"));
const StaffVoucher = lazy(() => import("../pages/Staff/StaffVoucher"));

// Pages - NavBar (likely used across different user roles)
const Shop = lazy(() => import("../pages/NavBar/Shop"));
const Vehicle = lazy(() => import("../pages/NavBar/Vehicle"));
const VehicleDetail = lazy(() => import("../pages/NavBar/VehicleDetail"));
const ShopAccessories = lazy(() => import("../pages/NavBar/ShopAccessories"));
const ShopMerchandise = lazy(() => import("../pages/NavBar/ShopMerchandise"));
const ProductShopOverview = lazy(() => import("../pages/NavBar/ProductShopOverview"));
const Coupon = lazy(() => import("../pages/NavBar/Coupon"));


// Pages - Login/Registration
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword/ForgotPassword"));

// Pages - Landing
const LandingPage = lazy(() => import("../pages/LandingPage/LandingPage"));

// Public routes
const publicRoutes = [
  { path: config.routes.shop, component: Shop, layout: DefaultLayout },
  { path: config.routes.vehicle, component: Vehicle, layout: DefaultLayout },
  { path: config.routes.login, component: Login, layout: loginregisLayout },
  {
    path: config.routes.register,
    component: Register,
    layout: loginregisLayout,
  },
  {
    path: config.routes.forgotpassword,
    component: ForgotPassword,
    layout: loginregisLayout,
  },
  { path: config.routes.start, component: LandingPage, layout: landingLayout },
  {
    path: config.routes.vehicledetail,
    component: VehicleDetail,
    layout: loginregisLayout,
  },
  {
    path: config.routes.shopaccessories,
    component: ShopAccessories,
    layout: DefaultLayout,
  },
  {
    path: config.routes.shopmerchandise,
    component: ShopMerchandise,
    layout: DefaultLayout,
  },
  {
    path: config.routes.productdetail,
    component: ProductShopOverview,
    layout: loginregisLayout,
  },
  { path: config.routes.chat, component: Chat, layout: loginregisLayout },
];

const privateRoutes = [];

const customerRole = [
  {
    path: config.routes.bookappointment,
    component: BookAppointment,
    layout: DefaultLayout,
  },
  {
    path: config.routes.shoppingcart,
    component: ShoppingCart,
    layout: DefaultLayout,
  },
  {
    path: config.routes.customerhome,
    component: CustomerHome,
    layout: DefaultLayout,
  },
  {
    path: config.routes.customerprofile,
    component: CustomerProfile,
    layout: DefaultLayout,
  },
  {
    path: config.routes.customerpayment,
    component: CustomerPayment,
    layout: DefaultLayout,
  },
  {
    path: config.routes.customerorderhis,
    component: CustomerOrderHistory,
    layout: DefaultLayout,
  },
  {
    path: config.routes.customerreport,
    component: CustomerReport,
    layout: DefaultLayout,
  },
  { path: config.routes.coupon, component: Coupon, layout: DefaultLayout },
];
const staffRole = [
  {
    path: config.routes.staffprofile,
    component: StaffProfile,
    layout: staffLayout,
  },
  {
    path: config.routes.staffcar,
    component: StaffManageCarPage,
    layout: staffLayout,
  },
  {
    path: config.routes.staffcustomer,
    component: StaffManageCustomerPage,
    layout: staffLayout,
  },
  { path: config.routes.staffhome, component: StaffHome, layout: staffLayout },
  {
    path: config.routes.staffreport,
    component: StaffReport,
    layout: staffLayout,
  },
  {
    path: config.routes.stafforder,
    component: StaffOrder,
    layout: staffLayout,
  },
  {
    path: config.routes.staffshop,
    component: StaffManageShopPage,
    layout: staffLayout,
  },
  {
    path: config.routes.staffcoupon,
    component: StaffVoucher,
    layout: staffLayout,
  },
];
const managerRole = [
  {
    path: config.routes.managerchat,
    component: ManagerChat,
    layout: ManagerLayout,
  },
  {
    path: config.routes.managervehicleS,
    component: ManagerVehicleModelS,
    layout: ManagerLayout,
  },
  {
    path: config.routes.managerhome,
    component: ManagerHome,
    layout: ManagerLayout,
  },
  {
    path: config.routes.managerprofile,
    component: ManagerProfile,
    layout: ManagerLayout,
  },
  {
    path: config.routes.managecustomer,
    component: ManageCustomerPage,
    layout: ManagerLayout,
  },
  {
    path: config.routes.managestaff,
    component: ManageStaffPage,
    layout: ManagerLayout,
  },
  {
    path: config.routes.managereport,
    component: ManageReport,
    layout: ManagerLayout,
  },
  {
    path: config.routes.managecar,
    component: ManageCarPage,
    layout: ManagerLayout,
  },
  {
    path: config.routes.manageshop,
    component: ManageShopPage,
    layout: ManagerLayout,
  },
];

export { publicRoutes,  customerRole, staffRole, managerRole };
