import { useState } from "react";
import Logo from "assets/Logo";
import Loader from "components/Loader/Loader";
import { Field, Form } from "react-final-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAppDispatch } from "store/hooks";
import { selectorAuthLoading } from "store/Login/loginSelector";
import { loginChangePassword } from "store/Login/loginThunk";
import TextWrapper from "components/Contents/TextWrapper";
import { Box } from "@mui/material";
import { IChangePassword } from "store/Login/loginInterface";
import { t } from "i18next";


const initialValue: IChangePassword = {
  password: "",
  repeatPassword: "",
  code: ""
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [errorForm, setErrorForm] = useState(false);
  const dispatch = useAppDispatch();
  const loaderSelector = useSelector(selectorAuthLoading);

  const onSubmit = ({ password, repeatPassword }: IChangePassword) => {
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
      dispatch(loginChangePassword(submit));
    }
  };

  return (
    <Box className="container-register identify-data">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValue}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="container-register__form">
            <Logo />
            <TextWrapper label="login.changePassword" Selector="h2" />
            <Box className="password">
              <TextWrapper label="login.password" />
              <Field
                className={errorForm ? "input-error" : "lastName"}
                name="password"
                component="input"
                placeholder="password"
              />
            </Box>
            <Box className="password">
              <TextWrapper label="login.repeatPassword" />
              <Field
                className={errorForm ? "input-error" : "lastName"}
                name="repeatPassword"
                component="input"
                placeholder={t('login.repeatPassword')}
              />
              {errorForm && (
                <div className="error">
                  <TextWrapper label="login.passwordDontMatch" />
                </div>
              )}
            </Box>
            <button className="btn-login" type="submit">
              <TextWrapper label="login.save" />
            </button>
          </form>
        )}
      />
      {loaderSelector && <Loader text={t('login.changeMyPassword')} />}
    </Box>
  );
};

export default ChangePassword;
