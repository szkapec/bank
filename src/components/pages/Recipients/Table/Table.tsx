import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Menu, MenuItem, Modal } from "@mui/material";
import RecipientModal from "components/Modal/Form/RecipientModal";
import { deleteUserRecipients } from "store/Recipient/recipientThunk";
import { useAppDispatch } from "store/hooks";
import { selectorLoaderRecipient } from "store/Recipient/recipientSelector";
import { useSelector } from "react-redux";

const Table = ({ recipient }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const loginErrorSelector = useSelector(selectorLoaderRecipient);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log("Dziala :>> ");
    setAnchorEl(null);
    setIsOpenModal(false);
  };

  useEffect(() => {
    console.log("loginErrorSelectorxxdsa :>> ", loginErrorSelector);
    handleClose();
  }, [loginErrorSelector]);

  const deleteRecipient = () => {
    dispatch(deleteUserRecipients(recipient._id));
    setAnchorEl(null);
    setIsOpenModal(false);
  };
  const openModal = (data: any) => {
    setIsOpenModal(true);
    // console.log('newData :>> ', newData);
    // setModalData(newData);
  };

  return (
    <Box className="recipient">
      <Box className="adress">
        <div className="recipients-adress">
          {recipient.recipientsName}{" "}
          <span> || {recipient.recipientsAdress}</span>
        </div>
        <Box sx={{ fontWeight: "300" }}>
          {recipient.recipientsAccount} | Bank CD S.A
        </Box>
      </Box>
      <Box
        className="title"
        onClick={() => console.log(`recipient22`, recipient)}
      >
        <div className="sum">{recipient.sum} PLN</div>
        <Box sx={{ fontWeight: "300", textAlign: "right" }}>
          {recipient.title}
        </Box>
      </Box>
      <Box className="menu">
        <div onClick={() => console.log(`recipient2`, recipient)}>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={deleteRecipient}>Usuń</MenuItem>
            <MenuItem onClick={openModal}>Edytuj</MenuItem>

            <Modal
              open={isOpenModal}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <RecipientModal edit={true} initialValue={recipient} />
            </Modal>
          </Menu>
        </div>
      </Box>
    </Box>
  );
};

export default React.memo(Table);
