import React, { useState, useEffect } from 'react';
import SideBarStaff from '../../../layouts/components/SideBarStaff';
import OrderDetailModal from '../../Customer/CustomerOrderHistory/component/OderdetailModal';
import { cdmApi } from '../../../misc/cdmApi';
import MenuDefault from './MenuContext';
import OtherLoading from '../../../components/OtherLoading';

const StaffOrder = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState(null);
  const [userInfor, setUserInfor] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [hasOrders, setHasOrders] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const getUserInfor = async (email) => {
    const response = await cdmApi.getUserMe(email);
    setUserInfor((prevData) => [...prevData, response.data]);
  };

  const getAllUserInfor = async () => {
    for (const order of orders) {
      await getUserInfor(order.email);
    }
    setHasFetchedData(true);
  };

  const getOrders = async () => {
    try {
      const response = await cdmApi.getAllOrders();
      setOrders(response.data);
      setHasOrders(true);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getOrders();
    if (hasOrders) {
      if (!hasFetchedData) {
        getAllUserInfor();
      }
    }
  }, [hasFetchedData, hasOrders]);

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

  const getOrdersDetail = async (orderid) => {
    setOrderId(orderid);
    setModalOpen(true);
  };

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
      {userInfor.length === orders.length ? (
        <div className="flex w-full">
          <SideBarStaff />
          <div className="w-full md:w-10/12 px-4 md:px-8">
            <h1 className="font-bold text-2xl md:text-3xl mt-8 text-black dark:text-white">
              Manage Customer's Orders
            </h1>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto mt-8 text-gray-900 dark:text-white rounded-lg overflow-hidden">
                <thead className="bg-gray-200 dark:bg-gray-800">
                  <tr className="text-sm">
                    <th className="py-4 px-6 text-center rounded-tl-lg">No.</th>
                    <th className="py-4 px-6 text-center">Name</th>
                    <th className="py-4 px-6 text-center">Order Date</th>
                    <th className="py-4 px-6 text-center">Total</th>
                    <th className="py-4 px-6 text-center">
                      Shipping Address
                    </th>
                    <th className="py-4 px-6 text-center">Payment Status</th>
                    <th className="py-4 px-6 text-center">Shipping Status</th>
                    <th className="py-4 px-6 text-center rounded-tr-lg">
                      Detail
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((order, index) => (
                    <tr
                      key={order.id}
                      className="text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="py-4 px-6 text-center">
                        {(currentPage - 1) * recordsPerPage + index + 1}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {
                          userInfor[
                            (currentPage - 1) * recordsPerPage + index
                          ]?.email
                        }
                      </td>
                      <td className="py-4 px-6 text-center">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-center">
                        ${order.totalAmount}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {order.shippingAddress}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <MenuDefault
                          option={['Pending', 'Paid']}
                          current={order.paymentStatus}
                          order={order}
                          flag={true}
                        />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <MenuDefault
                          option={['Pending', 'Approved', 'Reject']}
                          current={order.shippingStatus}
                          order={order}
                          flag={false}
                        />
                      </td>

                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => getOrdersDetail(order.id)}
                          type="button"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 mr-2 flex justify-end">
              <nav>
                <ul className="flex items-center space-x-2">
                  <li>
                    <button
                      onClick={() => changeCPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                        className={`px-3 py-1 ${
                          currentPage === n
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white'
                        } border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg`}
                      >
                        {n}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => changeCPage(currentPage + 1)}
                      disabled={currentPage === npage}
                      className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
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
      ) : (
        <div className="flex justify-center items-center h-screen">
          <OtherLoading />
        </div>
      )}
    </div>
  );
};

export default StaffOrder;