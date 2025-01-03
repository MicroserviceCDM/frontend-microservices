import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faClose } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, List, ListItem, Link } from "@mui/material";

function Modal({ open, setOpenModal, data }) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpenModal(false)}
      fullWidth
      maxWidth="sm" // Adjust the size as needed
      PaperProps={{
        className: "dark:bg-gray-800"
      }}
    >
      <DialogTitle>
        <div className="flex justify-between items-center">
          <Typography variant="h5" fontWeight="bold" class="dark:text-white">
            Shopping Guide
          </Typography>
          <IconButton onClick={() => setOpenModal(false)}>
            <FontAwesomeIcon icon={faClose} className="text-gray-700" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <List className="space-y-4 list-disc pl-5"> {/* Added some left padding */}
          <ListItem disablePadding className="hover:underline hover:font-semibold" class="dark:text-white">
            <Link href="/vehicle" underline="none" color="inherit">
              Configure your car
            </Link>
          </ListItem>
          <ListItem disablePadding className="hover:underline hover:font-semibold">
            <Link href="/customerhome/bookappointment" underline="none" color="inherit" class="dark:text-white">
              Book a test drive
            </Link>
          </ListItem>
          {/* You can add more list items here if needed */}
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;