import React, { useState } from "react";
import AdminNavbar, { RoutesAdmin } from "./Navbar/AdminNavbar";
import AdminUsers from "./Users/AdminUsers";
import AdminLogout from "./Logout/AdminLogout";
import AdminBan from "./Ban/AdminBan";
import AdminSendMessage from "./SendMessage/AdminSendMessage";
import { Box } from "@mui/material";

const AdminWrapper = () => {
  const [route, setRoute] = useState<RoutesAdmin>(RoutesAdmin.Users);

  const generateRoute = (route: string) => {
    switch (route) {
      case RoutesAdmin.Users:
        return <AdminUsers />;
      case RoutesAdmin.Logout:
        return <AdminLogout />;
      case RoutesAdmin.Ban:
        return <AdminBan />;
      // case Routes.Message:
      //   return <AdminSendMessage />;
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
