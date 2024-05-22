import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { optionsHighCharts } from "./optionsHighCharts";
import { useAppDispatch } from "store/hooks";
import { homeHighChartsThunk } from "store/Home/homeThunk";
import { useQuery } from "react-query";

const HighchartsHome = () => {
  const dispatch = useAppDispatch();
  let fromClient: Array<number | null> = [];
  let toClient: Array<number | null> = [];
  let categories = [];
  const { isLoading, error, data } = useQuery("HOME_HIGH_CHARTS", () =>
    dispatch(homeHighChartsThunk())
  );

  if (data?.payload?.fromClient) {
    
    const categoriesFromClient = data?.payload?.fromClient?.map((transferValue: number) => Object.keys(transferValue)[0])
    const categoriesToClient = data?.payload?.toClient?.map((transferValue: number) => Object.keys(transferValue)[0])
    categories = Array.from(new Set([...categoriesFromClient, ...categoriesToClient]))

    categories.map((item: string) => {
      const dateFromClient = (data?.payload?.fromClient.find((client: Array<number>) => {
        if(Object.keys(client)[0] === item) {
          return fromClient.push(Object.entries(client)[0][1])
        }
      }))
      if(!dateFromClient) fromClient.push(null)

      const dateToClient = data?.payload?.toClient.find((client: Array<number>) => {
        if(Object.keys(client)[0] === item) {
          return toClient.push(Object.entries(client)[0][1])
        }
      })
      if(!dateToClient) toClient.push(null)
    })
  }

  return (
    <div>
      Highcharts
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={optionsHighCharts(fromClient, toClient, categories)}
        />
      </div>
    </div>
  );
};

export default HighchartsHome;
