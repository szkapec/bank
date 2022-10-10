import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/hooks";
import { selectorAuthLoginUser } from "../../../store/Login/loginSelector";
import {
  selectorTransferError,
  selectorTransferMessage,
} from "../../../store/Transfer/transferSelector";
import { sendTransfer } from "../../../store/Transfer/transferThunk";
import { messageClear } from "../../../store/Transfer/transferSlice";
import "./Transfer.scss";

const Transfer = () => {
  const userDataSelector = useSelector(selectorAuthLoginUser);
  const messageSelector = useSelector(selectorTransferMessage);

  const dispatch = useAppDispatch();
  const { bankAccountNumber, id, email, money } = userDataSelector || {};
  const initialFormData = {
    body: "Przelew środków",
    howMuchMoney: "0",
    numberReceived: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const initialError = {
    errorAccount: false,
    errorMoney: false,
    errorBody: false,
  };
  const [error, setError] = useState(initialError);

  const useMessage = () => {
    dispatch(messageClear());
  };

  useEffect(() => {
    messageSelector && setTimeout(useMessage, 6000);
  }, [messageSelector]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = (event: any) => {
    const { body, howMuchMoney, numberReceived } = formData;
    event.preventDefault();
    let errorAccount,
      errorMoney,
      errorBody = false;

    if (numberReceived.length !== 20) errorAccount = true;
    else errorAccount = false;

    if (Number(howMuchMoney) <= 0) errorMoney = true;
    else errorMoney = false;

    if (body.length <= 3) errorBody = true;
    else errorBody = false;

    setError({
      errorAccount,
      errorMoney,
      errorBody,
    });

    if (!errorBody && !errorMoney && !errorAccount) {
      const submit = {
        body: formData.body,
        howMuchMoney: formData.howMuchMoney,
        numberReceived: formData.numberReceived,
        myIdUser: id,
        username: email,
        numberSend: bankAccountNumber,
      };
      dispatch(sendTransfer(submit));
    }
  };
  return (
    <section>
      <header className="my-account">
        <div className="container">
          <div>Z Rachunku</div>
          <div className="container__account">
            <div>EUROKONTO INTRO</div>
            <div>
              *{bankAccountNumber.substr(16, 4)} | {money}zł
            </div>
          </div>
        </div>
      </header>

      <form onSubmit={submit} className="form-transfer">
        <div className="container-transfer">
          {messageSelector && (
            <div className="error-transfer-global">{messageSelector}</div>
          )}
          <div className="container-transfer__transfer">
            <label htmlFor="text">Do odbiorcy</label>
            <input
              type="text"
              name="text"
              placeholder="Wpisz nazwę odbiorcy"
              onChange={handleChange}
            />
            <div className="container-transfer__address">+ Adres odbiorcy</div>
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
              <div className="error-transfer">Numer konta nie prawidłowy!</div>
            )}
          </div>
          <div className="container-transfer__transfer">
            <label htmlFor="body">Tytył przelewu</label>

            <input
              className={error.errorBody ? "error-input" : ""}
              type="text"
              value={formData.body}
              name="body"
              placeholder="Treść przelewu"
              onChange={handleChange}
            />
            {error.errorBody && (
              <div className="error-transfer">
                Treść przelewu nie prawidłowa!
              </div>
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
              <div className="error-transfer">Nieprawidłowa wartość!</div>
            )}
            {Number(formData.howMuchMoney) > money && (
              <div className="error-transfer">
                Nie masz wystarczającej ilości pieniędzy!
              </div>
            )}
          </div>
          <button type="submit">Wyślij</button>
        </div>
      </form>
    </section>
  );
};

export default Transfer;
