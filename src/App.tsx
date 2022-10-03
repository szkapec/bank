import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Test from './components/Test';
import { AuthRoute, AuthRouteLogin } from './util/AuthRoute';
import Navbar from './components/Navbar/Navbar.tsx';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <AuthRouteLogin exact path="/" component={Test}/>
        <AuthRoute exact path="/Login" component={Login}/>
        <AuthRoute exact path="/register" component={Register}/>
        <AuthRouteLogin exact path="/history" component={Test} />
        <AuthRouteLogin exact path="/transfer" component={Test} />
      </BrowserRouter>
    </>
  )
}

export default App
