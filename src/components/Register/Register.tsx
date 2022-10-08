import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectorLoginUser,
  selectorLoginUserError,
} from "../../store/Login/loginSelector.ts";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../../store/Login/loginThunk.tsx";

// interface IText {
//   email: string;
//   password: string;
// }

const initialFormData = {
  name: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const loginUserSelector = useSelector(selectorLoginUser);
  const loginErrorSelector = useSelector(selectorLoginUserError);

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    console.log(`e`, e);
    e.preventDefault();
    dispatch(register(formData));
    setFormData(initialFormData);
  };

  return (
    <div>
      <form
        className={loginErrorSelector ? "login-error" : "login"}
        onSubmit={onSubmit}
      >
        <div>
          <label htmlFor="name">Podaj Imię</label>
          <br />
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Podaj nazwisko</label>
          <br />
          <input
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          {/* To finalnie trzeba bedzie wyjebać */}
          <label htmlFor="userName">Podaj login???</label>
          <br />
          <input
            name="userName"
            type="text"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Podaj email</label>
          <br />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Podaj hasło</label>
          <br />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {loginErrorSelector && <div>Niepoprawne dane rejstracyjne!</div>}
        <button type="submit">Wyślij</button>
      </form>
    </div>
  );
};

export default Register;

const StyledError = styled.form`
  color: ${(props) =>
    props.errorsy ? console.log(`errorsss`, props) : "black"};
`;

const StyledErrorInput = styled.input`
  border: ${(error) => (error ? "1px solid red" : "1px solid black")};
`;
