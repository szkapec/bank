import React from "react";
import { Box } from "@mui/material";
import { Field } from "react-final-form";
import { useTranslation } from "react-i18next";
import LockIcon from "@mui/icons-material/Lock";
import HelpIcon from "@mui/icons-material/Help";
import { IInitialError } from "./RecipientModal";
import { useSelector } from "react-redux";
import { selectorLoaderRecipient } from "store/Recipient/recipientSelector";
import Loader from "../../Loader/Loader";

interface IProps {
  errorModal: IInitialError;
}

const FormControlComponent = ({ errorModal }: IProps) => {
  const { t } = useTranslation();
  const loginErrorSelector = useSelector(selectorLoaderRecipient);

  return (
    <Box className="form-modal" sx={{ position: "relative" }}>
      <Box>
        {loginErrorSelector && (
          <div className="loader">
            <Loader text="Zapis danych" />
          </div>
        )}
        <label>{t("modal.recipientsName")}</label>
        <Field
          className={errorModal.recipientsName ? "input-error" : ""}
          name="recipientsName"
          component="input"
          type="text"
          placeholder={t("modal.recipientsName")}
        />
        {errorModal.recipientsName && (
          <div className="error">Dane wymagane!</div>
        )}
      </Box>
      <Box>
        <label>{t("modal.toRecipient")}</label>
        <Field
          className={errorModal.toRecipient ? "input-error" : ""}
          name="toRecipient"
          component="input"
          type="text"
          placeholder={t("modal.toRecipient")}
        />
        {errorModal.toRecipient && <div className="error">Dane wymagane!</div>}
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
          className={errorModal.recipientsAccount ? "input-error" : ""}
          name="recipientsAccount"
          component="input"
          type="text"
          placeholder={t("modal.recipientsAccount")}
        />
        {errorModal.recipientsAccount && (
          <div className="error">Dane wymagane!</div>
        )}
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
            className={errorModal.sum ? "input-error" : ""}
            name="sum"
            component="input"
            type="text"
            placeholder={t("modal.sum")}
          />
          {errorModal.sum && (
            <div className="error">Nie prawidłowa wartość</div>
          )}
        </Box>
        <Box sx={{ marginLeft: 3 }} className="form-modal__box--item">
          <label>{t("modal.title")}</label>
          <Field
            className={errorModal.title ? "input-error" : ""}
            name="title"
            component="input"
            type="text"
            placeholder={t("modal.title")}
          />
          {errorModal.title && <div className="error">Dane wymagane!</div>}
        </Box>
      </Box>
    </Box>
  );
};

export default FormControlComponent;
