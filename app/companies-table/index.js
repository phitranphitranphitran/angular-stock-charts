import angular from "angular";

import "../stock-data"; // app.stockData module
import "../api-selector"; // app.apiSelector module
import "../active-stock"; // app.activeStock module
import "../add-stock-form"; // app.addStockForm module

import template from "./companies-table.html";
import controller from "./companies-table-controller";

angular.module("app.companiesTable", [
    "app.stockData",
    "app.apiSelector",
    "app.activeStock",
    "app.addStockForm"
  ])
  .component("companiesTable", {
    template,
    controller,
    bindings: {
      filter: "<"
    }
  });
