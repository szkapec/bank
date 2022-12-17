import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectorLoginUser } from "store/Login/loginSelector";
import { logOut } from "store/Login/loginSlice";
import { logOutTransfer } from "store/Transfer/transferSlice";
import "./Navbar.scss";

const Navbar = () => {
  const { user } = useSelector(selectorLoginUser) || {};
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return user?.email ? (
    <nav className="navbar">
      <NavLink to="/" className="page" end>
        {t("navbar.homePage")}
      </NavLink>
      <NavLink to="/history" className="history">
        {t("navbar.history")}
      </NavLink>
      <NavLink to="/transfer" className="transfer">
        {t("navbar.transfer")}
      </NavLink>
      <NavLink to="/recipients" className="recipients">
        {t("navbar.recipients")}
      </NavLink>
      <NavLink to="/offers" className="offers">
        {t("navbar.offerAndRequests")}
      </NavLink>
      {user.premium && (
        <NavLink to="/admin" className="admin">
          {t("navbar.adminPanel")}
        </NavLink>
      )}
      <NavLink
        to="/login"
        onClick={() => {
          dispatch(logOut());
          dispatch(logOutTransfer());
        }}
      >
        <>
          {t("navbar.logout")}
          <i className="fas fa-sign-out-alt"></i>
        </>
      </NavLink>
    </nav>
  ) : (
    <nav className="navbar">
      <NavLink to="/" className="page" end>
        {t("navbar.homePage")}
      </NavLink>
      <NavLink to="/login" className="login">
        {t("navbar.login")}
      </NavLink>
      <NavLink to="/register" className="register">
        {t("navbar.register")}
      </NavLink>
    </nav>
  );
};

export default Navbar;
