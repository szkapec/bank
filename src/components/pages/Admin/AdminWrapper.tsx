import React, { useState } from "react";
import AdminNavbar, { Routes } from "./Navbar/AdminNavbar";
import AdminUsers from "./Users/AdminUsers";
import AdminLogout from "./Logout/AdminLogout";
import AdminBan from "./Ban/AdminBan";
import AdminSendMessage from "./SendMessage/AdminSendMessage";
import { Box } from "@mui/material";

const AdminWrapper = () => {
  const [route, setRoute] = useState<Routes>(Routes.Users);

  const generateRoute = (route: string) => {
    switch (route) {
      case Routes.Users:
        return <AdminUsers />;
      case Routes.Logout:
        return <AdminLogout />;
      case Routes.Ban:
        return <AdminBan />;
      case Routes.Message:
        return <AdminSendMessage />;
      default:
        break;
    }
  };

  return (
    <Box>
      <AdminNavbar setRoute={setRoute} route={route} />
      <Box>{generateRoute(route)}</Box>
    </Box>
  );
};

export default React.memo(AdminWrapper);
