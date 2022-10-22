import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Test from "./components/Test";
import { AuthRoute, AuthRouteLogin } from "./util/AuthRoute";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import History from "./components/pages/History/History";
import Transfer from "./components/pages/Transfer/Transfer";
import { userLoaded } from "./store/Login/loginThunk"
import { useAppDispatch } from "./store/hooks";
import './App.scss';
import GlobalLoader from "./components/Loader/GlobalLoader";

const App = () => {
  const dispatch = useAppDispatch();
  const [ time, setTime ] = useState(true)

  useEffect(() => {
    dispatch(userLoaded());
  }, []);

  const interval = setTimeout(() => loader(), 1500)

  const loader = () => {
    setTime(false)
    clearInterval(interval);
  }

  return (
    <>
      <BrowserRouter>
        {time ? <GlobalLoader/> : null}
        <Navbar />
        <AuthRouteLogin exact path="/" component={Test} />
        <AuthRoute exact path="/Login" component={Login} />
        <AuthRoute exact path="/register" component={Register} />
        <AuthRouteLogin exact path="/history" component={History} />
        <AuthRouteLogin exact path="/transfer" component={Transfer} />
      </BrowserRouter>
    </>
  );
};

export default App;
