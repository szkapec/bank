import TextWrapper from "components/Contents/TextWrapper";
import { RoutesAdmin } from "pages/Admin/Navbar/AdminNavbar";
import { RoutesHome } from "pages/Home/HomeWrapper";
import { Link } from "react-router-dom";

interface IPropsAdditionalNavbar {
  setRoute: Function;
  useRoutes: RoutesHome[] | RoutesAdmin[];
  route: string;
  label: string[];
  path?: string;
}

const AdditionalNavbar = ({
  setRoute,
  useRoutes,
  route,
  label,
  path = "/",
}: IPropsAdditionalNavbar) => {

  if (!useRoutes?.length) return <></>;
  return (
    <nav className="navbar-bottom">
      {useRoutes?.map((useRoute: string, index: number) => (
        <Link
          key={useRoute}
          to={path}
          className={useRoute === route ? "additional-active" : useRoute}
          onClick={() => setRoute(useRoute)}
        >
          <TextWrapper label={label[index]} />
        </Link>
      ))}
    </nav>
  );
};

export default AdditionalNavbar;
