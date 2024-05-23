import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { useAppDispatch } from "store/hooks";
import TextWrapper from "components/Contents/TextWrapper";
import { IConnectAccount } from "store/SubAccount/subAccountInterface";
import {
  separateAccount,
} from "store/SubAccount/subAccountThunk";
import { useSelector } from "react-redux";
import {
  selectorNewSubAccounts,
  selectorNewSubAccountsMessage,
  selectorSubAccountsLoading,
  selectorSubError,
} from "store/SubAccount/subAccountSelector";
import Loader from "components/Loader/Loader";
import { refreshAccount } from "store/SubAccount/subAccountSlice";
import { useTranslation } from "react-i18next";

const initialValues = {
  login: "",
  password: "",
};

interface IProps {
  setOffer: Function;
}

const SeparateAccount = ({ setOffer }: IProps) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(initialValues);
  const [account, setAccount] = useState<IConnectAccount>(initialValues);
  const loadingSelector = useSelector(selectorSubAccountsLoading);
  const subAccountsSelector = useSelector(selectorNewSubAccounts);
  const errorSelector = useSelector(selectorSubError);
  const messageSelector = useSelector(selectorNewSubAccountsMessage);
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const onSubmit = async ({ login, password }: IConnectAccount) => {
    setError(false);
    setErrorMessage(initialValues);
    const errors = {
      login: "",
      password: "",
    };

    if (login.length <= 10) {
      setError(true);
      errors.login = "settings.incorrectData";
    }
    if (password.length <= 3) {
      setError(true);
      errors.password = "settings.incorrectData";
    }
    setErrorMessage(errors);

    if (!errors.login && !errors.password) {
      dispatch(separateAccount({ login, password }));
      setErrorMessage(initialValues);
      setError(false);
      setOffer(false)
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const refresh = () => {
    dispatch(refreshAccount());
  };
  if (errorSelector) {
    return (
      <Box className="connect-account">
        <Box className="error-message">
          <div>Error: {messageSelector}</div>
          <Button
            className="btn-change"
            variant="contained"
            onClick={() => refresh()}
          >
            <TextWrapper label="Dodaj ponownie" />
          </Button>
        </Box>
      </Box>
    );
  }

  if (loadingSelector) {
    return <Loader text="settings.checking"></Loader>;
  }

  return (
    <Box className="connect-account">
      {subAccountsSelector?.accountId ? (
        <Box sx={{ textAlign: "center" }}>
          <TextWrapper label="Dodano nowe konto" Selector="div" />
          <TextWrapper
            Selector="div"
            label={`Nr: ${subAccountsSelector.accountId}`}
          ></TextWrapper>
          <Button
            className="btn-change"
            variant="contained"
            onClick={() => refresh()}
          >
            <TextWrapper label="settings.addAgain" />
          </Button>
        </Box>
      ) : (
        <Form
          onSubmit={onSubmit}
          initialValues={account}
          render={({ handleSubmit }): JSX.Element => (
            <form onSubmit={handleSubmit}>
              <Box
                className={`box ${
                  errorMessage.login && error ? "errorMessage" : ""
                }`}
              >
                <TextWrapper label="settings.enterLogin" Selector="label" />
                <Field
                  className={error ? "input-error" : "new-limit"}
                  name="login"
                  onChange={(e: any) => handleChange(e)}
                  component="input"
                  type="email"
                  placeholder="Login"
                />
              </Box>
              {error && errorMessage.login && (
                <Box className="error" style={{ marginBottom: "8px" }}>
                  <TextWrapper label={errorMessage.login} />
                </Box>
              )}
              <Box
                className={`box ${
                  errorMessage.password && error ? "errorMessage" : ""
                }`}
              >
                <TextWrapper label="settings.enterPassword" Selector="label" />
                <Field
                  className={error ? "input-error" : "new-limit"}
                  name="password"
                  onChange={(e: any) => handleChange(e)}
                  component="input"
                  type="password"
                  placeholder={t("settings.password")}
                />
              </Box>
              {error && errorMessage.password && (
                <Box className="error" style={{ marginBottom: "5px" }}>
                  <TextWrapper label={errorMessage.password} />
                </Box>
              )}
              <Button className="btn-change" type="submit" variant="contained">
                <TextWrapper label="settings.disconnect" />
              </Button>
            </form>
          )}
        />
      )}
    </Box>
  );
};

export default SeparateAccount;
