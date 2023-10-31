import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSuccess } from 'types/saleSuccess';
import { round } from 'utils/formatter';

type SeriesData = {
  name: string;
  data: number[];
}

type ChartData = {
  labels: {
    categories: string[];
  };
  series: SeriesData[];
}

const BarCharts = () => {

  const [chartData, setChartData] = useState<ChartData>({
    labels: {
      categories: []
    },
    series: [
      {
        name: "",
        data: [],
      }
    ],
  });

  useEffect(() =>{
    axios.get(`${process.env.BASE_URL}/sales/successBySeller`).then(res => {
      const data = res.data as SaleSuccess[];
      const myLabels = data.map(label => label.sellerName);
      const mySeries = data.map(serie => round(100.0 * serie.deals / serie.visited, 1));
      setChartData({
        labels: {
          categories: myLabels
        },
        series: [
          {
            name: "% sucesso",
            data: mySeries,
          }
        ],
      });
    });
  }, []);

  const options = {
    plotOptions: {
      bar: {
        horizontal: false,
        startingShape: 'flat',
        endingShape: 'flat',
        colors: {
          backgroundBarOpacity: 1,
          backgroundBarRadius: 0,
        }
      }
    }
  };

  return (
    <Chart
      options={{...options, xaxis: chartData.labels}}
      series={chartData.series}
      type="bar"
      height="240"
    />
  );
}

export default BarCharts;