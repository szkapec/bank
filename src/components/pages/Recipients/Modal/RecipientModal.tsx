import React from "react";
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
} from "../../../../store/Recipient/recipientThunk";
import { useAppDispatch } from "../../../../store/hooks";
import { IAddRecipient } from "../../../../store/Recipient/recipientInterface";

interface IProps {
  initialValue?: IAddRecipient;
  edit?: boolean;
}

const RecipientModal = ({ initialValue, edit }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const onSubmit = (values: IAddRecipient) => {
    if (!edit) {
      dispatch(addUserRecipients(values));
    } else {
      dispatch(editUserRecipients(values));
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
              <FormControlComponent />
              <Button type="submit">Dalej</Button>
            </>
          </form>
        )}
      />
    </Box>
  );
};

export default RecipientModal;
