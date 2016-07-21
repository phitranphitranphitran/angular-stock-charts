import angular from "angular";

import "../stock-data"; // app.stockData module
import "../add-stock-form"; // app.addStockForm module

import ActiveStockService from "./active-stock.service";

angular.module("app.activeStock", [
    "app.stockData",
    "app.addStockForm"
  ])
  .service("activeStock", ActiveStockService);
