import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthRoute, AuthRouteAdmin, AuthRouteLogin } from "./util/AuthRoute";
import Navbar from "./components/Navbar/Navbar";
import Register from "pages/Register/Register";
import History from "pages/History/History";
import Transfer from "pages/Transfer/Transfer";
import "./App.scss";
import GlobalLoader from "./components/Loader/GlobalLoader";
import Recipients from "pages/Recipients/RecipientsWrapper";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "components/Events/Settings";
import AdminWrapper from "pages/Admin/AdminWrapper";
import HomeWrapper from "pages/Home/HomeWrapper";
import NewLogin from "pages/Login/Login";
import EmailIdentify from "pages/Login/ChangePassword/EmailIdentify";
import RemindPassword from "pages/Login/ChangePassword/RemindPassword";
import ChangePassword from "pages/Login/ChangePassword/ChangePassword";
import TopNavbar from "components/Navbar/TopNavbar";
import { useSelector } from "react-redux";
import { selectorLanguage } from "store/Login/loginSelector";
import { initTranslation } from "util/initTranslation";
import SettingsPage from "pages/Settings/SettingsPage";

const App = () => {
  const [load, setLoad] = useState(true);
  const interval = setTimeout(() => loader(), 1500);

  const loader = () => {
    setLoad(false);
    clearInterval(interval);
  };

  const languageSelector = useSelector(selectorLanguage);
  initTranslation(languageSelector);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            {load ? <GlobalLoader /> : null}
            <TopNavbar />
            <Navbar />
            <AuthRouteLogin exact path="/" component={HomeWrapper} />
            <AuthRoute exact path="/Login" component={NewLogin} />
            <AuthRoute exact path="/register" component={Register} />
            <AuthRoute exact path="/identify" component={EmailIdentify} />
            <AuthRoute
              exact
              path="/remind-password"
              component={RemindPassword}
            />
            <AuthRoute
              exact
              path="/change-password"
              component={ChangePassword}
            />
            <AuthRouteLogin exact path="/history" component={History} />
            <AuthRouteLogin exact path="/transfer" component={Transfer} />
            <AuthRouteLogin exact path="/recipients" component={Recipients} />
            <AuthRouteLogin exact path="/settings" component={SettingsPage} />
            <AuthRouteAdmin exact path="/admin" component={AdminWrapper} />
            <Settings />
          </QueryClientProvider>
          <ToastContainer autoClose={2000} />
      </BrowserRouter>
    </>
  );
};

export default App;
