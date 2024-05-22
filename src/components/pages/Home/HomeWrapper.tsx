import { Box } from "@mui/material";
import { useState } from "react";
import Diagrams from "./Diagrams/Diagrams";
import Highcharts from "./Highcharts/Highcharts";
import HomeNavbar from "./Navbar/HomeNavbar";

export enum RoutesHome {
  Home = "home",
  Diagram = "diagrams",
  Highcharts = "Highcharts",
}

const HomeWrapper = () => {
  const [route, setRoute] = useState<RoutesHome>(RoutesHome.Diagram);
  const generateRoute = (route: string) => {
    switch (route) {
      case RoutesHome.Diagram:
        return <Diagrams />;
      case RoutesHome.Highcharts:
        return <Highcharts />;
      default:
        break;
    }
  };

  return (
    <div>
      <HomeNavbar setRoute={setRoute} route={route} />
      <Box>{generateRoute(route)}</Box>
    </div>
  );
};

export default HomeWrapper;
