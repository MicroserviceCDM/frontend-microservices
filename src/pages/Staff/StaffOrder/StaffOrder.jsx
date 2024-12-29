import React , { useState } from 'react';
import SideBarStaff from '../../../layouts/components/SideBarStaff';
import './StaffOrder.css';
import OrderDetailModal from '../../Customer/CustomerOrderHistory/component/OderdetailModal'
import { cdmApi } from '../../../misc/cdmApi';
import { useEffect } from 'react';
import MenuDefault from './MenuContext';
import OtherLoading from "../../../components/OtherLoading"


const StaffOrder = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);
    const [userInfor, setUserInfor] = useState([]);
    const [hasFetchedData, setHasFetchedData] = useState(false);
    const [hasOrders, setHasOrders] = useState(false);
    const [payStatus, setPayStatus] = useState("");
    const [shipStatus, setShipStatus] = useState("");
  
    const getUserInfor = async (email) => {
      console.log(email);
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
        //console.log("order:" , response.data);
        setHasOrders(true);
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
      if(hasOrders){
        if (!hasFetchedData) {
          getAllUserInfor();
        }
      }
    }, [hasFetchedData, hasOrders]);

    useEffect(() => {
        console.log(payStatus);
    }, [userInfor]);


    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = orders.slice(firstIndex, lastIndex);
    const npage = Math.ceil(orders.length / recordsPerPage);
    const numbers = (() => {
      if (currentPage > 1 && currentPage < npage) {
        return [currentPage - 1, currentPage, currentPage + 1];
      } else if (currentPage <= 1) {
        return [1, 2, 3];
      } else {
        return [npage - 2, npage - 1, npage];
      }
    })();
  
    return(
        <div className="flex bg-white dark:bg-slate-800 h-screen">
        {modalOpen && <OrderDetailModal data={orderDetail} setOpenModal={setModalOpen} />}
        {userInfor.length === orders.length ? (
        <span className='flex'>
            <SideBarStaff className='flex-1'/>
            <div className="mt-8 mr-16">
            <h1 className='font-medium text-3xl mt-8 ml-12  text-black dark:text-white'>Manage Customer's Orders</h1>
            <table className='ml-12 mt-8 w-full table-auto text-black dark:text-white'>
                  <thead> 
                    <tr className='text-sm'>
                      <th className='py-4 dark:bg-gray-600'>No.</th>
                      <th className='py-2 dark:bg-gray-600'>Name</th>
                      <th className='py-2 dark:bg-gray-600'>Order Date</th>
                      <th className='py-2 dark:bg-gray-600'>Total</th>
                      <th className='py-2 dark:bg-gray-600'>Shipping Address</th>
                      <th className='py-2 dark:bg-gray-600'>Payment Status</th>
                      <th className='py-2 dark:bg-gray-600'>Shipping Status</th>
                      <th className='py-2 dark:bg-gray-600'>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((order, index) => (
                      <tr key={order.id} className='text-sm'>
                        <td className='py-2 dark:bg-transparent'>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                        <td className='py-2 dark:bg-transparent'>{userInfor[(currentPage - 1) * recordsPerPage + index ].email}</td>
                        <td className='py-2 dark:bg-transparent'>{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td className='py-2 dark:bg-transparent'>${order.totalAmount}</td>
                        <td className='py-2 dark:bg-transparent'>{order.shippingAddress}</td>
                        <td className='py-2 text-red-700'><MenuDefault option={["Pending", "Paid"]} current={order.paymentStatus} order={order} flag={true}/></td>
                        <td className='py-2 text-lime-700'><MenuDefault option={["Pending", "Approved", "Reject"]}  current={order.shippingStatus} order={order} flag={false}/></td>

                        <td className='py-2'>
                          <button
                            onClick={() => getOrdersDetail(order.id)}
                            type="button"
                            className="dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-300 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='mt-8 float-right mb-8'>
                    <nav >
                      <ul className="flex items-center -space-x-px h-10 text-base">
                        <li style={{margin: 0}}>
                          <a href="#" className="dark:bg-gray-500 dark:text-white flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ">
                            <span className="sr-only">Previous</span>
                            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                            </svg>
                          </a>
                        </li>
                        <li className={`${currentPage > 2 ? 'block' : 'hidden'} dark:bg-gray-500 dark:text-white flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}>...</li>

                          {
                              numbers.map((n, i) => (
                                <li className={ `dark:bg-gray-500 dark:text-white flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700  ${currentPage === n ? 'bg-gray-300 dark:bg-gray-800' : 'bg-white dark:bg-gray-500'}` } key={i}>
                                    <a href="#" onClick={() => changeCPage(n)} >{n}</a>
                                </li>
                            ))
                          }
                            <li className={`${currentPage < npage - 1 ? 'block' : 'hidden'} dark:bg-gray-500 dark:text-white flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}>...</li>
                        <li>

                          <a href="#" className="dark:bg-gray-500 dark:text-white flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ">
                            <span className="sr-only">Next</span>
                            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </nav>
                </div>
          </div>
        </span>
        ) : (
          <p><OtherLoading/></p>
        )}
    </div>
    );

    function changeCPage(id){
      setCurrentPage(id);
    }
};


export default StaffOrder