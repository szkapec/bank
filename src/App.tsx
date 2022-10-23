import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Test from "./components/Test";
import { AuthRoute, AuthRouteLogin } from "./util/AuthRoute";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import History from "./components/pages/History/History";
import Transfer from "./components/pages/Transfer/Transfer";
import { userLoaded } from "./store/Login/loginThunk";
import { useAppDispatch } from "./store/hooks";
import "./App.scss";
import GlobalLoader from "./components/Loader/GlobalLoader";
import Payments from "./components/pages/Payments/Payments";

const App = () => {
  const dispatch = useAppDispatch();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    dispatch(userLoaded());
  }, []);

  const interval = setTimeout(() => loader(), 1500);

  const loader = () => {
    setLoad(false);
    clearInterval(interval);
  };

  return (
    <>
      <BrowserRouter>
        {load ? <GlobalLoader /> : null}
        <Navbar />
        <AuthRouteLogin exact path="/" component={Test} />
        <AuthRoute exact path="/Login" component={Login} />
        <AuthRoute exact path="/register" component={Register} />
        <AuthRouteLogin exact path="/history" component={History} />
        <AuthRouteLogin exact path="/transfer" component={Transfer} />
        <AuthRouteLogin exact path="/pay" component={Payments} />
      </BrowserRouter>
    </>
  );
};

export default App;
