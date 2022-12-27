import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { useAppDispatch } from "store/hooks";
import TextWrapper from "components/Contents/TextWrapper";
import "./ConnectAccount.scss";
import { IConnectAccount } from "store/SubAccount/subAccountInterface";
import { newConnectAccount } from "store/SubAccount/subAccountThunk";
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

const ConnectAccount = ({ setOffer }: IProps) => {
  const [error, setError] = useState(false);
  const [account, setAccount] = useState<IConnectAccount>(initialValues);
  const loadingSelector = useSelector(selectorSubAccountsLoading);
  const subAccountsSelector = useSelector(selectorNewSubAccounts);
  const errorSelector = useSelector(selectorSubError);
  const messageSelector = useSelector(selectorNewSubAccountsMessage);
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const onSubmit = async ({ login, password }: IConnectAccount) => {
    setError(false);
    if (login && password) {
      dispatch(newConnectAccount({ login, password }));
      setAccount(initialValues);
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
    return <Loader text="offer.checking"></Loader>;
  }

  return (
    <Box className="connect-account">
      {subAccountsSelector?.accountId ? (
        <Box sx={{ textAlign: "center" }}>
          <TextWrapper label="Dodano nowe konto" Selector="div"/>
          <TextWrapper Selector="div">Nr: {subAccountsSelector.accountId}</TextWrapper>
          <Button
            className="btn-change"
            variant="contained"
            onClick={() => refresh()}
          >
            <TextWrapper label="offer.addAgain" />
          </Button>
        </Box>
      ) : (
        <Form
          onSubmit={onSubmit}
          initialValues={account}
          render={({ handleSubmit }): JSX.Element => (
            <form onSubmit={handleSubmit}>
              <Box className="box">
                <TextWrapper label="offer.enterLogin" Selector="label" />
                <Field
                  className={error ? "input-error" : "new-limit"}
                  isVisible="false"
                  name="login"
                  onChange={(e: any) => handleChange(e)}
                  component="input"
                  type="text"
                  placeholder="Login"
                />
              </Box>
              <Box className="box">
                <TextWrapper label="offer.enterPassword" Selector="label" />
                <Field
                  className={error ? "input-error" : "new-limit"}
                  name="password"
                  onChange={(e: any) => handleChange(e)}
                  component="input"
                  type="password"
                  placeholder={t('offer.password')}
                />
              </Box>
              {error && (
                <Box className="error">
                  <TextWrapper label="offer.invalidLimit" />
                </Box>
              )}
              <Button className="btn-change" type="submit" variant="contained">
                <TextWrapper label="offer.connect" />
              </Button>
            </form>
          )}
        />
      )}
    </Box>
  );
};

export default ConnectAccount;
