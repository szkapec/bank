import React from "react";
import Box from "@mui/material/Box";
import { Field, Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import ButtonGroupCompomnent from "./ButtonGroup";
import { style, buttons } from './helper';
import FormControlComponent from "./FormControlComponent";
import { Button } from "@mui/material";
import { initialFormValue } from './helper';

const onSubmit = (values: any) => {
  console.log("values :>> ", values);
};


const PaymentModal = () => {
  const { t } = useTranslation();
  return (
    <Box className="modal" sx={{ ...style, width: 600 }}>
      <h2>{t("modal.addRecipients")}</h2>
      
      <Box>{t("modal.paymentMethod")}</Box>
      <Form
        onSubmit={onSubmit}
        initialValues={initialFormValue}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <>
              <label>First Name</label>
              <Field
                name="firstName"
                component="input"
                type="text"
                placeholder="First Name"
              />
              <ButtonGroupCompomnent buttons={buttons} />
              <FormControlComponent/>
              <Button type="submit">Dalej</Button>
            </>
          </form>
        )}
      />
    </Box>
  );
};

export default PaymentModal;
