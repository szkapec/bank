import TextWrapper from "components/Contents/TextWrapper";
import { Link } from "react-router-dom";

export enum Routes {
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
      <Link
        to="/admin"
        className={Routes.Users === route ? "admin-active" : Routes.Users}
        onClick={() => setRoute(Routes.Users)}
      >
        <TextWrapper label="admin.users" />
      </Link>
      <Link
        to="/admin"
        className={Routes.Logout === route ? "admin-active" : Routes.Logout}
        onClick={() => setRoute(Routes.Logout)}
      >
        <TextWrapper label="admin.logOutUser" />
      </Link>
      <Link
        to="/admin"
        className={Routes.Ban === route ? "admin-active" : Routes.Ban}
        onClick={() => setRoute(Routes.Ban)}
      >
        <TextWrapper label="admin.userBan" />
      </Link>
    </nav>
  );
};

export default AdminNavbar;
