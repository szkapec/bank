import { useState } from "react";
import Logo from "assets/Logo";
import Loader from "components/Loader/Loader";
import { Field, Form } from "react-final-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAppDispatch } from "store/hooks";
import { selectorAuthLoading } from "store/Login/loginSelector";
import { changePassword } from "store/Login/loginThunk";

const initialValue = {
  code: "",
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [errorForm, setErrorForm] = useState(false);
  const dispatch = useAppDispatch();
  const loaderSelector = useSelector(selectorAuthLoading);

  const onSubmit = ({ password, repeatPassword }: any) => {
    if (password !== repeatPassword) {
      setErrorForm(true);
    } else {
      setErrorForm(false);
      const submit = {
        email: localStorage.getItem("emailChange"),
        code: localStorage.getItem("emailCode"),
        password,
        navigate,
      };
      dispatch(changePassword(submit));
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
            <h2>Zmień hasło</h2>
            <div className="password">
              <label>Hasło</label>
              <Field
                className={errorForm ? "input-error" : "lastName"}
                name="password"
                component="input"
                placeholder="password"
              />
            </div>
            <div className="password">
              <label>Powtórz hasło</label>
              <Field
                className={errorForm ? "input-error" : "lastName"}
                name="repeatPassword"
                component="input"
                placeholder="Repeat password"
              />
              {errorForm && (
                <div className="error">Hasła się nie zgadzają!</div>
              )}
            </div>
            <button className="btn-login" type="submit">
              Zapisz
            </button>
          </form>
        )}
      />
      {loaderSelector && <Loader text="Zmieniam hasło..." />}
    </div>
  );
};

export default ChangePassword;
