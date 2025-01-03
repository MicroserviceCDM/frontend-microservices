import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { cdmApi } from "../../../../../misc/cdmApi";
import { SyncLoader } from "react-spinners";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";


function OderdetailModal({ setOpenModal, open, data }) {
  const [productData, setProductData] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [loading, setLoading] = useState(true); // Start with loading true

  const getProductById = async (id) => {
    const response = await cdmApi.getShopById(id);
    setProductData((prevData) => [...prevData, response.data]);
  };

  useEffect(() => {
    const getAllProductDetail = async () => {
      if (data && data.content) {
        setLoading(true); // Set loading to true when fetching data
        setHasFetchedData(false); // Reset hasFetchedData
        setProductData([]); // Clear previous product data
        await Promise.all(
          data.content.map(async (pro) => {
            await getProductById(pro.id.productId);
          })
        );
        setHasFetchedData(true);
      }
    };
    getAllProductDetail();
  }, [data]); // Fetch data when 'data' changes

  useEffect(() => {
    if (hasFetchedData) {
      setLoading(false); // Turn off loading when data is fetched
    }
  }, [hasFetchedData]);

  // Calculate total based on data.content
  let total = 0;
  if (data && data.content) {
    data.content.forEach((pro) => {
      total += parseInt(pro.quantity) * parseInt(pro.pricePerUnit);
    });
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpenModal(false)}
      fullWidth
      maxWidth="md"
      PaperProps={{
        style: {
          maxHeight: "80vh",
        },
        className: "dark:bg-gray-800"
      }}
    >
      <DialogTitle className="dark:text-gray-200">
        <div className="flex justify-between items-center">
          <span>Order Details</span>
          <IconButton onClick={() => setOpenModal(false)}>
            <FontAwesomeIcon icon={faClose} className="text-gray-700 dark:text-gray-200" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent className="dark:text-gray-200">
        {/* Show loading indicator if loading is true or data is not available */}
        {loading || !data || !data.content ? (
          <div
            style={{
              minHeight: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <p className="mb-8 text-xl dark:text-gray-200">Wait a minute...</p>
            <div className="mb-48">
              <SyncLoader color="#36d7b7" />
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                scrollbarColor: "#ffffff #f0f0f0",
              }}
            >

              <ul role="list" className="divide-y divide-gray-100 dark:divide-gray-700">
                {data.content.map((item, index) => (
                  <li
                    key={item.id.orderId + "-" + item.id.productId}
                    className="flex justify-between gap-x-6 py-5"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <img
                        className="h-12 w-12 flex-none bg-gray-50"
                        src={productData[index]?.image_url}
                        alt=""
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                          {productData[index]?.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-400">
                          {productData[index]?.description}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col mr-2 sm:items-end">
                      <p className="text-sm leading-6 text-gray-900 dark:text-gray-200">
                        Quantity: {item.quantity}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                        x {item.pricePerUnit.toLocaleString()}
                      </p>
                      {/* Display size and color */}
                      <p className="text-sm leading-6 text-gray-900 dark:text-gray-200">
                        Size: {item.size}
                      </p>
                      <p className="text-sm leading-6 text-gray-900 dark:text-gray-200">
                        Color: {item.color}
                      </p>
                      <p className="text-sm leading-6 text-gray-900 dark:text-gray-200">
                        Size: {item.size}
                      </p>
                      <p className="text-sm leading-6 text-gray-900 dark:text-gray-200">
                        Voucher Value: {item.voucherValue}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Typography
                variant="h6"
                className="font-bold float-right mr-36 mt-6 dark:text-gray-200"
              >
                Total: ${total.toLocaleString()}
              </Typography>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

}


export default OderdetailModal;