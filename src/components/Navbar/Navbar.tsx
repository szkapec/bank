import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { selectorLoginUser } from "../../store/Login/loginSelector";
import { logOut } from "../../store/Login/loginSlice";
import "./Navbar.scss";

const Navbar = () => {
  const { user } = useSelector(selectorLoginUser) || {};
  console.log("user :>> ", user);
  const dispatch = useDispatch();

  let activeStyle = {
    color: "red",
  };

  return user?.email ? (
    <nav className="navbar">
      <NavLink
        to="/"
        className="page" end
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Strona Główna
      </NavLink>
      <NavLink
        to="/history"
        className="history"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Historia
      </NavLink>
      <NavLink
        to="/transfer"
        className="transfer"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Transfer
      </NavLink>
      <NavLink
        to="/login"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        onClick={() => dispatch(logOut())}
      >
        Wyloguj
        <i className="fas fa-sign-out-alt"></i>
      </NavLink>
    </nav>
  ) : (
    <nav className="navbar">
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        to="/"
        className="page"
        end
      >
        Strona Główna
      </NavLink>
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        to="/login"
        className="login"
      >
        Zaloguj
      </NavLink>
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        to="/register"
        className="register"
      >
        Zarejestruj
      </NavLink>
    </nav>
  );
};

export default Navbar;
