import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { useAppDispatch } from "store/hooks";
import "./ChangePassword.scss";
import { loginCheckPassword, loginSetNewPassword } from "store/Login/loginThunk";
import { selectorAuthLoginEmail } from "store/Login/loginSelector";
import { useSelector } from "react-redux";
import TextWrapper from "components/Contents/TextWrapper";

const initialValues = {
  password: "",
  newPassword: "",
  repeatNewPassword: "",
};

interface IProps {
  setOffer: Function;
}

const ChangePassword = ({ setOffer }: IProps) => {
  const [error, setError] = useState(false);
  const [changePassword, setChangePassword] = useState("");
  const [formPassword, setFormPassword] = useState(initialValues);

  const dispatch = useAppDispatch();
  const email = useSelector(selectorAuthLoginEmail);

  const checkOldPassword = async (password: string) => {
    const action: any = await dispatch(loginCheckPassword({ email, password }));
    if (action.payload?.message === email) {
      setChangePassword(password);
    } else {
      setChangePassword("");
      action.payload.error && setError(true);
    }
  };

  const setPassword = (newPassword: string) => {
    dispatch(
      loginSetNewPassword({ email, newPassword, oldPassword: changePassword })
    );
    setChangePassword("");
    setOffer(false);
  };

  const onSubmit = async ({
    password,
    newPassword,
    repeatNewPassword,
  }: any) => {
    setError(false);
    if (password) checkOldPassword(password);
    else if (newPassword === repeatNewPassword) setPassword(newPassword);
    else if (newPassword !== repeatNewPassword) setError(true);
    setFormPassword(initialValues);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormPassword({ ...formPassword, [e.target.name]: e.target.value });
  };

  return (
    <Box className="change-password">
      <Form
        onSubmit={onSubmit}
        initialValues={formPassword}
        render={({ handleSubmit }): JSX.Element => (
          <form onSubmit={handleSubmit}>
            {changePassword ? (
              <>
                <Box className="box">
                  <TextWrapper label="offer.newPassword" Selector="label" />
                  <Field
                    className={error ? "input-error" : "newPassword"}
                    name="newPassword"
                    onChange={(e: any) => handleChange(e)}
                    component="input"
                    type="password"
                    placeholder="Podaj nowe hasło"
                  />
                </Box>
                <Box className="box">
                  <TextWrapper label="offer.repeatPassword" Selector="label" />
                  <Field
                    className={error ? "input-error" : "repeatNewPassword"}
                    name="repeatNewPassword"
                    component="input"
                    onChange={(e: any) => handleChange(e)}
                    type="password"
                    placeholder="Powtórz hasło"
                  />
                </Box>
                {error && (
                  <Box className="error">
                    <TextWrapper label="offer.errorPasswordRepeat" />
                  </Box>
                )}
              </>
            ) : (
              <Box className="box">
                <TextWrapper label="offer.enterPassword" Selector="label" />
                <Field
                  className={error ? "input-error" : "password"}
                  name="password"
                  component="input"
                  onChange={(e: any) => handleChange(e)}
                  type="password"
                  placeholder="Podaj swoje hasło"
                />
                {error && (
                  <Box className="error">
                    <TextWrapper label="offer.errorPassword" />
                  </Box>
                )}
              </Box>
            )}
            <Button className="btn-change" type="submit" variant="contained">
              <TextWrapper label="offer.button" />
            </Button>
          </form>
        )}
      />
    </Box>
  );
};

export default ChangePassword;
