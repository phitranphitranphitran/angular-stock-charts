import angular from "angular";
import "normalize.css";
import "bootstrap/dist/css/bootstrap.css";

import "./app.scss";

import "./navbar"; // app.navbar module
import "./history-chart"; // app.historyChart module
import "./add-stock-form"; // app.addStockForm module
import "./quotes-table"; // app.quotesTable module
import "./footer-bar"; // app.footerBar module
import "./requests-list"; // app.requestsList module
import "./api-selector"; // app.apiSelector module

import template from "./app.html";
import controller from "./app.controller";

angular.module("app", [
    "app.navbar",
    "app.historyChart",
    "app.addStockForm",
    "app.quotesTable",
    "app.footerBar",
    "app.requestsList",
    "app.apiSelector"
  ])
  .component("app", {
    template,
    controller
  });
