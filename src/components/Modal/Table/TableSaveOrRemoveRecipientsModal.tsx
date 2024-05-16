import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Menu, MenuItem, Modal } from "@mui/material";
import RecipientModal from "components/Modal/Form/RecipientModal";
import TextWrapper from "components/Contents/TextWrapper";
import { useEffect, useState } from "react";
import { selectorLoaderRecipient } from "store/Recipient/recipientSelector";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks";
import { deleteUserRecipients } from "store/Recipient/recipientThunk";
import { IAddRecipient } from "store/Recipient/recipientInterface";

interface IPropsRecipient {
  recipient: IAddRecipient;
}

const TableSaveOrRemoveRecipientsModal = ({ recipient }: IPropsRecipient) => {
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  // const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const loginErrorSelector = useSelector(selectorLoaderRecipient);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // setAnchorEl(null);
    // setIsOpenModal(false);
  };

  useEffect(() => {
    handleClose();
  }, [loginErrorSelector]);

  const deleteRecipient = () => {
    dispatch(deleteUserRecipients(recipient._id));
    // setAnchorEl(null);
    // setIsOpenModal(false);
  };
  const openModal = () => {
    // setIsOpenModal(true);
  };

  return (
    <Box className="menu">
      <div>
        <Button
          id="basic-button"
          // aria-controls={open ? "basic-menu" : undefined}
          // aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </Button>
        <Menu
          id="basic-menu"
          // anchorEl={anchorEl}
          open={false}
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
            open={false}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <RecipientModal
              edit={true}
              initialValue={recipient}
              handleClose={handleClose}
            />
          </Modal>
        </Menu>
      </div>
    </Box>
  );
};

export default TableSaveOrRemoveRecipientsModal;
