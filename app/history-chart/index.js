import angular from "angular";
import Highcharts from "highcharts";
window.Highcharts = Highcharts; // https://github.com/highcharts/highcharts/issues/4994
import "highcharts-ng";

import "../stock-data"; // app.stockData module
import "../active-stock"; // app.activeStock module
import "../api-selector"; // app.apiSelector module

import template from "./history-chart.html";
import controller from "./history-chart.controller";

angular.module("app.historyChart", [
    "highcharts-ng",

    "app.stockData",
    "app.activeStock",
    "app.apiSelector"
  ])
  .component("historyChart", {
    template,
    controller
  });
