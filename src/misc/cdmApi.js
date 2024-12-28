import axios from "axios";
import { config } from "./Constants";
// import { parseJwt } from './Helpers'

export const cdmApi = {
  authenticate,
  signup,
  updateUser,
  getUserMe,
  getAllUsers,
  createCustomer,
  resetPassword,
  changePassword,
  deleteUser,
  getAllCars,
  getAllCarsByModel,
  getCarByNameContaining,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  createOrder,
  getAllInventory,
  getAllShop,
  getShopByType,
  getShopById,
  getOrderByUserId,
  getOrderDetailByOrderId,
  createCustomerReport,
  getCustomerReport,
  getPublicChat,
  createAppointment,
  getAllOrders,
  updateShop,
  createShop,
  addProductToInventory,
  updateOrder,
  getAllVoucher,
  createVoucher,
  checkVoucher,
  deleteVoucher,
}

function authenticate(user) {
  return instance.post("/auth/login", user);
}

function signup(user) {
  return instance.post("/auth/register", user, {
    headers: { "Content-type": "application/json" },
  });
}

function deleteVoucher(voucher) {
  return instance.delete(
    "http://localhost:9296/api/vouchers/delete",
    { data: voucher }, // Include the voucher in the request body
    {
      headers: {
        Authorization: bearerAuth(localStorage.getItem("accessToken")),
        "Content-Type": "application/json",
      },
    }
  );
}


function updateUser(user) {
  return instance.post("/auth/updateUser", user, {
    headers: {
      Authorization: bearerAuth(localStorage.getItem("accessToken")),
    },
  });
}

function resetPassword(mail) {
  return instance.post("/auth/reset-password", null , { 
    params: {
      email: mail,
    }
   });
}

function changePassword(user) {
  return instance.patch("/auth/changePassword", user, {
    headers: {
      Authorization: bearerAuth(localStorage.getItem("accessToken")),
    },
  });
}

function getUserMe(username) {
  const accessToken = localStorage.getItem("accessToken");
  return instance.get("/auth/me", {
    params: {
      name: username,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

function getAllUsers(amount = 10) {
  return instance.get("/auth/getAllUsers", {
    params: {
      size: amount,
    },
    headers: {
      Authorization: bearerAuth(localStorage.getItem("accessToken")),
    },
  });
}

function createCustomer(data) {
  return instance.post("/auth/register", data, {
    headers: { "Content-type": "application/json" },
  });
}

function deleteUser(id) {
  return instance.delete(`/auth/deleteUser/${id}`,{
    headers: {
      Authorization: bearerAuth(localStorage.getItem("accessToken")),
    },
  });
}
function checkVoucher(code) {
  return instance.post(`http://localhost:9296/api/vouchers/check_voucher?voucherCode=${code}`, {
    // params: {
    //   voucherCode: code,
    // },
    headers: {
      Authorization: bearerAuth(localStorage.getItem("accessToken")),
    },
  });
}

// function getAllUsers(size = 10000) {
//   return instance.get('/auth/getAllUsers', {
//     params: {
//       size : size,
//     },
//     headers: {
//       'Authorization': bearerAuth(localStorage.getItem('accessToken'))
//     }
//   });
// }


function getAllCars(page, size, sortBy, direction) {

  return instance.get("/api/v1/products/getAllCars", {
    params: {
      page,
      size,
      sortBy,
      direction,
    }
  });
}

function getAllCarsByModel(model) {
  return instance.get(`/api/v1/products/getCarByModel/${model}`);
}

function getCarByNameContaining(name) {

  return instance.get("/api/v1/products/getCarsByNameContains", {
    params: {
      name: name
    }
  });
}

function getCarById(params) {
  return instance.get(
    "/api/v1/products/getCarById/" + params
  );
}

function getOrderByUserId(params) {
  return instance.get("/api/v1/orders/getOrderByUserId", {
    params: {
      email: params,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}

function getAllOrders() {
  return instance.get("/api/v1/orders/getOrders", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}

function getOrderDetailByOrderId(orderID) {
  return instance.get("/api/v1/orders/getOrderItemsByOrderId", {
    params: {
      orderId: orderID,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}

function createCar(carData) {
  return instance.post(
    "/api/v1/products/createCar",
    carData,
    {
      headers: {
        Authorization: bearerAuth(localStorage.getItem("accessToken")),
        "Content-Type": "application/json",
      },
    }
  );
}

function createAppointment(content) {
  return instance.post(
    "/api/v1/notifications/createCarAppointment",
    content,
    {
      headers: {
        Authorization: bearerAuth(localStorage.getItem("accessToken")),
        "Content-Type": "application/json",
      },
    }
  );
}

function createOrder(orderData) {
  return instance.post(
    "/api/v1/orders/createOrder",
    orderData,
    {
      headers: {
        Authorization: bearerAuth(localStorage.getItem("accessToken"))
      },
    }
  );
}

function createVoucher(voucherData) {
  return instance.post(
    "/api/vouchers/create",
    voucherData,
    {
      headers: {
        Authorization: bearerAuth(localStorage.getItem("accessToken")),
        "Content-Type": "application/json",

      },
    }
  );
}

function updateCar(carData) {
  return instance.put(
    "/api/v1/products/updateCar",
    carData,
    {
      headers: {
        Authorization: bearerAuth(localStorage.getItem("accessToken")),
        "Content-Type": "application/json",
      },
    }
  );
}


function updateOrder(order) {
  return instance.put(
    "/api/v1/orders/updateOrder",
    order,
    {
      headers: {
        Authorization: bearerAuth(localStorage.getItem("accessToken")),
        "Content-Type": "application/json",
      },
    }
  );
}

function deleteCar(id) {
  return instance.delete(
    `/api/v1/products/deleteCar/${id}`,
    {
      headers: {
        Authorization: bearerAuth(localStorage.getItem("accessToken")),
      },
    }
  );
}

function getAllInventory(amount = 10) {
  return instance.get("/api/v1/inventory/getInventory", {
    params: {
      size: amount,
    },
    headers: {
      Authorization: bearerAuth(localStorage.getItem("accessToken")),
    },
  });
}

function addProductToInventory(productData) {
  return instance.post(
    "/api/v1/inventory/addInventory",
    productData,
    {
      headers: {
        Authorization: bearerAuth(localStorage.getItem("accessToken")),
        "Content-Type": "application/json",
      },
    }
  );
}

function createShop(shopData) {
  return instance.post(
    "/api/v1/products/createShop",
    shopData,
    {
      headers: {
        Authorization: bearerAuth(localStorage.getItem("accessToken")),
        "Content-Type": "application/json",
      },
    }
  );
}

function updateShop(shopData) {
  return instance.put(
    "/api/v1/products/updateShop",
    shopData,
    {
      headers: {
        Authorization: bearerAuth(localStorage.getItem("accessToken")),
        "Content-Type": "application/json",
      },
    }
  );
}

function getAllShop() {
  return instance.get(`/api/v1/products/getAllShops`, {
    headers: {
      Authorization: bearerAuth(localStorage.getItem("accessToken")),
    },
  });
}

function getShopByType(type) {
  return instance.get(`/api/v1/products/getShopByType/${type}`, {
    headers: {
      Authorization: bearerAuth(localStorage.getItem("accessToken")),
    },
  });
}

function createCustomerReport(report) {
  return instance.post("/api/v1/reports", report, {
    headers: { 
      Authorization: bearerAuth(localStorage.getItem("accessToken")),
    },
  });
}

function getCustomerReport() {
  return instance.get("/api/v1/reports", {
    params: {
      size: 200
    },
    headers: { 
      Authorization: bearerAuth(localStorage.getItem("accessToken")),
    },
  });
}

function getAllVoucher() {
  return instance.get("/api/vouchers/getAll", {
    headers: { 
      Authorization: bearerAuth(localStorage.getItem("accessToken")),
    },
  });
}

function getShopById(id) {
  return instance.get('http://localhost:9296/api/v1/products/getShopById/' + id);
}

function getPublicChat() {
  return axios.get("localhost:8080/api/chat/public-messages");
}


// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
});

// instance.interceptors.request.use(function (config) {
//   // If token is expired, redirect user to login
//   if (config.headers.Authorization) {
//     const token = config.headers.Authorization.split(' ')[1]
//     const data = parseJwt(token)
//     if (Date.now() > data.exp * 1000) {
//       window.location.href = "/login"
//     }
//   }
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })

// -- Helper functions

function bearerAuth(user) {
  return `Bearer ${user}`;
}
