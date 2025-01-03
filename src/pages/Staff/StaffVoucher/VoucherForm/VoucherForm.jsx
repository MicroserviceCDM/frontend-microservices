import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Snackbar, Alert } from "@mui/material";
import { cdmApi } from "../../../../misc/cdmApi";

function VoucherForm({ setOpenModal }) {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [expDate, setExpDate] = useState();
  const [per, setPer] = useState(0);
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  async function handleClick() {
    if (!code || !description || !expDate || !per) {
      setSnackbar({
        children: "Please fill all fields!",
        severity: "error",
      });
      return;
    }

    try {
      const voucher = {
        code: code,
        discount: per,
        expirationDate: expDate,
        title: "", // You can add a title input if needed
        description: description,
      };
      await cdmApi.createVoucher(voucher);
      setSnackbar({
        children: "Add new voucher successful!",
        severity: "success",
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
      setSnackbar({
        children: "Failed to add voucher!",
        severity: "error",
      });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <div className="flex justify-end">
          <button onClick={() => setOpenModal(false)}>
            <FontAwesomeIcon icon={faClose} className="text-gray-700" />
          </button>
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Code
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Percentage
          </label>
          <input
            type="number"
            id="percentage"
            value={per}
            onChange={(e) => setPer(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Exp Date
          </label>
          <input
            type="date"
            id="expDate"
            value={expDate}
            onChange={(e) => setExpDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClick}
            className="px-6 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>

      {!!snackbar && (
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

export default VoucherForm;