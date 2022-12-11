import { useState } from "react";
import Logo from "assets/Logo";
import Loader from "components/Loader/Loader";
import { Field, Form } from "react-final-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAppDispatch } from "store/hooks";
import { selectorAuthLoading } from "store/Login/loginSelector";
import { remindPassword } from "store/Login/loginThunk";

const initialValue = {
  email: "",
};

const EmailIdentify = () => {
  const navigate = useNavigate();
  const [errorForm, setErrorForm] = useState(false);
  const dispatch = useAppDispatch();
  const loaderSelector = useSelector(selectorAuthLoading);

  const onSubmit = (value: any) => {
    if (value.email.length <= 4) {
      setErrorForm(true);
    } else {
      setErrorForm(false);

      dispatch(remindPassword({ value, navigate }));
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
            <h2>Zresetuj hasło</h2>
            <div className="identify">
              <label>Podaj email</label>
              <Field
                className={errorForm ? "input-error" : "lastName"}
                name="email"
                component="input"
                placeholder="Email"
              />
              {errorForm && <div className="error">Nieprawidłowy email</div>}
            </div>
            <button className="btn-login" type="submit">
              zresetuj hasło
            </button>
          </form>
        )}
      />
      {loaderSelector && <Loader text="Sprawdzam email..." />}
    </div>
  );
};

export default EmailIdentify;
