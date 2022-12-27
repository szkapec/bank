import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, Modal } from "@mui/material";
import { IAddRecipient } from "store/Recipient/recipientInterface";
import { style } from "./helper/helper";
import "./TableModal.scss";
import TextWrapper from "components/Contents/TextWrapper";
interface IPropsTableModal {
  recipients: IAddRecipient[];
  open: boolean;
  handleClose: any;
  setData: Function;
}

export interface IInitialError {
  recipientsName: boolean;
  toRecipient: boolean;
  recipientsAccount: boolean;
  title: boolean;
  sum: boolean;
}

const TableModal = ({
  recipients,
  open,
  handleClose,
  setData,
}: IPropsTableModal) => {
  const [selectId, setSelectId] = useState("");

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 600 }}>
        <TextWrapper label="modal.selectRecipient" Selector="h2" />
        <Box className="modal">
          {recipients?.map(
            ({ _id, title, sum, recipientsName }: IAddRecipient) => (
              <Box
                className={
                  selectId === _id
                    ? "modal--recipient active"
                    : "modal--recipient"
                }
                key={_id}
                onClick={() => setSelectId(_id)}
              >
                <Box className="name">
                  <TextWrapper label="modal.nameRecipient" /> {recipientsName}
                </Box>
                <Box className="title">
                  <TextWrapper label="modal.titleAndTotal" /> {title}
                  <span> || </span> {sum}zł
                </Box>
              </Box>
            )
          )}
        </Box>
        <Button onClick={() => setData(selectId, recipients)}>
          <TextWrapper label="modal.choose" />
        </Button>
        <Button onClick={handleClose}>
          <TextWrapper label="modal.cancel" />
        </Button>
      </Box>
    </Modal>
  );
};

export default React.memo(TableModal);
