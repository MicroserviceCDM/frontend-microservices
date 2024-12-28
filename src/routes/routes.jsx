import config from "../config";
import ManagerHome from "../pages/Manager/ManagerHome";
import ManagerProfile from "../pages/Manager/ManagerProfile";
import ManagerVehicleModelS from "../pages/Manager/ManagerVehicle/VehicleModelS";
import ManageCustomerPage from "../pages/Manager/ManageCustomer/ManageCustomer";
import ManageStaffPage from "../pages/Manager/ManageStaff/ManageStaff";
import ManageReport from "../pages/Manager/ManagerReport";
import ManageCarPage from "../pages/Manager/ManageCar/ManageCar";
import ManageShopPage from "../pages/Manager/ManageShop/ManageShop";
import CustomerHome from "../pages/Customer/CustomerHome";
import CustomerOrderHistory from "../pages/Customer/CustomerOrderHistory";
import CustomerPayment from "../pages/Customer/CustomerPayment";
import CustomerProfile from "../pages/Customer/CustomerProflie";
import CustomerReport from "../pages/Customer/CustomerReport";
import ShoppingCart from "../pages/Customer/ShoppingCart/ShoppingCart";
import Shop from "../pages/NavBar/Shop";
import Vehicle from "../pages/NavBar/Vehicle";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import loginregisLayout from "../layouts/loginregisLayout";
import DefaultLayout from "../layouts/defaultLayout";
import LandingPage from "../pages/LandingPage/LandingPage";
import landingLayout from "../layouts/landingLayout";
import StaffHome from "../pages/Staff/StaffHome";
import StaffReport from "../pages/Staff/StaffReport";
import StaffOrder from "../pages/Staff/StaffOrder/StaffOrder";
import StaffManageCustomerPage from "../pages/Staff/StaffCustomer/StaffManageCustomer";
import StaffManageCarPage from "../pages/Staff/StaffCar/StaffManageCar";
import StaffManageShopPage from "../pages/Staff/StaffShop/StaffManageShop";
import StaffProfile from "../pages/Staff/StaffProfile/StaffProfile";
import staffLayout from "../layouts/staffLayout";
import VehicleDetail from "../pages/NavBar/VehicleDetail";
import ManagerLayout from "../layouts/managerLayout/";
import ShopAccessories from "../pages/NavBar/ShopAccessories";
import ShopMerchandise from "../pages/NavBar/ShopMerchandise";
import ProductShopOverview from "../pages/NavBar/ProductShopOverview";
import BookAppointment from "../pages/Customer/BookAppointment";
import { ManagerChat } from "../pages/Manager/ManagerChat/ManagerChat";
import Chat from "../pages/Manager/Chat";
import Coupon from "../pages/NavBar/Coupon";
import StaffVoucher from "../pages/Staff/StaffVoucher";
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

export { publicRoutes, privateRoutes, customerRole, staffRole, managerRole };
