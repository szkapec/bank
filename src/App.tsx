import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Test from "./components/Test";
import { AuthRoute, AuthRouteLogin } from "./util/AuthRoute.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Register from "./components/Register/Register.tsx";
import Login from "./components/Login/Login";
import History from "./components/pages/History/History.tsx";
import Transfer from "./components/pages/Transfer/Transfer.tsx";
import { userLoaded } from "./store/Login/loginThunk.tsx";
import { useDispatch, useSelector } from "react-redux";
import { selectorLoginTransferUser } from "./store/Login/loginSelector.ts";

const App = () => {
  const dispatch = useDispatch();
  const selectIdUser = useSelector(selectorLoginTransferUser);

  useEffect(() => {
    console.log("testttt :>> ", selectIdUser);
    dispatch(userLoaded());
  }, []);

  return (
    <>
      <BrowserRouter>
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
