import { Box, Button, TextField } from "@mui/material";
import TextWrapper from "components/Contents/TextWrapper";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useAppDispatch } from "store/hooks";
import { loginChangePassword } from "store/Login/loginThunk";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector } from "react-redux";
import { selectorAuthLoading, selectorError } from "store/Login/loginSelector";
import Loader from "components/Loader/Loader";
import { useState } from "react";

type FormValues = {
  password: string;
  repeatPassword: string;
  code?: string;
};

const initialValue: FormValues = {
  password: "",
  repeatPassword: "",
};

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: initialValue,
  });
  const navigate = useNavigate();
  const loaderSelector = useSelector(selectorAuthLoading);
  const errorSelector = useSelector(selectorError);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const onSubmit = ({ password, repeatPassword }: FormValues) => {
    if (password !== repeatPassword) {
      setError(true);
    } else if (localStorage.getItem("emailCode") === null) {
      console.log("brak code");
    } else {
      setError(false);
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
    <>
      <Box className="login">
        <Box className="login__model">
          <div className="login__model--log">
            <LoginIcon />
            <TextWrapper label="Podaj kod wysłany na email"></TextWrapper>
          </div>
          <form
            className="login__model--form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Box className="login-box">
              <TextField
                className="login-input"
                label="Password"
                type="password"
                {...register("password", {
                  required: "Code is required",
                  minLength: 5,
                })}
                error={!!errors.code}
              />
            </Box>
            <Box className="login-box">
              <TextField
                className="login-input"
                label="Powtórz hasło"
                type="password"
                {...register("repeatPassword", {
                  required: "Code is required",
                  minLength: 5,
                })}
                error={!!errors.code}
              />
            </Box>
            <Box className="login-box">
              <Button
                className="login-input"
                type="submit"
                variant="contained"
                color="primary"
              >
                Zresetuj hasło
              </Button>
            </Box>
            {error && (
              <Box className="login-box">
                <div className="error">
                  <TextWrapper label="login.passwordDontMatch" />
                </div>
              </Box>
            )}
            {errorSelector && (
              <Box className="login-box">
                <div className="error">
                  <TextWrapper label={errorSelector} />
                </div>
              </Box>
            )}
          </form>
          <Box className="login-wrapper"></Box>
          <DevTool control={control} />
        </Box>
      </Box>
      {loaderSelector && <Loader text="Sprawdzam kod..." />}
    </>
  );
};

export default ChangePassword;
