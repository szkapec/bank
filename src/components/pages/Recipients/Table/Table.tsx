import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Menu, MenuItem, Modal } from "@mui/material";
import RecipientModal from "components/Modal/Form/RecipientModal";
import { deleteUserRecipients } from "store/Recipient/recipientThunk";
import { useAppDispatch } from "store/hooks";
import { selectorLoaderRecipient } from "store/Recipient/recipientSelector";
import { useSelector } from "react-redux";
import { IAddRecipient } from "store/Recipient/recipientInterface";
import TextWrapper from "components/Contents/TextWrapper";

interface IPropsRecipient {
  recipient: IAddRecipient;
}
const Table = ({ recipient }: IPropsRecipient) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const loginErrorSelector = useSelector(selectorLoaderRecipient);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpenModal(false);
  };

  useEffect(() => {
    handleClose();
  }, [loginErrorSelector]);

  const deleteRecipient = () => {
    dispatch(deleteUserRecipients(recipient._id));
    setAnchorEl(null);
    setIsOpenModal(false);
  };
  const openModal = () => {
    setIsOpenModal(true);
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
      <Box className="title">
        <div className="sum">{recipient.sum} PLN</div>
        <Box sx={{ fontWeight: "300", textAlign: "right" }}>
          {recipient.title}
        </Box>
      </Box>
      <Box className="menu">
        <div>
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
            <MenuItem onClick={deleteRecipient}>
              <TextWrapper label="recipients.delete" />
            </MenuItem>
            <MenuItem onClick={openModal}>
              <TextWrapper label="recipients.edit" />
            </MenuItem>
            <Modal
              open={isOpenModal}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <RecipientModal edit={true} initialValue={recipient} handleClose={handleClose} />
            </Modal>
          </Menu>
        </div>
      </Box>
    </Box>
  );
};

export default React.memo(Table);
