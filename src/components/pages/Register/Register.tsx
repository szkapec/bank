import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { register } from "../../../store/Login/loginThunk";
import { useAppDispatch } from "../../../store/hooks";
import "./Register.scss";
import Logo from "../../../assets/Logo";

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
  country: "Poland",
  password: "",
  repeatPassword: "",
};

const Register = () => {
  const dispatch = useAppDispatch();

  const [ErrorForm, setErrorForm] = useState<IErrorForm>(initialError);

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
    <div className="container-register">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValue}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="container-register__form">
            <Logo />
            <h2>Zarejestruj się do CD-Bank</h2>
            <div>
              <label>Podaj Imię</label>
              <Field
                className={ErrorForm.firstName ? "input-error" : "firstName"}
                name="firstName"
                component="input"
                placeholder="Imię"
              />
              {ErrorForm.firstName && <div className="error">Podaj imię</div>}
            </div>
            <div>
              <label>Podaj nazwisko</label>
              <Field
                className={ErrorForm.lastName ? "input-error" : "lastName"}
                name="lastName"
                component="input"
                placeholder="Nazwisko"
              />
              {ErrorForm.lastName && (
                <div className="error">Podaj nazwisko</div>
              )}
            </div>
            <div>
              <label>Podaj Email</label>
              <Field
                className={ErrorForm.email ? "input-error" : "email"}
                name="email"
                type="email"
                component="input"
                placeholder="Email"
              />
              {ErrorForm.email && (
                <div className="error">Niepoprawny email!</div>
              )}
            </div>
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
            <div>
              <label>Kraj pochodzenia</label>
              <Field name="country" component="select">
                <option value="Poland">Polska</option>
                <option value="#England">Anglia</option>
                <option value="Germany">Niemcy</option>
                <option value="Spain">Hiszpania</option>
              </Field>
            </div>
            <div>
              <label>Hasło</label>
              <Field
                className={ErrorForm.password && "input-error"}
                name="password"
                type="password"
                component="input"
                placeholder="Hasło"
              />
            </div>
            {ErrorForm.password && (
              <div className="error">Hasło nie pasuje do siebie!</div>
            )}
            <div>
              <label>Powtórz hasło</label>
              <Field
                className={ErrorForm.password && "input-error"}
                name="repeatPassword"
                type="password"
                component="input"
                placeholder="Powtórz hasło"
              />
            </div>

            <button className="btn-login" type="submit">
              Zarejestruj się
            </button>
          </form>
        )}
      />
      )
    </div>
  )
};

export default Register;
