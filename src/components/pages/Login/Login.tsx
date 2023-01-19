import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectorAuthLoginUser,
  selectorLoginUserError,
} from "store/Login/loginSelector";
import { login } from "store/Login/loginThunk";
import { Link } from "react-router-dom";
import "./Login.scss";
import Logo from "assets/Logo";
import { ILoginToApp } from "store/Login/loginInterface";
import { useAppDispatch } from "store/hooks";
import TextWrapper from "components/Contents/TextWrapper";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

const initialFormData: ILoginToApp = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useAppDispatch();
  const loginUserSelector = useSelector(selectorAuthLoginUser);
  const loginErrorSelector = useSelector(selectorLoginUserError);
  const { t } = useTranslation();

  localStorage.removeItem("emailChange");
  localStorage.removeItem("emailCode");

  const [formData, setFormData] = useState<ILoginToApp>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
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

  const onSubmit = (e: any) => {
    e.preventDefault();
    const val = validate();
    val && dispatch(login(formData));
    setFormData(initialFormData);
  };

  return (
    <Box className="container-login">
      <Logo />
      <TextWrapper label="login.loginToBank" Selected="h2"/>
      <form
        className={loginErrorSelector ? "login-error" : "login"}
        onSubmit={onSubmit}
      >
        {loginUserSelector?.message ? (
          <div className="login-error-text">{loginUserSelector.message}</div>
        ) : (
          loginErrorSelector && (
            <div className="login-error-text">
              <TextWrapper label="login.loginInvalid"/>
            </div>
          )
        )}
        <div className="container-login__data">
          <label htmlFor="email">
            <TextWrapper label="login.enterEmail"/>
          </label>
          <br />
          <input
            name="email"
            type="email"
            className="email"
            placeholder={t('login.enterEmail')}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="container-login__data">
          <label htmlFor="password">
            <TextWrapper label="login.enterPassword"/>
          </label>
          <br />
          <input
            name="password"
            type="password"
            placeholder={t('login.enterPassword')}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className="btn-login" type="submit">
          <TextWrapper label="login.send"/>
        </button>
      </form>

      <div className="label-wrapper-register">
        <TextWrapper label="login.haveAnAccount"/>
        <Link to="/register">
        <TextWrapper label="login.register"/>
        </Link>
      </div>
      <div className="label-wrapper-register">
      <TextWrapper label="login.rememberPassword"/>
        <Link to="/identify">
        <TextWrapper label="login.remindPassword"/>
        </Link>
      </div>
    </Box>
  );
};

export default Login;
