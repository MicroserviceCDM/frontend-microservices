import React, { useEffect, useState } from "react";
import SideBarStaff from "../../../layouts/components/SideBarStaff";
import VoucherForm from "../StaffVoucher/VoucherForm";
import { cdmApi } from "../../../misc/cdmApi";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
function StaffVoucher() {
  const [modalOpen, setModalOpen] = useState(false);

  function addNewVoucher() {
    setModalOpen(true);
  }
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
  const deleteVouher = async (voucher) => {
    try {
      cdmApi.deleteVoucher(voucher);
      console.log(voucher);
      setSnackbar({ children: "Delete Successfully!", severity: "success" });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const [vouchers, setVouchers] = useState([]);

  const fetVoucher = async () => {
    try {
      const res = await cdmApi.getAllVoucher();
      setVouchers(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetVoucher();
  }, []);
  return (
    <>
      {modalOpen && <VoucherForm setOpenModal={setModalOpen} />}

      <div className="flex dark:bg-slate-800 h-screen">
        <SideBarStaff />
        {/* content */}
        <div>
          <div className="flex space-between ml-8  mt-16">
            <h1 className="font-bold text-3xl  text-black dark:text-white">
              Voucher
            </h1>
            <button
              onClick={() => addNewVoucher()}
              className="ml-auto bg-black text-white py-2.5 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-300 hover:bg-gray-700 focus:ring-gray-200"
            >
              Add new voucher
            </button>
          </div>

          <table className="ml-8 mt-8 dark:text-white">
            <thead>
              <th className="dark:bg-gray-500 ">No</th>
              <th className="dark:bg-gray-500">Code</th>
              <th className="dark:bg-gray-500">Description</th>
              <th className="dark:bg-gray-500">Percentage</th>
              <th className="dark:bg-gray-500">Expire Date</th>
              <th className="dark:bg-gray-500">Action</th>
            </thead>
            <tbody>
              {vouchers.map((voucher, index) => (
                <tr key={voucher.id} className="text-sm">
                  <td>{index + 1}</td>
                  <td>{voucher.code}</td>
                  <td>{voucher.description}</td>
                  <td>{voucher.discount}</td>
                  <td>{voucher.expirationDate}</td>
                  <td>
                    <button
                      onClick={() => deleteVouher(voucher)}
                      className="bg-red-500 p-2"
                    >
                      <GridDeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </>
  );
}

export default StaffVoucher;
