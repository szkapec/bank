import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { selectorLoginUser } from "../store/Login/loginSelector.ts";

export const AuthRoute = (props) => {
  const { user } = useSelector(selectorLoginUser) || {};
  const { component: Component, path, ...rest } = props;

  return (
    <Routes>
      <Route
        {...rest}
        path={path}
        exact
        element={user?.email ? <Navigate to="/" /> : <Component />}
      />
    </Routes>
  );
};
export const AuthRouteLogin = (props) => {
  const { component: Component, path, ...rest } = props;
  const { user } = useSelector(selectorLoginUser) || {};

  return (
    <Routes>
      <Route
        {...rest}
        path={path}
        exact
        element={user?.email ? <Component /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};
