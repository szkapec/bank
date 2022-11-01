import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Field, Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import ButtonGroupCompomnent from "./ButtonGroup";
import { style, buttons } from "./helper/helper";
import FormControlComponent from "./FormControlComponent";
import { Button } from "@mui/material";
import { initialFormValue } from "./helper/helper";
import {
  addUserRecipients,
  editUserRecipients,
} from "../../../store/Recipient/recipientThunk";
import { useAppDispatch } from "../../../store/hooks";
import { IAddRecipient } from "../../../store/Recipient/recipientInterface";
import { useSelector } from "react-redux";
import { selectorLoaderRecipient } from "../../../store/Recipient/recipientSelector";
import { createNotification } from "../../../util/notification";

interface IProps {
  initialValue?: IAddRecipient;
  edit?: boolean;
  handleClose?: Function;
}

export interface IInitialError {
  recipientsName: boolean;
  toRecipient: boolean;
  recipientsAccount: boolean;
  title: boolean;
  sum: boolean;
}

const initialError: IInitialError = {
  recipientsName: false,
  toRecipient: false,
  recipientsAccount: false,
  title: false,
  sum: false,
};

const RecipientModal = ({ initialValue, edit, handleClose }: IProps) => {
  const errorHandler = (value: string): boolean =>
    value?.length > 3 ? false : true;

  const [errorForm, setErrorForm] = useState<IInitialError>(initialError);
  const { t } = useTranslation();



  const dispatch = useAppDispatch();
  const onSubmit = (values: IAddRecipient) => {
    const { recipientsName, toRecipient, recipientsAccount, title, sum } =
      values;
    let errorRecipientsName,
      errorToRecipient,
      errorTitle,
      errorSum,
      errorRecipientsAccount = false;

    if (parseFloat(sum) < 0) errorSum = true;
    if (recipientsAccount?.length !== 20) errorRecipientsAccount = true;
    errorRecipientsName = errorHandler(recipientsName);
    errorToRecipient = errorHandler(toRecipient);
    errorTitle = errorHandler(title);

    console.log("errorRecipientsAccount :>> ", errorRecipientsAccount);
    console.log("errorRecipientsName :>> ", errorRecipientsName);
    if (
      !errorRecipientsName &&
      !errorToRecipient &&
      !errorTitle &&
      !errorSum &&
      !errorRecipientsAccount
    ) {
      console.log("errorrrr :>> ", errorRecipientsAccount);
      setErrorForm(initialError)
      createNotification('info', 'text')
      if (!edit) {
        dispatch(addUserRecipients(values));
      } else {
        dispatch(editUserRecipients(values));
      }
     
   
    } else {
      console.log("errorrrr :>> ");
      setErrorForm({
        recipientsName: !!errorRecipientsName,
        toRecipient: !!errorToRecipient,
        title: !!errorTitle,
        sum: !!errorSum,
        recipientsAccount: !!errorRecipientsAccount,
      });
    }
  };
  console.log("initialValue :>> ", initialValue);
  return (
    <Box className="modal" sx={{ ...style, width: 600 }}>
      <h2>{t("modal.addRecipients")}</h2>
      <Box>{t("modal.paymentMethod")}</Box>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValue || initialFormValue}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <>
              <ButtonGroupCompomnent buttons={buttons} />
              <FormControlComponent errorModal={errorForm} />
              <Button type="submit">Dalej</Button>
              <Button type="submit">Wróć</Button>
            </>
          </form>
        )}
      />
    </Box>
  );
};

export default RecipientModal;
