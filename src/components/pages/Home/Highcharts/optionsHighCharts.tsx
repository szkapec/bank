
export const optionsHighCharts = (fromClient: Array<number | null>, toClient: Array<number | null>, categories: any) => {
  return {
    chart: {
        type: 'area'
    },
    title: {
      text: "Wykres przychodów i rozchodów w zależności od dnia",
    },
    xAxis: {
      categories,
    },
    series: [
      {
        name: "Przychody",
        data: fromClient,
      },
      {
        name: "Wydatki",
        data: toClient,
      },
    ],
  };
};
