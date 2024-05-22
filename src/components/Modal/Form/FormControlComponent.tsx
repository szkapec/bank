import { Box } from "@mui/material";
import { Field } from "react-final-form";
import { useTranslation } from "react-i18next";
import LockIcon from "@mui/icons-material/Lock";
import HelpIcon from "@mui/icons-material/Help";
import { IInitialError } from "./RecipientModal";
import { useSelector } from "react-redux";
import { selectorLoaderRecipient } from "store/Recipient/recipientSelector";
import Loader from "../../Loader/Loader";
import TextWrapper from "components/Contents/TextWrapper";

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
        <TextWrapper label="modal.recipientsName" Selector="label" />
        <Field
          className={errorModal.recipientsName ? "input-error" : ""}
          name="recipientsName"
          component="input"
          type="text"
          placeholder={t("modal.recipientsName")}
        />
        {errorModal.recipientsName && (
          <TextWrapper label="modal.dataRequired" Selector="div" />
        )}
      </Box>
      <Box>
        <TextWrapper label="modal.toRecipient" Selector="label" />
        <Field
          className={errorModal.toRecipient ? "input-error" : ""}
          name="toRecipient"
          component="input"
          type="text"
          placeholder={t("modal.toRecipient")}
        />
        {errorModal.toRecipient && (
          <div className="error">
            <TextWrapper label="modal.dataRequired" />
          </div>
        )}
      </Box>
      <Box>
        <TextWrapper label="modal.recipientsAdress" Selector="label" />
        <Field
          name="recipientsAdress"
          component="input"
          type="text"
          placeholder={t("modal.recipientsAdress")}
        />
      </Box>
      <Box>
        <TextWrapper label="modal.recipientsAccount" Selector="label" />
        <Field
          className={errorModal.recipientsAccount ? "input-error" : ""}
          name="recipientsAccount"
          component="input"
          type="text"
          placeholder={t("modal.recipientsAccount")}
        />
        {errorModal.recipientsAccount && (
          <div className="error">
            {" "}
            <TextWrapper label="modal.dataRequired" />
          </div>
        )}
      </Box>
      <Box className="form-modal__checkbox">
        <Field name="trustedRecipient" component="input" type="checkbox" />
        <TextWrapper label="modal.trustedRecipient" Selector="label" />
        <LockIcon sx={{ marginLeft: "10px", color: "#1976d2" }} />
        <HelpIcon sx={{ marginLeft: "10px", color: "#1976d2" }} />
      </Box>
      <Box className="form-modal__box">
        <Box sx={{ marginRight: 5 }} className="form-modal__box--item">
          <TextWrapper label="modal.sum" Selector="label" />
          <Field
            className={errorModal.sum ? "input-error" : ""}
            name="sum"
            component="input"
            type="number"
            placeholder={t("modal.sum")}
          />
          {errorModal.sum && (
            <div className="error">
              <TextWrapper label="modal.wrongValue" />
            </div>
          )}
        </Box>
        <Box sx={{ marginLeft: 3 }} className="form-modal__box--item">
          <TextWrapper label="modal.title" Selector="label" />
          <Field
            className={errorModal.title ? "input-error" : ""}
            name="title"
            component="input"
            type="text"
            placeholder={t("modal.title")}
          />
          {errorModal.title && (
            <div className="error">
              <TextWrapper label="modal.dataRequired" Selector="label" />
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FormControlComponent;
