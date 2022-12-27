import { useState } from "react";
import Logo from "assets/Logo";
import Loader from "components/Loader/Loader";
import { Field, Form } from "react-final-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAppDispatch } from "store/hooks";
import { selectorAuthLoading } from "store/Login/loginSelector";
import { loginRemindPassword } from "store/Login/loginThunk";
import { Box } from "@mui/material";
import TextWrapper from "components/Contents/TextWrapper";
import { t } from "i18next";

interface ISubmit {
  email: string;
}

const initialValue = {
  email: "",
};

const EmailIdentify = () => {
  const navigate = useNavigate();
  const [errorForm, setErrorForm] = useState(false);
  const dispatch = useAppDispatch();
  const loaderSelector = useSelector(selectorAuthLoading);

  const onSubmit = (value: ISubmit) => {
    if (value.email.length <= 4) {
      setErrorForm(true);
    } else {
      setErrorForm(false);
      dispatch(loginRemindPassword({ value, navigate }));
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
            <TextWrapper label="login.resetPassword" Selector="h2" />
            <Box className="identify">
              <TextWrapper label="login.enterEmail" />
              <Field
                className={errorForm ? "input-error" : "lastName"}
                name="email"
                component="input"
                placeholder="Email"
              />
              {errorForm && (
                <Box className="error">
                  <TextWrapper label="login.invalidEmail" />
                </Box>
              )}
            </Box>
            <button className="btn-login" type="submit">
              <TextWrapper label="login.resetPassword" />
            </button>
          </form>
        )}
      />
      {loaderSelector && <Loader text={t('login.checkingEmail')} />}
    </Box>
  );
};

export default EmailIdentify;
