import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectorAuthLoginUser,
  selectorLoginUserError,
} from "store/Login/loginSelector.ts";
import { login } from "store/Login/loginThunk.tsx";
import { Link } from "react-router-dom";
import "./Login.scss";
import Logo from "../../../assets/Logo";

const initialFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const loginUserSelector = useSelector(selectorAuthLoginUser);
  const loginErrorSelector = useSelector(selectorLoginUserError);
  console.log('DELETEDDD!! :>> ', );
  localStorage.removeItem("emailChange");
  localStorage.removeItem("emailCode");

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { email, password } = formData;
    if (password.length <= 3) {
      return false;
    }
    if (email.length <= 3) {
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const val = validate();
    val && dispatch(login(formData));
    setFormData(initialFormData);
  };

  return (
    <div className="container-login">
      <Logo />
      <h2>Logowanie do CD-Bank</h2>
      <form
        className={loginErrorSelector ? "login-error" : "login"}
        onSubmit={onSubmit}
      >
        {loginUserSelector?.message ? (
          <div className="login-error-text">{loginUserSelector.message}</div>
        ) : (
          loginErrorSelector && (
            <div className="login-error-text">Niepoprawne dane logowania!</div>
          )
        )}
        <div className="container-login__data">
          <label htmlFor="email">Podaj Email</label>
          <br />
          <input
            name="email"
            type="email"
            placeholder="Podaj email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="container-login__data">
          <label htmlFor="password">Podaj hasło</label>
          <br />
          <input
            name="password"
            type="password"
            placeholder="Podaj hasło"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className="btn-login" type="submit">
          Wyślij
        </button>
      </form>

      <div className="label-wrapper-register">
        Nie masz jeszcze konta?
        <Link to="/register">
          <span> zarejestruj się</span>
        </Link>
      </div>
      <div className="label-wrapper-register">
        Nie pamiętasz hasła?
        <Link to="/identify">
          <span> Przypomnij hasło</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
