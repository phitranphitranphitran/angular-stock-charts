import angular from "angular";

import "../stock-data"; // app.stockData module
import "../active-stock"; // app.activeStock module

import template from "./companies-table.html";
import controller from "./companies-table-controller";

angular.module("app.companiesTable", [
    "app.stockData",
    "app.activeStock"
  ])
  .component("companiesTable", {
    template,
    controller
  });
