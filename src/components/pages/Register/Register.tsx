import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { register } from "store/Login/loginThunk";
import { useAppDispatch } from "store/hooks";
import "./Register.scss";
import Logo from "../../../assets/Logo";
import { Box } from "@mui/material";

interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface IErrorForm {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  password: boolean;
}
const initialError = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
};

const initialValue = {
  firstName: "",
  lastName: "",
  email: "",
  country: "pl_PL",
  account: "general",
  password: "",
  repeatPassword: "",
};

const Register = () => {
  const dispatch = useAppDispatch();

  const [errorForm, setErrorForm] = useState<IErrorForm>(initialError);

  const onSubmit = (values: any) => {
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
            <h2>Zarejestruj się do CD-Bank</h2>
            <Box>
              <label>Podaj Imię</label>
              <Field
                className={errorForm.firstName ? "input-error" : "firstName"}
                name="firstName"
                component="input"
                placeholder="Imię"
              />
              {errorForm.firstName && <div className="error">Podaj imię</div>}
            </Box>
            <Box>
              <label>Podaj nazwisko</label>
              <Field
                className={errorForm.lastName ? "input-error" : "lastName"}
                name="lastName"
                component="input"
                placeholder="Nazwisko"
              />
              {errorForm.lastName && (
                <div className="error">Podaj nazwisko</div>
              )}
            </Box>
            <Box>
              <label>Podaj Email</label>
              <Field
                className={errorForm.email ? "input-error" : "email"}
                name="email"
                type="email"
                component="input"
                placeholder="Email"
              />
              {errorForm.email && (
                <div className="error">Niepoprawny email!</div>
              )}
            </Box>
            <div>
              <label>Płeć</label>
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
              Kobieta
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
              Mężczyzna
            </label>
            <Box>
              <label>Kraj pochodzenia</label>
              <Field name="country" component="select">
                <option value="pl_PL">Polska</option>
                <option value="en_EN">Anglia</option>
                <option value="gr_GR">Niemcy</option>
                <option value="sp_SP">Hiszpania</option>
              </Field>
            </Box>
            <Box>
              <label>Rodzaj konta</label>
              <Field name="account" component="select">
                <option value="general">Konto bankowe (osobiste)</option>
                <option value="saving">Oszczędnościowe</option>
                <option value="credit">Kredytowe</option>
                <option value="investment">Inwestycyjne</option>
              </Field>
            </Box>
            <Box>
              <label>Hasło</label>
              <Field
                className={errorForm.password && "input-error"}
                name="password"
                type="password"
                component="input"
                placeholder="Hasło"
              />
            </Box>
            {errorForm.password && (
              <Box className="error">Hasło nie pasuje do siebie!</Box>
            )}
            <Box>
              <label>Powtórz hasło</label>
              <Field
                className={errorForm.password && "input-error"}
                name="repeatPassword"
                type="password"
                component="input"
                placeholder="Powtórz hasło"
              />
            </Box>
            <button className="btn-login" type="submit">
              Zarejestruj się
            </button>
          </form>
        )}
      />
    </section>
  );
};

export default Register;
