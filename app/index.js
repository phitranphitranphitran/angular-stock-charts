import angular from "angular";

import "./navbar"; //app.navbar module
import "./companies-table"; // app.companiesTable module
import "./price-history-chart"; // app.priceHistoryChart module
import "./footer-bar"; // app.footerBar module

import template from "./app.html";
import controller from "./app-controller";

angular.module("app", [
    "app.navbar",
    "app.priceHistoryChart",
    "app.companiesTable",
    "app.footerBar"
  ])
  .component("app", {
    template,
    controller
  });
