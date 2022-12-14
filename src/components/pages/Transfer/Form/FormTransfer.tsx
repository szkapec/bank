import React, { useEffect, useMemo, useState, useCallback } from "react";
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
    //loader
    if (dataRecipientSelector.length === 0) {
      dispatch(userRecipients());
    }
    setOpen(true);
  };

  return (
    <div className="container-transfer">
      {messageSelector && (
        <div className="error-transfer-global">{messageSelector}</div>
      )}
      <div className="container-transfer__transfer">
        <label htmlFor="text">Do odbiorcy</label>
        <input
          type="text"
          name="nameReceived"
          value={formData.nameReceived}
          placeholder="Wpisz nazw?? odbiorcy"
          onChange={handleChange}
        />
        <div
          className="container-transfer__address"
          onClick={() => handleModal()}
        >
          + Adresy zdefiniowane
        </div>
        <TableModal
          recipients={dataRecipientSelector}
          handleClose={handleClose}
          open={open}
          setData={setDataRecipients}
        />
      </div>
      <div className="container-transfer__transfer">
        <label htmlFor="numberReceived">Numer konta bankowego</label>
        <input
          className={error.errorAccount ? "error-input" : ""}
          type="number"
          value={formData.numberReceived}
          name="numberReceived"
          placeholder="Wpisz numer rachunku odbiorcy"
          onChange={handleChange}
        />
        {error.errorAccount && (
          <div className="error-transfer">Numer konta nie prawid??owy!</div>
        )}
      </div>
      <div className="container-transfer__transfer">
        <label htmlFor="body">Tyty?? przelewu</label>

        <input
          className={error.errorBody ? "error-input" : ""}
          type="text"
          value={formData.body}
          name="body"
          placeholder="Tre???? przelewu"
          onChange={handleChange}
        />
        {error.errorBody && (
          <div className="error-transfer">Tre???? przelewu nie prawid??owa!</div>
        )}
      </div>
      <div className="container-transfer__transfer">
        <label htmlFor="howMuchMoney">Kwota</label>
        <input
          className={error.errorMoney ? "error-input" : ""}
          type="number"
          value={formData.howMuchMoney}
          name="howMuchMoney"
          placeholder="Kwota przelewu"
          onChange={handleChange}
        />
        {error.errorMoney && (
          <div className="error-transfer">Nieprawid??owa warto????!</div>
        )}
        {Number(formData.howMuchMoney) > money && (
          <div className="error-transfer">
            Nie masz wystarczaj??cej ilo??ci pieni??dzy!
          </div>
        )}
         {limitSelector.limitDay < Number(formData.howMuchMoney) && (
          <div className="error-transfer">
            Przekroczony limit!
          </div>
        )}
      </div>
      <button type="submit">
        {loaderSelector ? <MiniLoader /> : "Wy??lij"}
      </button>
    </div>
  );
};

export default React.memo(FormTransfer);
