import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { FormControlLabel, Switch, Modal, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import RecipientModal from "components/Modal/Form/RecipientModal";
import "./Recipients.scss";
import { userRecipients } from "store/Recipient/recipientThunk";
import { useAppDispatch } from "store/hooks";
import { useQuery } from "react-query";
import Loader from "components/Loader/Loader";
import Error from "components/Error/Error";
import TableWrapper from "./Table/TableWrapper";
import { useSelector } from "react-redux";
import { selectorLoaderRecipient, selectorDataRecipient } from "store/Recipient/recipientSelector";
import 'react-notifications/lib/notifications.css';

const Recipients = () => {
  const loginErrorSelector = useSelector(selectorLoaderRecipient);
  const dataSelector = useSelector(selectorDataRecipient);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, error } = useQuery("recipients", () =>
    dispatch(userRecipients())
  );

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log('loginErrorSelectorxxdsa :>> ', loginErrorSelector);
    handleClose();
  }, [loginErrorSelector])

  if (isLoading) return <Loader />;

  if (error) return <Error error="An error has occurred: " />;
  console.log('dataSelector221 :>> ', dataSelector);
  const handleOpen = () => {
    setOpen(true);
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
            <RecipientModal />
          </Modal>
        </div>
        <div className="box-search">
          <TextField
            size="small"
            id="outlined-basic"
            label="Wyszukaj"
            variant="outlined"
          />
          <Box className="saved">
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Tylko zaufani odbiorcy"
            />
            <LockIcon color="primary" />
          </Box>
        </div>
        <Box>
          <TableWrapper recipients={dataSelector} />
        </Box>
      </Box>
      <Box className="box__saved">
        <h3>Wykonaj przelew</h3>
      </Box>
    </div>
  );
};

export default Recipients;
