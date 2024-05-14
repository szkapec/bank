import { Box, Button, TextField } from "@mui/material";
import TextWrapper from "components/Contents/TextWrapper";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useAppDispatch } from "store/hooks";
import { loginRemindPassword } from "store/Login/loginThunk";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector } from "react-redux";
import { selectorAuthLoading } from "store/Login/loginSelector";
import Loader from "components/Loader/Loader";
import { t } from "i18next";

type FormValues = {
  email: string;
};

const EmailIdentify = () => {
  const dispatch = useAppDispatch();

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
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
    console.log("value", value);
    dispatch(loginRemindPassword({ value, navigate }));
  };

  const helperTextErrorEmail = () => {
    if (errors?.email?.type === "required") return "This is required";
    else if (errors?.email?.type === "minLength") {
      return "Min length exceeded";
    } else return null;
  };

  return (
    <>
      <Box className="login">
        <Box className="login__model">
          <div className="login__model--log">
            <LoginIcon />
            <TextWrapper label="Zresetuj hasło"></TextWrapper>
          </div>
          <form
            className="login__model--form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Box className="login-box">
              <TextField
                className="login-input"
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  minLength: 6,
                })}
                error={!!errors.email}
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
            <Box>
              <TextWrapper label="login.haveAnAccount" />
              <Link to="/register">
                <TextWrapper label="login.register" />
              </Link>
            </Box>
            <Box className="">
              <TextWrapper label="Wrócić do logowania?" />
              <Link to="/login">
                <TextWrapper label="Wróć do logowania" />
              </Link>
            </Box>
          </Box>

          <DevTool control={control} />
        </Box>
      </Box>
      {loaderSelector && <Loader text={t("login.checkingEmail")} />}
    </>
  );
};

export default EmailIdentify;
