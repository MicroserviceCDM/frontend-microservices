import SideBar from "../../../layouts/components/sideBar/SideBar";
import { cdmApi } from "../../../misc/cdmApi";
import { useEffect, useState } from "react";
import OrderDetailModal from "./component/OderdetailModal";
import OtherLoading from '../../../components/OtherLoading';

function CustomerOrderHistory() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || []
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderId, setOrderId] = useState(null);

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

  useEffect(() => {
      const fetchOrderDetail = async () => {
        if (modalOpen && orderId) {
          try {
            const response = await cdmApi.getOrderDetailByOrderId(orderId);
            setOrderDetail(response.data);
            console.log('order detail', response.data.content);
          } catch (error) {
            console.log(error);
          }
        }
      };
      fetchOrderDetail();
    }, [modalOpen, orderId]);

  const getOrders = async () => {
    try {
      const response = await cdmApi.getOrderByUserId(userData.username);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrdersDetail = async (orderid) => {
    setOrderId(orderid);
    setModalOpen(true);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = orders.slice(firstIndex, lastIndex);
  const npage = Math.ceil(orders.length / recordsPerPage);
  const numbers = (() => {
    let nums = [];
    if (npage <= 1) {
      return [1];
    }
    if (currentPage > 2 && currentPage < npage - 1) {
      nums = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];
    } else if (currentPage <= 2) {
      for (let i = 0; i < npage; i++) {
        if (i < 5) {
          nums.push(i + 1);
        }
      }
    } else {
      for (let i = npage - 5; i < npage; i++) {
        if (i >= 0) {
          nums.push(i + 1);
        }
      }
    }
    return nums;
  })();

  function changeCPage(id) {
    setCurrentPage(id);
  }

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <OrderDetailModal
        data={orderDetail}
        setOpenModal={setModalOpen}
        open={modalOpen}
      />
      <SideBar />
      <div className="flex-grow px-8 py-12">
        <h1 className="font-bold text-3xl text-black dark:text-white mb-8">
          Order History
        </h1>

        {/* banner area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-red-200 dark:bg-red-500/50 rounded-lg p-6 shadow-md">
            <p className="text-gray-800 dark:text-white font-semibold text-lg md:text-xl">
              Total Spending:
            </p>
            <p className="text-red-700 dark:text-red-200 font-bold text-xl md:text-2xl mt-2">
              {totalAmount.toLocaleString()} vnd
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
              as of {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="bg-purple-200 dark:bg-purple-500/50 rounded-lg p-6 shadow-md">
            <p className="text-gray-800 dark:text-white font-semibold text-lg md:text-xl">
              Total Orders:
            </p>
            <p className="text-purple-700 dark:text-purple-200 font-bold text-xl md:text-2xl mt-2">
              {totalOrder}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
              as of {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="bg-blue-100 dark:bg-cyan-500/50 rounded-lg p-6 shadow-md">
            <p className="text-gray-800 dark:text-white font-semibold text-lg md:text-xl">
              Ranking:
            </p>
            <p className="text-blue-700 dark:text-cyan-200 font-bold text-xl md:text-2xl mt-2">
              {ranking}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
              as of {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-gray-900 dark:text-white rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <th className="py-3 px-4 text-left rounded-tl-lg">No.</th>
                <th className="py-3 px-4 text-left">Order Date</th>
                <th className="py-3 px-4 text-left">Total Amount</th>
                <th className="py-3 px-4 text-left">Payment Status</th>
                <th className="py-3 px-4 text-left">Shipping Status</th>
                <th className="py-3 px-4 text-left">Shipping Address</th>
                <th className="py-3 px-4 text-left rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
            {records.map((order, index) => (
              <tr
                key={order.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <td className="py-4 px-4">
                  {(currentPage - 1) * recordsPerPage + index + 1}
                </td>
                <td className="py-4 px-4">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="py-4 px-4">
                  {order.totalAmount.toLocaleString()} vnd
                </td>
                <td
                  className={`py-4 px-4 font-semibold ${
                    order.paymentStatus === "Paid"
                    ? "!text-green-600 dark:!text-green-400"
                    : "!text-yellow-600 dark:!text-yellow-400"
                  }`}
                >
                  {order.paymentStatus}
                </td>
                <td
                  className={`py-4 px-4 font-semibold ${
                    order.shippingStatus === "Pending"
                      ? "!text-yellow-600 !dark:text-yellow-400"
                      : order.shippingStatus === "Approved"
                      ? "!text-green-600 !dark:text-green-400"
                      : "!text-red-600 !dark:text-red-400"
                  }`}
                >
                  {order.shippingStatus}
                </td>
                <td className="py-4 px-4">{order.shippingAddress}</td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => getOrdersDetail(order.id)}
                    type="button"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
        <div className="mt-8 flex justify-end">
          <nav>
            <ul className="flex items-center space-x-2">
              <li>
                <button
                  onClick={() => changeCPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </button>
              </li>
              {numbers.map((n, i) => (
                <li key={i}>
                  <button
                    onClick={() => changeCPage(n)}
                    className={`px-3 py-1 rounded-lg ${
                      currentPage === n
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                    } border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    {n}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => changeCPage(currentPage + 1)}
                  disabled={currentPage === npage}
                  className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default CustomerOrderHistory;