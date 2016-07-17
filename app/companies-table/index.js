import angular from "angular";

import "../stock-data"; // app.stockData module

import template from "./companies-table.html";
import controller from "./companies-table-controller";

angular.module("app.companiesTable", [
    "app.stockData"
  ])
  .component("companiesTable", {
    template,
    controller
  });
