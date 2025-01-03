import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Checkbox, FormControlLabel, Button, FormControl, InputLabel } from "@mui/material";

function Modal({ open, setOpenModal, data }) {
  return (
    <Dialog open={open} onClose={() => setOpenModal(false)} fullWidth maxWidth="md">
      <DialogTitle>
        <div className="flex justify-between items-center">
          <span>Add Card</span>
          <button onClick={() => setOpenModal(false)}>
            <FontAwesomeIcon icon={faClose} className="text-gray-700" />
          </button>
        </div>
      </DialogTitle>

      <DialogContent>
        <div className="flex space-x-8">
          <div className="flex-2">
            <TextField
              label="Card Number"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Name On Card"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel shrink htmlFor="expiration-month">
                Expiration Date
              </InputLabel>
              <div className="flex items-center">
                <Select
                  labelId="expiration-month-label"
                  id="expiration-month"
                  label="Expiration Date"
                  className="w-1/2 pr-2"
                  MenuProps={{ style: { maxHeight: 250 } }}
                >
                  {[...Array(12)].map((_, index) => (
                    <MenuItem key={index} value={index + 1}>
                      {(index + 1).toString().padStart(2, "0")}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  labelId="expiration-year-label"
                  id="expiration-year"
                  label="Expiration Year"
                  className="w-1/2 pl-2"
                  MenuProps={{ style: { maxHeight: 250 } }}
                >
                  {[...Array(18)].map((_, index) => (
                    <MenuItem key={index} value={23 + index}>
                      {(23 + index).toString()}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </FormControl>
            <TextField
              label="CVV"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Set as default payment method"
            />
          </div>

          <div className="w-px bg-gray-400 mx-4"></div>

          <div className="flex-1">
            <p className="mt-6">
              CDM system only accepts major credit Visa and Master Card
            </p>
            <div className="flex mt-4 space-x-4">
              <img
                src="https://res.cloudinary.com/droondbdu/image/upload/v1701763296/5982778_Screen_Shot_2022-05-11_at_09_fo5sll.webp"
                alt="Visa"
                className="h-16 w-auto"
              />
              <img
                src="https://res.cloudinary.com/droondbdu/image/upload/v1701763523/download_4_ew6v6d.png"
                alt="MasterCard"
                className="h-16 w-auto"
              />
            </div>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => setOpenModal(false)}
          variant="outlined"
          color="error"
          className="px-8"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Add Card
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;