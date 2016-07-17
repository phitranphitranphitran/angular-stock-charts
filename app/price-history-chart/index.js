import angular from "angular";
import Highcharts from "highcharts";
window.Highcharts = Highcharts; // https://github.com/highcharts/highcharts/issues/4994
import "highcharts-ng";

import template from "./price-history-chart.html";
import controller from "./price-history-chart-controller";

const priceHistoryChartModule = angular.module("app.priceHistoryChart", [
    "highcharts-ng",
    "app.stockData"
  ])
  .component("priceHistoryChart", {
    template,
    controller
  });

export default priceHistoryChartModule;
