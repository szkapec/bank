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
        Użytkownicy
      </Link>
      <Link
        to="/admin"
        className={Routes.Logout === route ? "admin-active" : Routes.Logout}
        onClick={() => setRoute(Routes.Logout)}
      >
        Wyloguj użytkownika
      </Link>
      <Link
        to="/admin"
        className={Routes.Ban === route ? "admin-active" : Routes.Ban}
        onClick={() => setRoute(Routes.Ban)}
      >
        Zbanuj użytkownika
      </Link>
      <Link
        to="/admin"
        className={Routes.Message === route ? 'admin-active' : Routes.Message}
        onClick={() => setRoute(Routes.Message)}
      >
        Wyślij wiadomość
      </Link>
    </nav>
  );
};

export default AdminNavbar;
