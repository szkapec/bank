import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAppDispatch } from "store/hooks";
import { selectorAuthLoading } from "store/Login/loginSelector";
import { loginRemindCode } from "store/Login/loginThunk";
import Logo from "assets/Logo";
import Loader from "components/Loader/Loader";
import TextWrapper from "components/Contents/TextWrapper";

interface ISubmit {
  code: string;
}

const initialValue = {
  code: "",
};

const RemindPassword = () => {
  const [errorForm, setErrorForm] = useState(false);
  const [time, setTime] = useState(300);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loaderSelector = useSelector(selectorAuthLoading);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevState) => prevState - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (time < 0) {
    navigate("/login");
  }

  const onSubmit = (value: ISubmit) => {
    if (value.code.length <= 4) {
      setErrorForm(true);
    } else {
      setErrorForm(false);
      dispatch(loginRemindCode({ code: value.code, navigate }));
    }
  };

  return (
    <div className="container-register identify-data">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValue}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="container-register__form">
            <Logo />
            <TextWrapper label="login.enterCodeByEmail" Selector="h2" />
            <div className="identify">
              <TextWrapper label="login.enterCode" />
              <Field
                className={errorForm ? "input-error" : "lastName"}
                name="code"
                component="input"
                placeholder="code"
              />
              {errorForm && (
                <div className="error">
                  <TextWrapper label="login.incorrectCode" />
                </div>
              )}
            </div>
            <button className="btn-login" type="submit">
              <TextWrapper label="login.resetPassword" />
            </button>

            <div className="timer">
              <TextWrapper label="login.timeLeft" /> <b>{time}</b>{" "}
              <TextWrapper label="login.seconds" />
            </div>
          </form>
        )}
      />
      {loaderSelector && <Loader text="Sprawdzam kod..." />}
    </div>
  );
};

export default RemindPassword;
