import AdditionalNavbar from "components/Navbar/AdditionalNavbar";
import { RoutesHome } from "../HomeWrapper";

interface IPropsAdminNavbar {
  setRoute: Function;
  route: string;
}

const HomeNavbar = ({ setRoute, route }: IPropsAdminNavbar) => {
  return (
    <AdditionalNavbar
      setRoute={setRoute}
      useRoutes={[RoutesHome.Diagram, RoutesHome.Highcharts]}
      route={route}
      label={["diagrams", "highcharts"]}
    />
  );
};

export default HomeNavbar;
