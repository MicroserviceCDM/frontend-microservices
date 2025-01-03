import SideBar from "../../../layouts/components/sideBar/SideBar";
import { cdmApi } from "../../../misc/cdmApi";
import { useEffect, useState } from "react";
import OderdetailModal from "./component/OderdetailModal";
// import "./OrderHis.css";

function CustomerOrderHistory() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || []
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);

  let totalAmount = 0;
  let totalOrder = 0;
  let ranking = "Bronze";

  orders.forEach((order) => {
    totalAmount += order.totalAmount;
    totalOrder += 1;
    if (totalAmount > 100000000) {
      ranking = "GOLD";
    } else {
      if (totalAmount > 50000000) {
        ranking = "Silver";
      }
    }
  });

  const getOrders = async () => {
    try {
      const response = await cdmApi.getOrderByUserId(userData.username);
      setOrders(response.data);
      //console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrdersDetail = async (orderid) => {
    try {
      const response = await cdmApi.getOrderDetailByOrderId(orderid);
      setOrderDetail(response.data.content);
      console.log(orderDetail);
      setModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {modalOpen && (
        <OderdetailModal data={orderDetail} setOpenModal={setModalOpen} />
      )}

      <div className="flex bg-white dark:bg-slate-800">
        <SideBar />
        <div className="ml-8">
          <h1 className="font-medium text-3xl mt-16 text-black dark:text-white">
            Order History
          </h1>

          {/* banner area */}
          <div className="flex mt-4 space-x-2 w-4/5" style={{ height: "20vh" }}>
            <div className="w-4/5 rounded-lg bg-red-200 dark:bg-red-500  flex-1 opacity-90">
              <p className="text-black dark:text-white font-semibold ml-4 mt-6 text-xl underline">
                Total Spending:
              </p>
              <p className="ml-6 mt-2 text-lg text-red-800 dark:text-white italic">
                {totalAmount.toLocaleString()} vnd{" "}
              </p>
              <p className="ml-4 mt-2 text-xs font-thin text-black dark:text-white">
                as figures of December 2023
              </p>
            </div>
            <div className="w-4/5 rounded-lg bg-violet-200 dark:bg-violet-500 flex-1 opacity-90">
              <p className="text-black dark:text-white  font-semibold ml-4 mt-4 text-xl underline">
                Total order:
              </p>
              <p className="ml-6 mt-2 text-lg italic text-indigo-700 dark:text-white ">
                {totalOrder}
              </p>
              <p className="ml-4 mt-2 text-xs font-thin text-black dark:text-white ">
                as figures of December 2023
              </p>
            </div>
            <div className="w-4/5 rounded-lg bg-gray-200 dark:bg-cyan-500 flex-1 opacity-90">
              <p className="text-black dark:text-white font-semibold ml-4 mt-4 text-xl underline">
                Ranking:
              </p>
              <p className="ml-6 mt-2 text-lg italic text-gray-700 dark:text-white">
                {ranking}
              </p>
              <p className="ml-4 mt-2 text-xs font-thin text-black dark:text-white">
                as figures of December 2023
              </p>
            </div>
          </div>

          {/* Table display orders */}

          {/* <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Color
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="odd:bg-white even:bg-gray-300">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td class="px-6 py-4">Silver</td>
                  <td class="px-6 py-4">Laptop</td>
                  <td class="px-6 py-4">$2999</td>
                  <td class="px-6 py-4">
                    <a
                      href="#"
                      class="font-medium text-red-400 hover:underline"
                    >
                      Pending
                    </a>
                  </td>
                </tr>
                <tr class="odd:bg-white even:bg-gray-300">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Microsoft Surface Pro
                  </th>
                  <td class="px-6 py-4">White</td>
                  <td class="px-6 py-4">Laptop PC</td>
                  <td class="px-6 py-4">$1999</td>
                  <td class="px-6 py-4">
                    <a
                      href="#"
                      class="font-medium text-violet-500 hover:underline"
                    >
                      Processing
                    </a>
                  </td>
                </tr>
                <tr class="odd:bg-white even:bg-gray-300">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Magic Mouse 2
                  </th>
                  <td class="px-6 py-4">Black</td>
                  <td class="px-6 py-4">Accessories</td>
                  <td class="px-6 py-4">$99</td>
                  <td class="px-6 py-4">
                    <a
                      href="#"
                      class="font-medium text-lime-500 hover:underline"
                    >
                      Complete
                    </a>
                  </td>
                </tr>
                <tr class="odd:bg-white even:bg-gray-300">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Google Pixel Phone
                  </th>
                  <td class="px-6 py-4">Gray</td>
                  <td class="px-6 py-4">Phone</td>
                  <td class="px-6 py-4">$799</td>
                  <td class="px-6 py-4">
                    <a
                      href="#"
                      class="font-medium text-lime-500 hover:underline"
                    >
                      Complete
                    </a>
                  </td>
                </tr>
                <tr class="odd:bg-white even:bg-gray-300">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Apple Watch 5
                  </th>
                  <td class="px-6 py-4">Red</td>
                  <td class="px-6 py-4">Wearables</td>
                  <td class="px-6 py-4">$999</td>
                  <td class="px-6 py-4">
                    <a
                      href="#"
                      class="font-medium text-lime-500 hover:underline"
                    >
                      Complete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}

          <div className="mt-8 mr-16">
            <table className="text-black dark:text-white">
              <thead>
                <tr>
                  <th className="dark:bg-gray-600">No.</th>
                  <th className="dark:bg-gray-600">Order Date</th>
                  <th className="dark:bg-gray-600">Total Amount</th>
                  <th className="dark:bg-gray-600">Payment Status</th>
                  <th className="dark:bg-gray-600">Shipping Status</th>
                  <th className="dark:bg-gray-600">Shipping Address</th>
                  {/* <th>Voucher Value</th>
                  <th>Shipping Value</th> */}
                  <th className="dark:bg-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>{order.totalAmount.toLocaleString()} vnd</td>
                    <td
                      className={` font-bold ${
                        order.paymentStatus === "Paid"
                          ? "text-green-800"
                          : "text-yellow-700 "
                      }`}
                    >
                      {order.paymentStatus}
                    </td>
                    <td
                      className={` font-bold ${
                        order.shippingStatus === "Pending"
                          ? "text-yellow-700"
                          : order.shippingStatus === "Approved"
                          ? "text-green-800"
                          : "text-red-700"
                      }`}
                    >
                      {order.shippingStatus}
                    </td>
                    <td>{order.shippingAddress}</td>
                    {/* <td>${order.voucherValue}</td>
                    <td>${order.shippingValue}</td> */}
                    <td>
                      <button
                        onClick={() => getOrdersDetail(order.id)}
                        type="button"
                        class="focus:outline-none text-white bg-green-700  hover:bg-green-800 dark:bg-blue-500  dark:hover:bg-blue-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2   dark:focus:ring-blue-800"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerOrderHistory;
