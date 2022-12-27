import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../store/Login/loginThunk';
import { useTranslation } from 'react-i18next';
import jwtDecode from 'jwt-decode';
import TestZone from './TestZone';

interface IDecodedToken {
  id: string;
  name: string;
  email: string;
  exp: number;
}

const Test = () => {

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const click = (event: any) => {
    event.preventDefault();
    // console.log(`name`, name)
    // dispatch(searchUsers())
    // dispatch(newRedcer(name))
    // dispatch(login({email: 'email21212113', password: 'password'}))
    // dispatch(logout({
    //   email: "email21212113",
    //   password: "password"
    // }))
   
  }

  const token = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      let decodedToken: IDecodedToken = jwtDecode(token);
      const now = new Date().getTime() / 1000;
      if (now > decodedToken.exp) {
        console.log(`WYGASL!!!`);
        return false;
      } else {
        console.log(`JESZCZE PRAWIDLOWY!!!`);
        return decodedToken?.id;
      }
    }
  }

  const [name, setName] = useState('')
  return (
    <div>
      <h1>{t('Welcome to React')}</h1>
      <input type="text" onChange={(e) => setName(e.target.value)}/>
      <button onClick={(e) => click(e)}>CLICK</button>
      <button onClick={() => token()}>CLICKSPRAWDZENIE TOKENA</button>
      <TestZone/>
    </div>
  )
}

export default (Test) 
