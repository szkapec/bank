import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAppDispatch } from "store/hooks";
import { selectorAuthLoading } from "store/Login/loginSelector";
import { remindCode } from "store/Login/loginThunk";
import Logo from "assets/Logo";
import Loader from "components/Loader/Loader";

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

  const onSubmit = (value: any) => {
    if (value.code.length <= 4) {
      setErrorForm(true);
    } else {
      setErrorForm(false);
      dispatch(remindCode({ code: value.code, navigate }));
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
            <h2>Podaj kod wysłany na email</h2>
            <div className="identify">
              <label>Podaj kod</label>
              <Field
                className={errorForm ? "input-error" : "lastName"}
                name="code"
                component="input"
                placeholder="code"
              />
              {errorForm && <div className="error">Nieprawidłowy kod</div>}
            </div>
            <button className="btn-login" type="submit">
              zresetuj hasło
            </button>

            <div className="timer">
              Pozostało czasu: <b>{time}</b> sekund
            </div>
          </form>
        )}
      />
      {loaderSelector && <Loader text="Sprawdzam kod..." />}
    </div>
  );
};

export default RemindPassword;
