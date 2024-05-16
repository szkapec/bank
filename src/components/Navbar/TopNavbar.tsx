import TextWrapper from "components/Contents/TextWrapper";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectorLoginUser } from "store/Login/loginSelector";
import { logOut } from "store/Login/loginSlice";
import { logOutTransfer } from "store/Transfer/transferSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Box } from "@mui/material";
import CustomizedMenus from "./CustomizedMenus";
import { logOutSubAccount } from "store/SubAccount/subAccountSlice";
import { logOutRecipient } from "store/Recipient/recipientSlice";
import { logOutHome } from "store/Home/homeSlice";
import { logOutAdmin } from "store/Admin/adminSlice";

const TopNavbar = () => {
  const { user } = useSelector(selectorLoginUser) || {};
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return user?.email ? (
    <nav className="navbar-top-container">
      <Box className="navbar-top">
        <NavLink to="/" className="navbar-top__bank">
          <AccountBalanceIcon />
          Bank
        </NavLink>
        <Box className="navbar-top__bank24">BANK24</Box>
        <NavLink
          className="navbar-top__logout"
          to="/login"
          onClick={() => {
            dispatch(logOut());
            dispatch(logOutTransfer());
            dispatch(logOutSubAccount());
            dispatch(logOutRecipient());
            dispatch(logOutHome());
            dispatch(logOutAdmin());
    
          }}
        >
          <>
            <LogoutIcon />
            {t("navbar.logout")}
            <i className="fas fa-sign-out-alt"></i>
          </>

        </NavLink>
        <Box className="navbar-top__custom-menu">
          <CustomizedMenus user={user}/>
        </Box>
      </Box>
    </nav>
  ) : (
    <nav className="navbar"></nav>
  );
};

export default TopNavbar;
