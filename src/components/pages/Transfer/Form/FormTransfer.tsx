import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  selectorLoaderTransfer,
  selectorTransferMessage,
} from "store/Transfer/transferSelector";
import { messageClear } from "store/Transfer/transferSlice";
import { initialFormData } from "../Transfer";
import { useAppDispatch } from "store/hooks";
import MiniLoader from "components/Loader/MiniLoader";
import { IPropsTransfer } from "store/Transfer/transferInterface";
import TableModal from "components/Modal/Table/TableModal";
import { selectorDataRecipient } from "store/Recipient/recipientSelector";
import { userRecipients } from "store/Recipient/recipientThunk";
import { IAddRecipient } from "store/Recipient/recipientInterface";
import { selectorLimit } from "store/Login/loginSelector";
import { Box } from "@mui/material";
import TextWrapper from "components/Contents/TextWrapper";
import { useTranslation } from "react-i18next";

const FormTransfer = ({
  error,
  formData,
  setFormData,
  money,
}: IPropsTransfer) => {
  const messageSelector = useSelector(selectorTransferMessage);
  const loaderSelector = useSelector(selectorLoaderTransfer);
  const dataRecipientSelector = useSelector(selectorDataRecipient);
  const limitSelector = useSelector(selectorLimit);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData(initialFormData);
    messageSelector && setTimeout(useMessage, 6000);
  }, [messageSelector]);

  const useMessage = () => dispatch(messageClear());

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const setDataRecipients = useCallback(
    (id: string, recipients: IAddRecipient[]) => {
      const recipient = recipients.filter(
        (recipient) => recipient._id === id
      )[0];

      setFormData({
        body: recipient.title,
        howMuchMoney: recipient.sum,
        numberReceived: recipient.recipientsAccount,
        nameReceived: recipient.recipientsName,
      });
      handleClose();
    },
    []
  );

  const handleModal = () => {
    if (dataRecipientSelector.length === 0) {
      dispatch(userRecipients());
    }
    setOpen(true);
  };

  return (
    <Box className="container-transfer">
      {messageSelector && (
        <Box className="error-transfer-global">{messageSelector}</Box>
      )}
      <Box className="container-transfer__transfer">
        <label htmlFor="text">{t('transfer.toRecipient')}</label>
        <input
          type="text"
          name="nameReceived"
          value={formData.nameReceived}
          placeholder={t('recipients.nameRecipient')}
          onChange={handleChange}
        />
        <div
          className="container-transfer__address"
          onClick={() => handleModal()}
        >
          <TextWrapper label="transfer.adressDefined"/>
        </div>
        <TableModal
          recipients={dataRecipientSelector}
          handleClose={handleClose}
          open={open}
          setData={setDataRecipients}
        />
      </Box>
      <Box className="container-transfer__transfer">
        <label htmlFor="numberReceived">{t('transfer.bankAccountNumber')}</label>
        <input
          className={error.errorAccount ? "error-input" : ""}
          type="number"
          value={formData.numberReceived}
          name="numberReceived"
          placeholder={t('transfer.recipientAccountNumber')}
          onChange={handleChange}
        />
        {error.errorAccount && (
          <div className="error-transfer">
            <TextWrapper label="transfer.accountValid"/>
          </div>
        )}
      </Box>
      <Box className="container-transfer__transfer">
        <label htmlFor="body">{t('transfer.transferTitle')}</label>
        <input
          className={error.errorBody ? "error-input" : ""}
          type="text"
          value={formData.body}
          name="body"
          placeholder={t('transfer.transferContent')}
          onChange={handleChange}
        />
        {error.errorBody && (
          <div className="error-transfer">
            <TextWrapper label="transfer.contentTransferValid"/>
          </div>
        )}
      </Box>
      <Box className="container-transfer__transfer">
        <label htmlFor="howMuchMoney">{t('transfer.sum')}</label>
        <input
          className={error.errorMoney ? "error-input" : ""}
          type="number"
          value={formData.howMuchMoney}
          name="howMuchMoney"
          placeholder={t('transfer.transferMoney')}
          onChange={handleChange}
        />
        {error.errorMoney && (
          <div className="error-transfer">
            <TextWrapper label="transfer.wrongValue"/>
          </div>
        )}
        {Number(formData.howMuchMoney) > money && (
          <div className="error-transfer">
            <TextWrapper label="transfer.moneyValid"/>
          </div>
        )}
         {limitSelector.limitDay < Number(formData.howMuchMoney) && (
          <div className="error-transfer">
            <TextWrapper label="transfer.exceedLimit"/>
          </div>
        )}
      </Box>
      <button type="submit">
        {loaderSelector ? <MiniLoader /> : t('transfer.send')}
      </button>
    </Box>
  );
};

export default React.memo(FormTransfer);
