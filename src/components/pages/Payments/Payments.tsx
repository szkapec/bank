import React, { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { FormControlLabel, Switch, Modal, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PaymentModal from "./Modal/PaymentModal";
import './Payments.scss';


const Payments = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="box">
      <Box className="box__recipients">
        <h3>Odbiorcy zdefiniowani</h3>
        <div>
          <Button onClick={handleOpen}>
            <AddCircleOutlineIcon />
            <span>Dodaj odbiorce</span>
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <PaymentModal />
          </Modal>
        </div>
        <div>
          <TextField id="outlined-basic" label="Wyszukaj" variant="outlined" />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Tylko zaufani odbiorcy"
          />
          <LockIcon />
        </div>
        <div>
          <div></div>
        </div>
      </Box>
      <Box className="box__saved">
        <h3>Wykonaj przelew</h3>
      </Box>
    </div>
  );
};

export default Payments;
