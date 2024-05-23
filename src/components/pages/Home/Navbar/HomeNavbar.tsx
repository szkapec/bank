import AdditionalNavbar from "components/Navbar/AdditionalNavbar";
import { RoutesHome } from "../HomeWrapper";
import { Box } from "@mui/material";

interface IPropsAdminNavbar {
  setRoute: Function;
  route: string;
}

const HomeNavbar = ({ setRoute, route }: IPropsAdminNavbar) => {
  return (
    <Box className="navbar-container additional">
      <AdditionalNavbar
        setRoute={setRoute}
        useRoutes={[
          RoutesHome.Diagram,
          RoutesHome.Highcharts,
          RoutesHome.Graph,
        ]}
        route={route}
        label={["diagrams", "highcharts", "graph"]}
      />
    </Box>
  );
};

export default HomeNavbar;
