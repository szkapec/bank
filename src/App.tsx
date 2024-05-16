import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthRoute, AuthRouteAdmin, AuthRouteLogin } from "./util/AuthRoute";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/pages/Register/Register";
import History from "./components/pages/History/History";
import Transfer from "./components/pages/Transfer/Transfer";
import "./App.scss";
import GlobalLoader from "./components/Loader/GlobalLoader";
import Recipients from "./components/pages/Recipients/RecipientsWrapper";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "components/Events/Settings";
import AdminWrapper from "components/pages/Admin/AdminWrapper";
import Offers from "components/pages/Offers/Offers";
import HomeWrapper from "components/pages/Home/HomeWrapper";
import NewLogin from "components/pages/Login/Login";
import EmailIdentify from "components/pages/Login/ChangePassword/EmailIdentify";
import RemindPassword from "components/pages/Login/ChangePassword/RemindPassword";
import ChangePassword from "components/pages/Login/ChangePassword/ChangePassword";
import TopNavbar from "components/Navbar/TopNavbar";

const App = () => {
  const [load, setLoad] = useState(true);
  const interval = setTimeout(() => loader(), 1500);

  const loader = () => {
    setLoad(false);
    clearInterval(interval);
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const connectAccounts = [
    {
      accountId: "6644aaf9cb4c16a63cc76dda",
      accountName: "general",
      accountEmail: "account@o2.pl",
      _id: "6644ab11cb4c16a63cc76de1", //
    },
    {
      accountId: "663d1f78cb8308abcb79a8c7",
      accountName: "general",
      accountEmail: "mateusz211@o2.pl",
      _id: "66449c00cb4c16a63cc76cf8", //
    },
    {
      accountId: "663c90987ea71bcea6700b4d",
      accountName: "general",
      accountEmail: "mati@o2.pl",
      _id: "6644612a1827c32da2b3c368", //
    },
    {
      accountId: "664461091827c32da2b3c359",
      accountName: "general",
      accountEmail: "mati2@o2.pl",
      _id: "6644612a1827c32da2b3c369", //
    },
  ];

  const connectAccounts2 = [
    {
      accountId: "664461091827c32da2b3c359",
      accountName: "general",
      accountEmail: "mati2@o2.pl",
      _id: "6644612a1827c32da2b3c369",
    },
    {
      accountId: "663d1f78cb8308abcb79a8c7",
      accountName: "general",
      accountEmail: "mati2@o2.pl",
      _id: "6644612a1827c32da2b3c361", //
    },
    {
      accountId: "663c90987ea71bcea6700b4d",
      accountName: "general",
      accountEmail: "mati@o2.pl",
      _id: "6644612a1827c32da2b3c368",
    },
  ];

  const newTable = [...connectAccounts, ...connectAccounts2];

  console.log("newTable", newTable);
  console.log("connectAccounts2", connectAccounts2);


  const mapFromColors: any = new Map(newTable.map((c:any) => {
    console.log('ccccc', c)
    return [c._id, c]
  }));
  console.log('mapFromColors', mapFromColors)
  const uniqueColors = [...mapFromColors.values()];
  console.log('uniqueColors', uniqueColors);
  return (
    <>
      <BrowserRouter>
        <React.StrictMode>
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
            <AuthRouteLogin exact path="/offers" component={Offers} />
            <AuthRouteAdmin exact path="/admin" component={AdminWrapper} />
            <Settings />
          </QueryClientProvider>
          <ToastContainer autoClose={2000} />
        </React.StrictMode>
      </BrowserRouter>
    </>
  );
};

export default App;
