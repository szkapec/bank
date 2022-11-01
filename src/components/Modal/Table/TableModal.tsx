import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Field, Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "@mui/material";

import {
  addUserRecipients,
  editUserRecipients,
} from "../../../store/Recipient/recipientThunk";
import { useAppDispatch } from "../../../store/hooks";
import { IAddRecipient } from "../../../store/Recipient/recipientInterface";
import { selectorLoaderRecipient } from "../../../store/Recipient/recipientSelector";
import { style } from "./helper/helper";
import "./TableModal.scss";

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
  const { t } = useTranslation();

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <h2>Wybierz odbiorce</h2>
          <Box className="modal">
            {recipients.map((recipient: any) => (
              <div
                className={
                  selectId === recipient._id
                    ? "modal--recipient active"
                    : "modal--recipient"
                }
                key={recipient._id}
                onClick={() => setSelectId(recipient._id)}
              >
                <div className="name">
                  <span>Nazwa odbiorcy:</span> {recipient.recipientsName}
                </div>
                <div className="title">
                  <span>Tytuł i suma:</span> {recipient.title} <span> || </span>{" "}
                  {recipient.sum}zł
                </div>
              </div>
            ))}
          </Box>
          <Button onClick={() => setData(selectId, recipients)}>Wybierz</Button>
          <Button onClick={handleClose}>Anuluj</Button>
        </Box>
      </Modal>
    </>
  );
};

export default React.memo(TableModal);
