import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { FormControlLabel, Switch, Modal, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import RecipientModal from "./Modal/RecipientModal";
import "./Recipients.scss";
import { userRecipients } from "../../../store/Recipient/recipientThunk";
import { useAppDispatch } from "../../../store/hooks";
import { useQuery } from "react-query";
import Loader from "../../Loader/Loader";
import Error from "../../Error/Error";
import CustomPaginationActionsTable from "./Table/TableWrapper";
import { IAddRecipient } from "../../../store/Recipient/recipientInterface";

const Recipients = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { isLoading, error, data } = useQuery("recipients", () =>
    dispatch(userRecipients())
  );

  if (isLoading) return <Loader />;

  if (error) return <Error error="An error has occurred: " />;

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
          <CustomPaginationActionsTable recipients={data?.payload} />
        </Box>
      </Box>
      <Box className="box__saved">
        <h3>Wykonaj przelew</h3>
      </Box>
    </div>
  );
};

export default Recipients;
