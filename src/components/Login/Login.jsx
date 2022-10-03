import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectorLoginUser, selectorLoginUserError } from '../../store/Login/loginSelector.ts';
import { login } from '../../store/Login/loginThunk.tsx';
import styled from 'styled-components';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import './Login.scss'

// interface IText {
//   email: string;
//   password: string;
// }


const initialFormData = {
  email: '',
  password: ''
}


const Login = () => {

  const dispatch = useDispatch();
  const loginUserSelector = useSelector(selectorLoginUser)
  const loginErrorSelector= useSelector(selectorLoginUserError)


  console.log(`loginErrorSelector`, !!loginErrorSelector)
  console.log(`loginUserSelector`, loginUserSelector)
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }

  const onSubmit = (e) => {
    console.log(`e`, e)
    e.preventDefault();
    dispatch(login(formData))
    setFormData(initialFormData)

  }

  return (
    <div>
      <button onClick={() => {console.log(`formData`, formData)}}>Test  FormData</button>
      {console.log(`!!loginErrorSelector11`, !!loginErrorSelector)}
      <form className={loginErrorSelector ? 'login-error' : 'login'} onSubmit={onSubmit}>
        <div>
         
          <label htmlFor="email">Podaj Email</label><br/>
          <input name="email" type="email" value={formData.email} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="password">Podaj hasło</label><br/>
          <input name="password" type="password" value={formData.password} onChange={handleChange}/>
        </div>

         {loginErrorSelector && <div>Niepoprawne dane logowania!</div>}
        <button type="submit">Wyślij</button>
      </form>

      <div className="label-wrapper-register">
        Nie masz jeszcze konta?<Link to="/register">
          <span> zarejestruj się</span>
        </Link>
      </div>
    </div>
  )
}

export default Login


const StyledError = styled.form`
  color: ${props => props.errorsy ? console.log(`errorsss`, props) : 'black'};
`;

const StyledErrorInput = styled.input`
  border: ${(error) => error ? '1px solid red' : '1px solid black'}
`