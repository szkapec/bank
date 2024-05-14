import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import TextWrapper from "components/Contents/TextWrapper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useAppDispatch } from "store/hooks";
import { login } from "store/Login/loginThunk";
import { selectorAuthLoginUser } from "store/Login/loginSelector";
import { useSelector } from "react-redux";
import "./LoginStyle.scss";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

type FormValues = {
  email: string;
  password: string;
};

const initialFormData = {
  email: "",
  password: "",
};
const NewLogin = () => {
  const [userList, setUserList] = useState(0);
  const [user, setUser] = useState(initialFormData);
  const dispatch = useAppDispatch();
  const loginUserSelector = useSelector(selectorAuthLoginUser);

  const form = useForm<FormValues>({
    defaultValues: user,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = form;

  const onSubmit = (data: FormValues) => {
    console.log("data", data);
    dispatch(login(data));
    setUser(initialFormData);
  };

  const handleChange = (e: any) => {
    if (e.target.value === 10) {
      setValue("email", `${process.env.REACT_APP_USER_LOGIN_EMAIL}`, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("password", `${process.env.REACT_APP_USER_LOGIN_PASSWORD}`, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else if (e.target.value === 20) {
      setValue("email", `${process.env.REACT_APP_USER_LOGIN_EMAIL}`, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("password", `${process.env.REACT_APP_USER_LOGIN_PASSWORD}`, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    setUserList(e.target.value);
  };

  const helperTextErrorEmail = () => {
    if (errors?.email?.type === "required") return "This is required";
    else if (errors?.email?.type === "minLength") {
      return "Min length exceeded";
    } else return null;
  };

  const onChangeTool = (e: any) => {
    setUser({ ...user, [e.target.type]: e.target.value });
  };

  return (
    <Box className="login">
      <Box className="login__model">
        <div className="login__model--log">
          <LoginIcon />
          <TextWrapper label="Zaloguj się"></TextWrapper>
        </div>
        <FormControl className="login__model--form-control" fullWidth>
          <InputLabel>Zaloguj się na użytkownika testowego</InputLabel>
          <Select
            className="login-select"
            value={userList}
            label="User"
            onChange={handleChange}
          >
            <MenuItem disabled={true} value={0}>
              Wybierz
            </MenuItem>
            <MenuItem value={10}>Podstawowy</MenuItem>
            <MenuItem value={20}>Admin</MenuItem>
          </Select>
        </FormControl>
        <form
          className="login__model--form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Box className="login-box">
            <TextField
              className="login-input"
              label="Email"
              InputLabelProps={{ shrink: !!user.email || !!userList }}
              type="email"
              {...register("email", {
                required: "Email is required",
                minLength: 6,
              })}
              error={!!errors.email}
              helperText={helperTextErrorEmail()}
              onChange={onChangeTool}
            />
          </Box>
          <Box className="login-box">
            <TextField
              className="login-input"
              label="Password"
              InputLabelProps={{ shrink: !!user.password || !!userList }}
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              onChange={onChangeTool}
            />
          </Box>
          {loginUserSelector?.message && (
            <Box className="login-error">{loginUserSelector.message}</Box>
          )}
          <Box className="login-box">
            <Button
              className="login-input"
              type="submit"
              variant="contained"
              color="primary"
            >
              Dalej
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
            <TextWrapper label="login.rememberPassword" />
            <Link to="/identify">
              <TextWrapper label="login.remindPassword" />
            </Link>
          </Box>
        </Box>

        <DevTool control={control} />
      </Box>
    </Box>
  );
};

export default NewLogin;
