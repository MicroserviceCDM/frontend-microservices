import SideBar from "../../../layouts/components/sideBar/SideBar";
import DashboardItem from "../../../components/DashboardItem";
import { useState } from "react";

function CustomerPayment() {
  const [paymentMethod, setPaymentMethod] = useState(
    localStorage.getItem("payment_method") || "Cash"
  );

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    localStorage.setItem("payment_method", method);
  };

  const paymentItem = [
    {
      img: (
        <img
          src="https://damme.io/wp-content/uploads/2018/08/lam-the-visa-mastercard-0.png"
          alt="Credit Cards"
          className="w-full h-32 object-cover rounded-t-lg"
        />
      ),
      article: "Credit Cards",
      content: "Pay with your credit or debit card",
      button: (
        <button
          className={`text-black dark:text-white bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 py-1 px-3 border-b-2 border-transparent hover:border-black dark:hover:border-white text-left text-sm ${
            paymentMethod === "Credit Cards"
              ? "border-black dark:border-white"
              : ""
          }`}
          onClick={() => handlePaymentMethodChange("Credit Cards")}
        >
          {paymentMethod === "Credit Cards" ? "Selected" : "Select"}
        </button>
      ),
    },
    {
      img: (
        <img
          src="https://res.cloudinary.com/droondbdu/image/upload/v1699951017/cash-payment-button-web-template-speech-bubble-banner-label-cash-payment-sign-icon-illustration-vector_wzovut.jpg"
          alt="Cash"
          className="w-full h-32 object-cover rounded-t-lg"
        />
      ),
      article: "Cash",
      content: "Pay with cash upon delivery",
      button: (
        <button
          className={`text-black dark:text-white bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 py-1 px-3 border-b-2 border-transparent hover:border-black dark:hover:border-white text-left text-sm ${
            paymentMethod === "Cash" ? "border-black dark:border-white" : ""
          }`}
          onClick={() => handlePaymentMethodChange("Cash")}
        >
          {paymentMethod === "Cash" ? "Selected" : "Select"}
        </button>
      ),
    },
    {
      img: (
        <img
          src="https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/9d/11/23/9d1123ee-079c-762d-bdda-ef59f3f6abd9/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png"
          alt="VNPay"
          className="w-full h-32 object-cover rounded-t-lg"
        />
      ),
      article: "VNPay",
      content: "Pay with VNPay",
      button: (
        <button
          className={`text-black dark:text-white bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 py-1 px-3 border-b-2 border-transparent hover:border-black dark:hover:border-white text-left text-sm ${
            paymentMethod === "VNPay" ? "border-black dark:border-white" : ""
          }`}
          onClick={() => handlePaymentMethodChange("VNPay")}
        >
          {paymentMethod === "VNPay" ? "Selected" : "Select"}
        </button>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-800">
      <SideBar />
      <div className="flex-1 p-8">
        <h1 className="font-medium text-3xl mb-4 text-black dark:text-white">
          Payment Method
        </h1>
        <div className="hidden xl:flex space-x-4">
          {paymentItem.map((item, index) => (
            <DashboardItem
              key={index}
              data={item}
              payment_method={paymentMethod}
            />
          ))}
        </div>
        <div className="block xl:hidden space-y-4">
          {paymentItem.map((item, index) => (
            <DashboardItem
              key={index}
              data={item}
              payment_method={paymentMethod}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerPayment;