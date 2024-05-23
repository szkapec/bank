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
import { selectorAuthLoginUserNumberAccount } from "store/Login/loginSelector";

interface IPropsRecipient {
  recipient: IAddRecipient;
  historyTable?: boolean;
  numberAccount?: string;
  edit?: boolean;
}

const TableSaveOrRemoveRecipientsModal = ({
  recipient,
  historyTable,
  numberAccount,
  edit
}: IPropsRecipient) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const open = !!anchorEl;
  const dispatch = useAppDispatch();
  const loginErrorSelector = useSelector(selectorLoaderRecipient);
  const myNumberAccountSelector = useSelector(
    selectorAuthLoginUserNumberAccount
  );
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
    <Box className="menu">
      <div>
        <Button
          disabled={numberAccount === myNumberAccountSelector}
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
          {!historyTable && (
            <MenuItem onClick={deleteRecipient}>
              <TextWrapper label="recipients.delete" />
            </MenuItem>
          )}
          <MenuItem onClick={openModal}>
            {historyTable ? (
              <TextWrapper label="Zapisz odbiorce" />
            ) : (
              <TextWrapper label="recipients.edit" />
            )}
          </MenuItem>
          <Modal
            open={isOpenModal}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <RecipientModal
              edit={edit}
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
