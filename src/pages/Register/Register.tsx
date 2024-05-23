import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { register } from "store/Login/loginThunk";
import { useAppDispatch } from "store/hooks";
import "./Register.scss";
import Logo from "../../../assets/Logo";
import { Box } from "@mui/material";
import { IRegisterUser, IErrorFormRegister } from "store/Login/loginInterface";
import TextWrapper from "components/Contents/TextWrapper";

const initialError: IErrorFormRegister = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
};

const initialValue: IRegisterUser = {
  firstName: "",
  lastName: "",
  email: "",
  country: "pl_PL",
  account: "general",
  sex: "female",
  password: "",
  repeatPassword: "",
};

const Register = () => {
  const dispatch = useAppDispatch();

  const [errorForm, setErrorForm] = useState<IErrorFormRegister>(initialError);

  const onSubmit = (values: IRegisterUser) => {
    const { firstName, lastName, email, password, repeatPassword } = values;
    let errorFirst,
      errorLast,
      errorEmail,
      errorPassword = false;

    if (firstName?.length < 3) errorFirst = true;

    if (lastName?.length < 3) errorLast = true;

    if (email?.length < 3) errorEmail = true;

    if (password !== repeatPassword || password?.length < 3)
      errorPassword = true;

    if (!errorFirst && !errorLast && !errorEmail && !errorPassword) {
      dispatch(register(values));
      setErrorForm(initialError);
    } else {
      setErrorForm({
        firstName: !!errorFirst,
        lastName: !!errorLast,
        email: !!errorEmail,
        password: !!errorPassword,
      });
    }
  };

  return (
    <section className="container-register">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValue}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="container-register__form">
            <Logo />
            <TextWrapper label="" Selector="h2" />
            <h2>Register</h2>
            <Box>
              <label>Your name</label>
              <Field
                className={errorForm.firstName ? "input-error" : "firstName"}
                name="firstName"
                component="input"
                placeholder="Name"
              />
              {errorForm.firstName && <div className="error">Your name</div>}
            </Box>
            <Box>
              <label>Your surname</label>
              <Field
                className={errorForm.lastName ? "input-error" : "lastName"}
                name="lastName"
                component="input"
                placeholder="Surname"
              />
              {errorForm.lastName && (
                <div className="error">Your surname</div>
              )}
            </Box>
            <Box>
              <label>Enter Email</label>
              <Field
                className={errorForm.email ? "input-error" : "email"}
                name="email"
                type="email"
                component="input"
                placeholder="Email"
              />
              {errorForm.email && (
                <div className="error">Invalid email!</div>
              )}
            </Box>
            <div>
              <label>Sex</label>
            </div>
            <Field
              name="sex"
              component="input"
              type="radio"
              value="male"
              className="custom-control-input"
              id="male"
            />
            <label className="custom-control-label" htmlFor="male">
              Male
            </label>
            <Field
              name="sex"
              component="input"
              type="radio"
              value="female"
              className="custom-control-input"
              id="female"
            />
            <label className="custom-control-label" htmlFor="female">
              Female
            </label>
            <Box>
              <label>Country of origin</label>
              <Field name="country" component="select">
                <option value="pl_PL">Poland</option>
                <option value="en_EN">England</option>
                <option value="gr_GR">Germany</option>
                <option value="sp_SP">Spain</option>
              </Field>
            </Box>
            <Box>
              <label>Account type</label>
              <Field name="account" component="select">
                <option value="general">Bank account (personal)</option>
                <option value="saving">Savings</option>
                <option value="credit">Credit</option>
                <option value="investment">Investment</option>
              </Field>
            </Box>
            <Box>
              <label>Password</label>
              <Field
                className={errorForm.password && "input-error"}
                name="password"
                type="password"
                component="input"
                placeholder="Password"
              />
            </Box>
            {errorForm.password && (
              <Box className="error">Password does not match!</Box>
            )}
            <Box>
              <label>Repeat password</label>
              <Field
                className={errorForm.password && "input-error"}
                name="repeatPassword"
                type="password"
                component="input"
                placeholder="Repeat password"
              />
            </Box>
            <button className="btn-login" type="submit">
              Register
            </button>
          </form>
        )}
      />
    </section>
  );
};

export default Register;
