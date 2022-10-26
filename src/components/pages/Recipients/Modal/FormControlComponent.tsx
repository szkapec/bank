import React from "react";
import { Box } from "@mui/material";
import { Field } from "react-final-form";
import { useTranslation } from "react-i18next";
import LockIcon from "@mui/icons-material/Lock";
import HelpIcon from "@mui/icons-material/Help";

const FormControlComponent = () => {
  const { t } = useTranslation();

  return (
    <Box className="form-modal">
      <Box>
        <label>{t("modal.recipientsName")}</label>
        <Field
          name="recipientsName"
          component="input"
          type="text"
          placeholder={t("modal.recipientsName")}
        />
      </Box>
      <Box>
        <label>{t("modal.toRecipient")}</label>
        <Field
          name="toRecipient"
          component="input"
          type="text"
          placeholder={t("modal.toRecipient")}
        />
      </Box>
      <Box>
        <label>{t("modal.recipientsAdress")}</label>
        <Field
          name="recipientsAdress"
          component="input"
          type="text"
          placeholder={t("modal.recipientsAdress")}
        />
      </Box>
      <Box>
        <label>{t("modal.recipientsAccount")}</label>
        <Field
          name="recipientsAccount"
          component="input"
          type="text"
          placeholder={t("modal.recipientsAccount")}
        />
      </Box>
      <Box className="form-modal__checkbox">
        <Field name="trustedRecipient" component="input" type="checkbox" />
        <label>{t("modal.trustedRecipient")}</label>
        <LockIcon sx={{ marginLeft: "10px", color: "#1976d2" }} />
        <HelpIcon sx={{ marginLeft: "10px", color: "#1976d2" }} />
      </Box>
      <Box className="form-modal__box">
        <Box sx={{ marginRight: 5 }} className="form-modal__box--item">
          <label>{t("modal.sum")}</label>
          <Field
            name="sum"
            component="input"
            type="text"
            placeholder={t("modal.sum")}
          />
        </Box>
        <Box sx={{ marginLeft: 3 }} className="form-modal__box--item">
          <label>{t("modal.title")}</label>
          <Field
            name="title"
            component="input"
            type="text"
            placeholder={t("modal.title")}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FormControlComponent;
