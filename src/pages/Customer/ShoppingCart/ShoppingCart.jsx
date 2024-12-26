import "./cartStyle.css";
import SideBar from "../../../layouts/components/SideBar";
import CartList from "./components/CartList";
import FooterCart from "./components/FooterCart";
import CartData from "./cart";
import React, { useState, useEffect } from "react";
import CartItem from "./components/CartItem";
import { cdmApi } from "../../../misc/cdmApi";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emptycart from "../../../assets/images/cartEmpty.gif";

//new
const ShoppingCart = () => {
  const navigate = useNavigate();
  let isRunning = false;
  const [carts, setCarts] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [total, setTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(8000);

  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
  const [paymentMethod, setPaymentMethod] = useState(
    localStorage.getItem("payment_method")
  ); // ["Cash", "VNPay"]
  const userData = useState(
    JSON.parse(localStorage.getItem("currentUser")) || []
  );
  const [user, setUser] = useState([]);
  const [voucherCode, setVoucherCode] = useState("");
  const fetchInfo = async () => {
    try {
      const res = await cdmApi.getUserMe(userData.username);
      setUser(res.data);
      console.log("userData:");
      console.log(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteCart = () => {
    localStorage.setItem("cart", "[]");
    setCarts([]);
  };

  useEffect(() => {
    // fetchInfo();
    // This function will run every time the component renders
    // const cart = localStorage.getItem("cart");
    // setCarts(JSON.parse(cart));
    handlePaymentReturn();
  }, []);

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    setTotal(total);
  }, [carts]);

  const handleCart = async () => {
    const orderData = {
      totalAmount: total + shippingFee - total * (discount / 100),
      email: userData[0].username,
      shippingAddress: userData[0].address,
      voucherValue: 10,
      shippingValue: shippingFee,
      createOrderItemRequestList: carts.map((cart) => ({
        productId: cart.id,
        quantity: cart.quantity,
        pricePerUnit: cart.price,
        size: "sm", // default value
        color: "red", // default value
        voucher: 10,
        shipping: 10,
      })),
    };

    if (paymentMethod === "Cash") {
      try {
        const order = await cdmApi.createOrder(orderData);
        console.log("order by cash" + order);
        setSnackbar({ children: "Order successfully!", severity: "success" });
        localStorage.setItem("cart", "[]");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.get(
          "http://localhost:9296/api/payment/create_payment",
          {
            params: {
              amount: total,
            },
          }
        );
        const payment = response.data;
        window.location.href = payment.url;
      } catch (error) {
        console.error(error);
        return;
      }
    }
  };

  const handlePaymentReturn = async () => {
    if (isRunning) return;
    isRunning = true;
    const urlParams = new URLSearchParams(window.location.search);
    const responseCode = urlParams.get("vnp_ResponseCode");
    if (responseCode === "00") {
      const orderData = {
        totalAmount: total + shippingFee,
        email: userData[0].username,
        shippingAddress: userData[0].address,
        voucherValue: 10,
        shippingValue: shippingFee,
        createOrderItemRequestList: carts.map((cart) => ({
          productId: cart.id,
          quantity: cart.quantity,
          pricePerUnit: cart.price,
          size: "sm", // default value
          color: "red", // default value
          voucher: 10,
          shipping: 10,
        })),
      };
      console.log("Payment success");
      console.log("order by vnpay", orderData);
      try {
        const order = await cdmApi.createOrder(orderData);
        console.log("order after created");
        console.log(order);
        setSnackbar({ children: "Order successfully!", severity: "success" });
        localStorage.setItem("cart", "[]");
        setCarts([]);
      } catch (error) {
        console.error(error);
        setSnackbar({ children: "Order failed!", severity: "error" });
      }
    }
    isRunning = false;
    // else
    // {
    //   setSnackbar({ children: "Order failed!", severity: "error" });
    // }
  };


  if (carts.length === 0) {
    return (
      <div className=" h-[92vh] flex justify-center items-center text-4xl flex flex-col dark:bg-slate-800">
        <div>
          <h3 className="text-white">Cart is Empty</h3>
        </div>

        <div>
          <img className=" h-[25vh]" src={emptycart} alt="emptycart" />
        </div>
        <div className="text-xl dark:text-white">
          Your cart lives to serve. Give it purpose — fill it with whell, key
          chain, or other products that you love. Continue shopping on the{" "}
          <a
            onClick={() => navigate("/shop")}
            className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
          >
            shop
          </a>
        </div>
        <div className="mt-6">
          <button
            onClick={() => navigate("/shop")}
            className="dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-300 mt-10 md:mt-0 bg-black text-white py-5 hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }
  const [discount, setDiscount] = useState(0);

  const applyVoucher = async () => {
    if (voucherCode === "") {
      setSnackbar({ children: "Voucher cannot be null!", severity: "error" });
    } else {
      try {
        cdmApi
          .checkVoucher(voucherCode)
          .then((response) => {
            setDiscount(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="py-8 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto dark:bg-slate-800">
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start  bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full dark:bg-gray-500">
            <p className="flex text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-black dark:text-white">
              Customer’s Cart
            </p>
            <div className="flex justify-between items-center w-full mt-10">
              <button
                className="dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-300 text-base font-semibold leading-4 text-black bg-gray-300 p-3 dark:text-white"
                onClick={() => handleDeleteCart()}
              >
                Delete cart
              </button>
            </div>
            {/* {carts} */}
            {/* <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
            <div className="pb-4 md:pb-8 w-full md:w-40">
              <img className="w-full hidden md:block" src="https://i.ibb.co/84qQR4p/Rectangle-10.png" alt="dress" />
              <img className="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
            </div>
            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
              <div className="w-full flex flex-col justify-start items-start space-y-8">
                <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-black">Premium Quaility Dress</h3>
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p className="text-sm leading-none text-gray-800"><span className="text-black underline">Style:</span> Italic Minimal Design</p>
                  <p className="text-sm leading-none text-gray-800"><span className="text-black underline">Size:</span> Small</p>
                  <p className="text-sm leading-none text-gray-800"><span className="text-black underline">Color:</span> Light Blue</p>
                </div>
              </div>
              <div className="flex justify-between space-x-8 items-start w-full">
                <p className="text-base xl:text-lg leading-6">$36.00 <span className="text-red-300 line-through"> $45.00</span></p>
                <p className="text-base xl:text-lg leading-6 text-black">01</p>
                <p className="text-base xl:text-lg font-semibold leading-6 text-black">$36.00</p>
              </div>
            </div>
          </div> */}
            {carts.map((cart) => {
              return (
                <CartItem
                  key={cart.id}
                  id={cart.id}
                  image={cart.imgSrc}
                  title={cart.name}
                  price={cart.price}
                  quantity={cart.quantity}
                  total={cart.price * cart.quantity}
                />
              );
            })}
            {/* <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
            <div className="w-full md:w-40">
              <img className="w-full hidden md:block" src="https://i.ibb.co/s6snNx0/Rectangle-17.png" alt="dress" />
              <img className="w-full md:hidden" src="https://i.ibb.co/BwYWJbJ/Rectangle-10.png" alt="dress" />
            </div>
            <div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
              <div className="w-full flex flex-col justify-start items-start space-y-8">
                <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-black">High Quaility Italic Dress</h3>
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p className="text-sm leading-none text-gray-800"><span className="text-black underline">Style: </span> Italic Minimal Design</p>
                  <p className="text-sm leading-none text-gray-800"><span className="text-black underline">Size: </span> Small</p>
                  <p className="text-sm leading-none text-gray-800"><span className="text-black underline">Color: </span> Light Blue</p>
                </div>
              </div>
              <div className="flex justify-between space-x-8 items-start w-full">
                <p className="text-base xl:text-lg leading-6">$20.00 <span className="text-red-300 line-through"> $30.00</span></p>
                <p className="text-base xl:text-lg leading-6 text-black0">01</p>
                <p className="text-base xl:text-lg font-semibold leading-6 text-black">$20.00</p>
              </div>
            </div>
          </div> */}
          </div>
          <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className=" dark:bg-gray-500 flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
              <h3 className="text-xl font-semibold leading-5 text-black dark:text-white ">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                  <p className="text-base  leading-4 text-black dark:text-white">
                    Subtotal
                  </p>
                  <p className="text-base  leading-4 text-black dark:text-white">
                    {total.toLocaleString()} vnd
                  </p>
                </div>
                {/* <div className="flex justify-between items-center w-full">
                <p className="text-base  leading-4 text-black">Discount <span className="bg-gray-200 p-1 text-xs font-medium leading-3 text-gray-800">STUDENT</span></p>
                <p className="text-base  leading-4 text-black">-$28.00 (50%)</p>
              </div> */}
                <div className="flex justify-between items-center w-full">
                  <p className="text-base  leading-4 text-black dark:text-white">
                    Shipping
                  </p>
                  <p className="text-base  leading-4 text-black dark:text-white">
                    {shippingFee.toLocaleString()} vnd
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-black dark:text-white">
                    Enter voucher code
                  </p>
                  <div className="ml-auto">
                    <button
                      onClick={() => applyVoucher()}
                      className="float-right py-2 ml-2 rounded-xl text-white bg-black dark:bg-blue-500 dark:hover:bg-blue-700 "
                    >
                      OK
                    </button>

                    <input
                      onChange={(e) => setVoucherCode(e.target.value)}
                      type="text"
                      className="float-right py-2 bg-white rounded-xl w-[50%] border-solid border-1 border-black dark:boder-none dark:border-0"
                    />
                  </div>
                </div>
              </div>
              <div
                className={`flex justify-between items-center w-full ${
                  discount === 0 ? "hidden" : "block"
                }`}
              >
                <p className="text-base  leading-4 text-black dark:text-white">
                  Discount
                </p>
                <p className="text-base  leading-4 text-black dark:text-white">
                  -{total * (discount / 100)} vnd
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-black dark:text-white">
                  Total
                </p>
                <p className="text-base  font-semibold leading-4 text-black dark:text-white">
                  {total +
                    shippingFee -
                    total * (discount / 100)}{" "}
                  vnd
                </p>
              </div>
            </div>

              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6 dark:bg-gray-500">
                <h3 className="text-xl font-semibold leading-5 text-black dark:text-white ">
                  Payment Method
                </h3>
                {paymentMethod === "Cash" ? (
                  <div className="flex justify-between items-center w-full">
                    <div className="flex justify-center items-center">
                      <div className="w-32 h-16">
                        <img
                          className="w-full h-full"
                          alt="logo"
                          src="https://res.cloudinary.com/droondbdu/image/upload/v1699951017/cash-payment-button-web-template-speech-bubble-banner-label-cash-payment-sign-icon-illustration-vector_wzovut.jpg"
                        />
                      </div>
                      <div className="flex flex-col justify-start items-center">
                        <p className="text-lg leading-6  font-semibold text-black dark:text-white">
                          Cash on Delivery
                          <br />
                          <span className="font-normal dark:text-white">
                            Delivery with 24 Hours
                          </span>
                        </p>
                      </div>
                    </div>
                    {/* <p className="text-lg font-semibold leading-6 text-black">
                      ${shippingFee}
                    </p> */}
                  </div>
                ) : (
                  <div className="flex justify-between items-center w-full">
                    <div className="flex justify-center items-center">
                      <div className="w-32 h-16">
                        <img
                          className="w-full h-full"
                          alt="logo"
                          src="https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/9d/11/23/9d1123ee-079c-762d-bdda-ef59f3f6abd9/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png"
                        />
                      </div>
                      <div className="flex flex-col justify-start items-center">
                        <p className="text-lg leading-6  font-semibold text-black dark:text-white ml-4">
                          VNPay
                          <br />
                          <span className="font-normal dark:text-white ">
                            Delivery with 24 Hours
                          </span>
                        </p>
                      </div>
                    </div>
                    {/* <p className="text-lg font-semibold leading-6 text-black">
                      ${shippingFee}
                    </p> */}
                  </div>
                )}
                {/* <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <img
                        className="w-full h-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6  font-semibold text-black">
                        VNPay
                        <br />
                        <span className="font-normal">
                          Delivery with 24 Hours
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 text-black">
                    ${shippingFee}
                  </p>
                </div> */}
                <div className="w-full flex justify-center items-center">
                  <button
                    onClick={() => navigate("/customerhome/payment")}
                    className="dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-300 dark:hover:text-white mt-6 md:mt-0 bg-black text-white py-5 hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800"
                  >
                    Change Payment Method
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-500 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl  font-semibold leading-5 text-black dark:text-white">
              Customer
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img
                    src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                    alt="avatar"
                  />
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-base font-semibold leading-4 text-left text-black dark:text-white">
                      {userData[0].email}
                    </p>
                    <p className="text-sm leading-5 text-black dark:text-white">
                      10 Previous Orders
                    </p>
                  </div>
                </div>
                <div className="flex justify-center text-black md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <img
                    className="dark:text-white"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
                    alt="email"
                  />
                  <p className="cursor-pointer text-sm leading-5 dark:text-white">
                    {userData[0].username}
                  </p>
                </div>
              </div>
              <div className=" flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className=" flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-black dark:text-white">
                      Shipping Address
                    </p>
                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-black dark:text-white">
                      {userData[0].address}
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-black dark:text-white">
                      Billing Address
                    </p>
                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-black0 dark:text-white">
                      {userData[0].address}
                    </p>
                  </div>
                </div>
                <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                  <button
                    onClick={handleCart}
                    className="dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-300 dark:hover:text-white mt-6 md:mt-0 py-5 bg-black text-white hover:text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 w-96 2xl:w-full text-base font-black leading-4 "
                  >
                    Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {snackbar && (
          <Snackbar
            open
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </div>
    );
  }


export default ShoppingCart;
