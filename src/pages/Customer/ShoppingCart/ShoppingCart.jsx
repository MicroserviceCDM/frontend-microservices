import "./cartStyle.css";
import SideBar from "../../../layouts/components/sideBar/SideBar";
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
import { config } from "../../../misc/Constants";

//new
const ShoppingCart = () => {
  const navigate = useNavigate();
  let isRunning = false;
  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')) || false);

  useEffect(() => {
    const handleStorageChange = () => {
      const darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
      setIsDarkMode(darkMode);
    };

    window.addEventListener('storage', handleStorageChange);
    
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const [carts, setCarts] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [total, setTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(8000);
  const [snackbar, setSnackbar] = React.useState(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const handleCloseSnackbar = () => setSnackbar(null);
  const userData = useState(
    JSON.parse(localStorage.getItem("currentUser")) || []
  );
  const [user, setUser] = useState([]);

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
          `${config.url.API_BASE_URL}/api/payment/create_payment`,
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

  const handleRemoveItem = (itemId) => {
    const newCarts = carts.filter(item => item.id !== itemId);
    setCarts(newCarts);
    localStorage.setItem("cart", JSON.stringify(newCarts));
  };

  const handleQuantityChange = (itemId, change) => {
    const newCarts = carts.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        // Đảm bảo số lượng không nhỏ hơn 1
        if (newQuantity < 1) return item;
        return { 
          ...item, 
          quantity: newQuantity,
          totalPrice: item.price * newQuantity // Thêm tổng giá cho item
        };
      }
      return item;
    });
    setCarts(newCarts);
    localStorage.setItem("cart", JSON.stringify(newCarts));
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  if (carts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-2xl w-full text-center">
            <img 
              src={emptycart} 
              alt="Empty Cart" 
              className="w-64 h-64 mx-auto mb-8"
            />
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Hãy khám phá cửa hàng của chúng tôi và tìm những sản phẩm tuyệt vời
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    );
  }

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
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-[#1a1f2e] text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-[#242b3d]' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Giỏ hàng của bạn</h2>
                <div className="flex items-center gap-4">
                  {/* Dark Mode Toggle Button */}
                  <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full transition-colors ${
                      isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {isDarkMode ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={handleDeleteCart}
                    className="text-red-500 hover:text-red-400 font-medium"
                  >
                    Xóa tất cả
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {carts.map((cart) => (
                  <div 
                    key={cart.id} 
                    className={`flex items-center gap-4 p-4 rounded-lg relative ${
                      isDarkMode ? 'bg-[#2a324a]' : 'bg-gray-50'
                    }`}
                  >
                    <img 
                      src={cart.imgSrc} 
                      alt={cart.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{cart.name}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => handleQuantityChange(cart.id, -1)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full ${
                              isDarkMode 
                                ? 'bg-gray-700 hover:bg-gray-600' 
                                : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <span className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {cart.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(cart.id, 1)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full ${
                              isDarkMode 
                                ? 'bg-gray-700 hover:bg-gray-600' 
                                : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-blue-500 font-medium mt-2">
                          {(cart.price * cart.quantity).toLocaleString()} VND
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(cart.id)}
                        className="text-red-500 hover:text-red-400 p-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className={`rounded-xl shadow-lg p-6 sticky top-24 ${isDarkMode ? 'bg-[#242b3d]' : 'bg-white'}`}>
              <h2 className="text-xl font-bold mb-6">Tổng đơn hàng</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Tạm tính</span>
                  <span>{total.toLocaleString()} VND</span>
                </div>
                
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Phí vận chuyển</span>
                  <span>{shippingFee.toLocaleString()} VND</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Giảm giá</span>
                    <span>-{(total * (discount / 100)).toLocaleString()} VND</span>
                  </div>
                )}

                <div className={`border-t pt-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                  <div className="flex justify-between">
                    <span className="font-bold">Tổng cộng</span>
                    <span className="font-bold text-blue-500">
                      {(total + shippingFee - total * (discount / 100)).toLocaleString()} VND
                    </span>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-2">
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Phương thức thanh toán
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setPaymentMethod("Cash")}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                        paymentMethod === "Cash"
                          ? 'bg-blue-500 text-white border-blue-500'
                          : isDarkMode
                            ? 'border-gray-600 text-white hover:border-blue-500'
                            : 'border-gray-300 text-gray-700 hover:border-blue-500'
                      }`}
                    >
                      Tiền mặt
                    </button>
                    <button
                      onClick={() => setPaymentMethod("VNPay")}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                        paymentMethod === "VNPay"
                          ? 'bg-blue-500 text-white border-blue-500'
                          : isDarkMode
                            ? 'border-gray-600 text-white hover:border-blue-500'
                            : 'border-gray-300 text-gray-700 hover:border-blue-500'
                      }`}
                    >
                      VNPay
                    </button>
                  </div>
                </div>

                {/* Voucher Input */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá"
                      className={`flex-1 px-4 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-[#2a324a] border-gray-600' 
                          : 'bg-white border-gray-300'
                      }`}
                      onChange={(e) => setVoucherCode(e.target.value)}
                    />
                    <button
                      onClick={applyVoucher}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleCart}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
                >
                  Thanh toán
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
};


export default ShoppingCart;
