import angular from "angular";
import Highcharts from "highcharts";
window.Highcharts = Highcharts; // https://github.com/highcharts/highcharts/issues/4994
import "highcharts-ng";

import "../stock-data"; // app.stockData module
import "../active-stock"; // app.activeStock module

import template from "./price-history-chart.html";
import controller from "./price-history-chart-controller";

angular.module("app.priceHistoryChart", [
    "highcharts-ng",
    "app.stockData",
    "app.activeStock"
  ])
  .component("priceHistoryChart", {
    template,
    controller
  });
