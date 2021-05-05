import React, { createRef, useEffect, useState } from 'react';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

import LoadData from '../../utils/LoadData';

export default function RenderChart(props) {
  const {baseCurrency, toCurrency} = props;

  const [api, setApi] = useState();
  const [chartRawData, setChartRawData] = useState();
  const [chartLabels, setChartLabels] = useState();
  const [chartData, setChartData] = useState();
  const [chartLabel, setChartLabel] = useState();
  const [chart, setChart] = useState();

  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  );

  let chartRef = React.createRef();

  /**
   * sets api if base and to currencies are not empty
   */
  useEffect( () => {
    if (baseCurrency && toCurrency) {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
      setApi(`https://altexchangerateapi.herokuapp.com/${startDate}..${endDate}?from=${baseCurrency}&to=${toCurrency}`)
    }
  }, [baseCurrency, toCurrency]);

  /**
   * contacts endpoint with appropriate API string
   */
  useEffect( () => {
    if (api) {
      LoadData(api, setChartRawData);
    }
  }, [api]);

  /**
   * sets global chart data after retrieving
   */
  useEffect( () => {
    if(chartRawData) {
      setChartLabels(Object.keys(chartRawData.rates));
      setChartData(Object.values(chartRawData.rates).map(rate => rate[toCurrency]));
      setChartLabel(`${baseCurrency}/${toCurrency}`);
    }
  }, [chartRawData]);

  /**
   * creates chart data
   */
  useEffect( () => {

    if(!chartLabels || !chartData || !chartLabel) return; // Return early if no valid data

    chartRef = chartRef.current.getContext("2d");
    if (chart !== "undefined") {
      setChart(undefined);
    }

    setChart(new Chart(chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        chartLabels,
        datasets: [
          {
            label: chartLabel,
            chartData,
            fill: false,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
      }
      })
    );
  }, [chartLabels, chartData, chartLabel])

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  )
}