import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useAppDispatch } from "store/hooks";
import { loginChangeLanguage } from "store/Login/loginThunk";
import { selectorLimit, selectorPermision } from "store/Login/loginSelector";
import { useSelector } from "react-redux";
import TextWrapper from "components/Contents/TextWrapper";
import { EUserPermission, IUserLimit } from "store/Login/loginInterface";
import "./ChangeLimit.scss";
import {
  checkPermissions,
  permissionForChangeLimitTransaction,
} from "util/permission/permission";

const initialValues: IUserLimit = {
  limitDay: 50,
  limitMouth: 500,
  limitFull: 250,
};

interface IProps {
  setOffer: Function;
}

const ChangeLimit = ({ setOffer }: IProps) => {
  const [error, setError] = useState(false);
  const [errorLimit, setErrorLimit] = useState(false);
  const [formLimit, setFormLimit] = useState<IUserLimit>(initialValues);
  const limitSelector = useSelector(selectorLimit);
  const permissionSelector = useSelector(selectorPermision);

  const dispatch = useAppDispatch();

  const onSubmit = async ({ limitDay, limitMouth, limitFull }: IUserLimit) => {
    setError(false);
    if (limitDay || limitMouth || limitFull) {
      dispatch(loginChangeLanguage({ limitDay, limitMouth, limitFull }));
      setFormLimit(initialValues);
      setOffer(false);
    }
  };

  useEffect(() => {
    setFormLimit(limitSelector);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const checkValue = permissionForChangeLimitTransaction(
      permissionSelector,
      e.target.value,
      e.target.name
    );

    if (checkValue) {
      setFormLimit({ ...formLimit, [e.target.name]: e.target.value });
      setErrorLimit(false);
    } else {
      setErrorLimit(true);
    }
  };
  
  return (
    <Box className="change-limit">
      <Form
        onSubmit={onSubmit}
        initialValues={formLimit}
        render={({ handleSubmit }): JSX.Element => (
          <form onSubmit={handleSubmit}>
            <Box className="box">
              <TextWrapper label="Limit dzienny" Selector="label" />
              <Field
                className={error ? "input-error" : "new-limit"}
                isVisible="false"
                name="limitDay"
                disabled={checkPermissions(
                  permissionSelector,
                  EUserPermission.DONE
                )}
                onChange={(e: any) => handleChange(e)}
                component="input"
                type="number"
                placeholder="Limit dzienny"
              />
            </Box>
            <Box className="box">
              <label htmlFor="fors"></label>
              <TextWrapper label="Limit miesięczny" Selector="label" />
              <Field
                className={error ? "input-error" : "new-limit"}
                name="limitMouth"
                onChange={(e: any) => handleChange(e)}
                disabled={checkPermissions(
                  permissionSelector,
                  EUserPermission.DONE
                )}
                component="input"
                type="number"
                placeholder="Limit miesięczny"
              />
            </Box>
            <Box className="box">
              <TextWrapper label="Max wartość przelewu" Selector="label" />
              <Field
                className={error ? "input-error" : "new-limit"}
                name="limitFull"
                onChange={(e: any) => handleChange(e)}
                component="input"
                disabled={checkPermissions(
                  permissionSelector,
                  EUserPermission.USER
                )}
                type="number"
                placeholder="Maksymalna wartość przelewu"
              />
            </Box>
            {error && (
              <Box className="error">
                <TextWrapper label="Nieprawidłowy limit" />
              </Box>
            )}
            {errorLimit && (
              <Box className="error">
                <TextWrapper label="Nie masz uprawnień aby zwiększyć limit" />
              </Box>
            )}
            <Button className="btn-change" type="submit" variant="contained">
              <TextWrapper label="Wyślij" />
            </Button>
          </form>
        )}
      />
    </Box>
  );
};

export default ChangeLimit;
