import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { cdmApi } from "../../../../misc/cdmApi";

function VoucherForm({ setOpenModal }) {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [expDate, setExpDate] = useState();
  const [per, setPer] = useState(0);
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  function handleClick() {
    if (code === "" || description === "" || expDate === "" || per === 0) {
      setSnackbar({
        children: "Please fill all field above!",
        severity: "error",
      });
    } else {
      try {
        const today = new Date();

        const voucher = {
          code: code,
          discount: per,
          expirationDate: expDate,
          title: "",
          description: description,
        };
        cdmApi.createVoucher(voucher);
        setSnackbar({
          children: "Add new voucher successful!",
          severity: "success",
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="modalBackground ">
      <div className="modalContainer w-[35vw]">
        <span className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <FontAwesomeIcon className="text-black" icon={faClose} />
          </button>
        </span>
        <div className="w-full max-w-xs mx-auto " style={{ marginTop: -25 }}>
          <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                for="name"
              >
                Code
              </label>
              <input
                onChange={(e) => setCode(e.target.value)}
                className="bg-white text-sm w-full px-3 py-2.5 leading-tight text-gray-700 border rounded appearance-none focus:outline-none"
                id="name"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                for="email"
              >
                Percentage
              </label>
              <input
                onChange={(e) => setPer(e.target.value)}
                className="text-sm py-2.5 bg-white  w-full px-3 leading-tight text-gray-700 border rounded appearance-none focus:outline-none"
                id="email"
                type="text"
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                for="message"
              >
                Description
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white  w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none"
                id="message"
              ></textarea>
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                for="message"
              >
                Exp Date
              </label>
              <input
                onChange={(e) => setExpDate(e.target.value)}
                className="text-sm bg-white  w-full px-3 py-2.5 leading-tight text-gray-700 border rounded appearance-none focus:outline-none"
                id="message"
                type="date"
              ></input>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleClick()}
                className="ml-auto px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
                type="submit"
              >
                Send
              </button>
            </div>
          </div>
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
