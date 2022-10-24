import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { selectorLoginUser } from "../../store/Login/loginSelector";
import { logOut } from "../../store/Login/loginSlice";
import { logOutTransfer } from "../../store/Transfer/transferSlice";
import "./Navbar.scss";

const Navbar = () => {
  const { user } = useSelector(selectorLoginUser) || {};
  const dispatch = useDispatch();

  return user?.email ? (
    <nav className="navbar">
      <NavLink
        to="/"
        className="page" 
        end
      >
        Strona Główna
      </NavLink>
      <NavLink
        to="/history"
        className="history"
      >
        Historia
      </NavLink>
      <NavLink
        to="/transfer"
        className="transfer"
      >
        Przelew
      </NavLink>
      {/* dodajesz odbiorce zdefiniowanego i miesieczne przelwy robisz */}
      <NavLink
        to="/recipients"
        className="recipients"
      >
        Płatności
      </NavLink>
      <NavLink
        to="/offers"
        className="offers"
      >
        Oferty i wnioski
      </NavLink>
      <NavLink
        to="/login"
        onClick={() => {
          dispatch(logOut())
          dispatch(logOutTransfer())
        }}
      >
        Wyloguj
        <i className="fas fa-sign-out-alt"></i>
      </NavLink>
    </nav>
  ) : (
    <nav className="navbar">
      <NavLink
        to="/"
        className="page"
        end
      >
        Strona Główna
      </NavLink>
      <NavLink
        to="/login"
        className="login"
      >
        Zaloguj
      </NavLink>
      <NavLink
        to="/register"
        className="register"
      >
        Zarejestruj
      </NavLink>
    </nav>
  );
};

export default Navbar;
