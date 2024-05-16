import TextWrapper from "components/Contents/TextWrapper";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  selectorLoginUser,
} from "store/Login/loginSelector";
import "./Navbar.scss";
import { Box } from "@mui/material";

const Navbar = () => {
  const { user } = useSelector(selectorLoginUser) || {};

  return user?.email ? (
    <nav className="navbar-container">
      <Box className="navbar-bottom">
        <NavLink to="/" className="page" end>
          <TextWrapper label="navbar.homePage" />
        </NavLink>
        <NavLink to="/history" className="navbar-history">
          <TextWrapper label="navbar.history" />
        </NavLink>
        <NavLink to="/transfer" className="navbar-transfer">
          <TextWrapper label="navbar.transfer" />
        </NavLink>
        <NavLink to="/recipients" className="navbar-recipients">
          <TextWrapper label="navbar.recipients" />
        </NavLink>
        <NavLink to="/offers" className="navbar-offers">
          <TextWrapper label="navbar.offerAndRequests" />
        </NavLink>
        {user.premium && (
          <NavLink to="/admin" className="navbar-admin">
            <TextWrapper label="navbar.adminPanel" />
          </NavLink>
        )}
      </Box>
    </nav>
  ) : (
    <nav className="navbar-container">
      <Box className="navbar-bottom">
        <NavLink to="/" className="page" end>
          <TextWrapper label="navbar.homePage" />
        </NavLink>
        <NavLink to="/login" className="login">
          <TextWrapper label="navbar.login" />
        </NavLink>
        <NavLink to="/register" className="register">
          <TextWrapper label="navbar.register" />
        </NavLink>
      </Box>
    </nav>
  );
};

export default Navbar;
