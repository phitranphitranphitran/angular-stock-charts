import angular from "angular";

import "../add-stock-form"; // app.addStockForm module

import ActiveStockService from "./active-stock.service";

angular.module("app.activeStock", [
    "app.addStockForm"
  ])
  .service("activeStock", ActiveStockService);
