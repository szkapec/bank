import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../store/Login/loginThunk.tsx';
import { useTranslation } from 'react-i18next';
import jwtDecode from 'jwt-decode';


const Test = () => {

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const click = (e, name) => {
    e.preventDefault();
    // console.log(`name`, name)
    // dispatch(searchUsers())
    // dispatch(newRedcer(name))
    dispatch(login({email: 'email21212113', password: 'password'}))
    // dispatch(logout({
    //   email: "email21212113",
    //   password: "password"
    // }))
   
  }

  const token = () => {
    console.log(`localStorage.getItem('jwtToken')`, localStorage.getItem('jwtToken'))


    if(localStorage.getItem('jwtToken')){
      const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))
      console.log(`decodedToken`, decodedToken)
      console.log(`new Date().getTime() / 1000`, new Date().getTime() / 1000)
      const now = new Date().getTime() / 1000; // Więc podziel przez 1000, aby uzyskać sekundy
      
      if (now > decodedToken.exp) {
        // wygasłł token
        // removeIdToken();
        console.log(`WYGASL!!!`, )
        return null;
      } else {
        console.log(`JESZCZE PRAWIDLOWY!!!`, )
      }

      if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem('jwtToken')
      } else {
        // initialState.user = decodedToken
      }
    }

  }

  const [name, setName] = useState('')
  return (
    <div>
      <h1>{t('Welcome to React')}</h1>
      <input type="text" onChange={(e) => setName(e.target.value)}/>
      <button onClick={(e) => click(e, name)}>CLICK</button>
      <button onClick={() => token()}>CLICKSPRAWDZENIE TOKENA</button>
    </div>
  )
}

export default (Test) 
