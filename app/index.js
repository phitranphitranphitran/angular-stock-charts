import angular from "angular";

import "./companies-table"; // app.priceHistoryChart module
import "./price-history-chart"; // app.companiesTable module

import template from "./app.html";
import controller from "./app-controller";

angular.module("app", [
    "app.priceHistoryChart",
    "app.companiesTable"
  ])
  .component("app", {
    template,
    controller
  });
