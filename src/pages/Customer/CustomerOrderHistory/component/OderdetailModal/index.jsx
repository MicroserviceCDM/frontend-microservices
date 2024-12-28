import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faClose } from "@fortawesome/free-solid-svg-icons";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { cdmApi } from "../../../../../misc/cdmApi";
import { SyncLoader } from "react-spinners";

function OderdetailModal({ setOpenModal, data }) {
  const [productData, setProductData] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [loading, setLoading] = useState(true);

  const getProductById = async (id) => {
    const response = await cdmApi.getShopById(id);
    setProductData((prevData) => [...prevData, response.data]);
  };
  let total = 0;
  data.forEach((pro) => {
    total += parseInt(pro.quantity) * parseInt(pro.pricePerUnit);

  });
  const getAllProductDetail = async () => {
    // Sử dụng Promise.all để đảm bảo tất cả các promise được giải quyết trước khi tiếp tục
    await Promise.all(
      data.map(async (pro) => {
        await getProductById(pro.id.productId);
        total += parseInt(pro.quantity) * parseInt(pro.pricePerUnit);
      })
    );
    setHasFetchedData(true);
  };
  
  useEffect(() => {
    if (!hasFetchedData) {
      getAllProductDetail();
    }
    const timeoutId = setTimeout(() => {
        setLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [hasFetchedData, loading]);
  
  // Hành động tiếp theo sau khi productData đã được cập nhật
  useEffect(() => {
    console.log("Updated productData:", productData[0]);
  }, [productData]);
  


  return (
    <div className="modalBackground z-50">
      <div className="modalContainer">
                <span className="titleCloseBtn">
                    <button onClick={() => {setOpenModal(false);}}><FontAwesomeIcon className="text-black" icon={faClose} /></button>
                </span> 
                {(productData.length === data.length * 2) && (!loading) ? (
                <div>
                    <div style={{ maxHeight: '400px', overflowY: 'auto', scrollbarColor: '#ffffff #f0f0f0' }}>
                      <ul role="list" className="divide-y divide-gray-100">
                        {data.map((person, index) => (
                          <li key={person.id} className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                              <img className="h-12 w-12 flex-none bg-gray-50" src={productData[index].image_url} alt="" />
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{productData[index].name}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{productData[index].description}</p>
                              </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                              <p className="text-sm leading-6 text-gray-900">Quantity: {person.quantity}</p>
                              {person.quantity ? (
                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                  X {person.pricePerUnit}
                                </p>
                              ) : (
                                <div className="mt-1 flex items-center gap-x-1.5">
                                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                  </div>
                                  <p className="text-xs leading-5 text-gray-500">Online</p>
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                        </ul>
                    </div>
                    <div>
                          <p className="font-bolde float-right mr-36 mt-6">Total: ${total}</p>
                    </div>
                </div>
                ) : ( 
                  <div style={{ minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                      <p className="mb-8 text-xl">Wait a minute...</p>
                      <div className="mb-48"><SyncLoader/></div>
                  </div>
                )}
      </div>
    </div>
  );
}

export default OderdetailModal;
