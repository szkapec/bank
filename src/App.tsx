import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Test from "./components/Test";
import { AuthRoute, AuthRouteAdmin, AuthRouteLogin } from "./util/AuthRoute";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import History from "./components/pages/History/History";
import Transfer from "./components/pages/Transfer/Transfer";
import "./App.scss";
import GlobalLoader from "./components/Loader/GlobalLoader";
import Recipients from "./components/pages/Recipients/RecipientsWrapper";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "components/Settings/Settings";
import AdminWrapper from "components/pages/Admin/AdminWrapper";
import Offers from "components/pages/Offers/Offers";
import EmailIdentify from "components/pages/Login/ChangePassword/EmailIdentify";
import RemindPassword from "components/pages/Login/ChangePassword/RemindPassword";
import ChangePassword from "components/pages/Login/ChangePassword/ChangePassword";

const App = () => {
  const [load, setLoad] = useState(true);
  const interval = setTimeout(() => loader(), 1500);

  const loader = () => {
    setLoad(false);
    clearInterval(interval);
  };

  const queryClient = new QueryClient();

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {load ? <GlobalLoader /> : null}
          <Navbar />
          <AuthRouteLogin exact path="/" component={Test} />
          <AuthRoute exact path="/Login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <AuthRoute exact path="/identify" component={EmailIdentify} />
          <AuthRoute exact path="/remind-password" component={RemindPassword} />
          <AuthRoute exact path="/change-password" component={ChangePassword} />
          <AuthRouteLogin exact path="/history" component={History} />
          <AuthRouteLogin exact path="/transfer" component={Transfer} />
          <AuthRouteLogin exact path="/recipients" component={Recipients} />
          <AuthRouteLogin exact path="/offers" component={Offers} />
          <AuthRouteAdmin exact path="/admin" component={AdminWrapper} />
          <Settings />
        </QueryClientProvider>
        <ToastContainer autoClose={2000} />
      </BrowserRouter>
    </>
  );
};

export default App;
