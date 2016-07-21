import angular from "angular";

import "../stock-data"; // app.stockData module
import "../api-selector"; // app.apiSelector module
import "../active-stock"; // app.activeStock module
import "../add-stock-form"; // app.addStockForm module

import template from "./quotes-table.html";
import controller from "./quotes-table.controller";

import "./quotes-table.scss";

angular.module("app.quotesTable", [
    "app.stockData",
    "app.apiSelector",
    "app.activeStock",
    "app.addStockForm"
  ])
  .component("quotesTable", {
    template,
    controller,
    bindings: {
      filter: "<"
    }
  });
