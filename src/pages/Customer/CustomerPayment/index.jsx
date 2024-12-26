import SideBar from "../../../layouts/components/sideBar/SideBar";
import "../../../components/CarCard/CarCard.css";
import DashboardItem from "../../../components/DashboardItem";
import { useState, useEffect } from "react";
import Modal from "../../../components/Modal";

function CustomerPayment() {
  // const [modalOpen, setModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(localStorage.getItem("payment_method") || "Cash");
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    localStorage.setItem("payment_method", method);
  };

  const paymentItem = [
    {
      img: (
        <img
          src="https://damme.io/wp-content/uploads/2018/08/lam-the-visa-mastercard-0.png"
          alt="solar"
          className="dashboard__item-img"
        />
      ),
      article: "Credit Cards",
      content: "Produce energy to power your Tesla life",
      button: (
        <button
          className="dashboard__item-button text-black dark:text-white"
          onClick={() => {
            localStorage.setItem("payment_method", "Credit Cards");
          }}
        >
          Add Card
        </button>
      ),
    },
    {
      img: (
        <img
          src="https://res.cloudinary.com/droondbdu/image/upload/v1699951017/cash-payment-button-web-template-speech-bubble-banner-label-cash-payment-sign-icon-illustration-vector_wzovut.jpg"
          alt="solar"
          className="dashboard__item-img"
        />
      ),
      article: "Cash",
      content: "Produce energy to power your Tesla life",
      button: (
        <button
          className="dashboard__item-button text-black dark:text-white"
          onClick={() => handlePaymentMethodChange("Cash")}
        >
          Select
        </button>
      ),
    },
    {
      img: (
        <img
          src="https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/9d/11/23/9d1123ee-079c-762d-bdda-ef59f3f6abd9/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png"
          alt="solar"
          className="dashboard__item-img"
        />
      ),
      article: "VNPay",
      content: "Produce energy to power your Tesla life",
      button: (
        <button
          className="dashboard__item-button text-black dark:text-white"
          onClick={() => handlePaymentMethodChange("VNPay")}
        >
          Select
        </button>
      ),
    },
  ];
  return (
    <>
      <div className="flex bg-white dark:bg-slate-800">
        {/* {modalOpen && <Modal setOpenModal={setModalOpen} />} */}

        <SideBar />
        <div className="ml-4 hidden xl:block">
          <h1 className="font-medium text-3xl mt-16 ml-4 text-black dark:text-white">Payment Method</h1>
          <div className="flex mt-4">
            <DashboardItem
              data={paymentItem[1]}
              payment_method={paymentMethod}
            />
            <DashboardItem
              data={paymentItem[2]}
              payment_method={paymentMethod}
            />
          </div>
        </div>

        <div className="mt-8 mx-auto block xl:hidden">
          <DashboardItem data={paymentItem[1]} />
          <DashboardItem data={paymentItem[2]} />
        </div>
      </div>
    </>
  );
}

export default CustomerPayment;
