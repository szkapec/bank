import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks";
import { selectorAuthLoginUser } from "store/Login/loginSelector";
import { sendTransfer } from "store/Transfer/transferThunk";
import { subtractMoney } from "store/Login/loginSlice";
import FormTransfer from "./Form/FormTransfer";
import "./Transfer.scss";

export const initialFormData = {
  body: "Przelew środków",
  howMuchMoney: "0",
  numberReceived: "",
  nameReceived: "",
};

const Transfer = () => {
  console.log('Transfer', )
  const userDataSelector = useSelector(selectorAuthLoginUser);
  const dispatch = useAppDispatch();
  const { bankAccountNumber, id, email, money } = userDataSelector || {};
  const [formData, setFormData] = useState(initialFormData);

  const initialError = {
    errorAccount: false,
    errorMoney: false,
    errorBody: false,
  };

  const [error, setError] = useState(initialError);

  const onSubmit = async (event: React.SyntheticEvent) => {
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
      const form = {
        body: formData.body,
        howMuchMoney: formData.howMuchMoney,
        numberReceived: formData.numberReceived,
        myIdUser: id,
        email: email,
        numberSend: bankAccountNumber,
      };
     
      const sendTransferData = await dispatch(sendTransfer(form));
      if (!sendTransferData.payload.error) {
        setFormData(initialFormData)
        dispatch(subtractMoney(formData.howMuchMoney));
      }
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

      <form onSubmit={onSubmit} className="form-transfer">
        <FormTransfer
          error={error}
          formData={formData}
          setFormData={setFormData}
          money={money}
        />
      </form>
    </section>
  );
};

export default Transfer;
