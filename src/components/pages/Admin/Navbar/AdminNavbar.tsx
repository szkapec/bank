import TextWrapper from "components/Contents/TextWrapper";
import AdditionalNavbar from "components/Navbar/AdditionalNavbar";
import { Link } from "react-router-dom";

export enum RoutesAdmin {
  Users = "Users",
  Logout = "Logout",
  Ban = "Ban",
  Message = "Message",
}

interface IPropsAdminNavbar {
  setRoute: Function;
  route: string;
}

const AdminNavbar = ({ setRoute, route }: IPropsAdminNavbar) => {
  return (
    <nav className="navbar-admin">
      <AdditionalNavbar
        setRoute={setRoute}
        useRoutes={[
          RoutesAdmin.Users,
          RoutesAdmin.Logout,
          RoutesAdmin.Ban
        ]}
        route={route}
        path="/admin"
        label={["admin.users", "admin.logOutUser", "admin.userBan"]}
      />
    </nav>
  );
};

export default AdminNavbar;
