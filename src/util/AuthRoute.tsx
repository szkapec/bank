import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { selectorLoginUser } from "../store/Login/loginSelector";

export const AuthRoute = (props: any) => {
  const auth = useSelector(selectorLoginUser);
  const { component: Component, path, ...rest } = props;

  return (
    <Routes>
      <Route
        {...rest}
        path={path}
        exact
        element={auth?.user?.email ? <Navigate to="/" /> : <Component />}
      />
    </Routes>
  );
};
export const AuthRouteLogin = (props: any) => {
  const { component: Component, path, ...rest } = props;
  const auth = useSelector(selectorLoginUser);

  return (
    <Routes>
      <Route
        {...rest}
        path={path}
        exact
        element={auth?.user?.email ? <Component /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};
