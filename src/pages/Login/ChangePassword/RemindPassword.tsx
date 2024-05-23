import { Box, Button, TextField } from "@mui/material";
import TextWrapper from "components/Contents/TextWrapper";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useAppDispatch } from "store/hooks";
import {
  loginRemindCode,
} from "store/Login/loginThunk";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector } from "react-redux";
import { selectorAuthLoading } from "store/Login/loginSelector";
import Loader from "components/Loader/Loader";
import { useEffect, useState } from "react";

type FormValues = {
  code: string;
};

const RemindPassword = () => {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(300);
  const form = useForm<FormValues>({
    defaultValues: {
      code: "",
    },
  });
  const navigate = useNavigate();
  const loaderSelector = useSelector(selectorAuthLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const onSubmit = (value: FormValues) => {
    dispatch(loginRemindCode({ code: value.code, navigate }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevState) => prevState - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (time < 0) {
    navigate("/login");
  }

  const helperTextErrorEmail = () => {
    if (errors?.code?.type === "required") return "This is required";
    else if (errors?.code?.type === "minLength") {
      return "Min length exceeded";
    } else return null;
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
                label="Code"
                type="code"
                {...register("code", {
                  required: "Code is required",
                  minLength: 5,
                })}
                error={!!errors.code}
                helperText={helperTextErrorEmail()}
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
          </form>
          <Box className="login-wrapper">
            <div className="timer">
              <TextWrapper label="login.timeLeft" /> <b>{time}</b>{" "}
              <TextWrapper label="login.seconds" />
            </div>
          </Box>

          <DevTool control={control} />
        </Box>
      </Box>
      {loaderSelector && <Loader text="Sprawdzam kod..." />}
    </>
  );
};

export default RemindPassword;
