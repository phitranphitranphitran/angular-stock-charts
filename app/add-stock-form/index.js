import angular from "angular";

import "../stock-data"; // app.stockData module

import template from "./add-stock-form.html";
import controller from "./add-stock-form-controller";
import AddStockEventService from "./add-stock-event-service";

angular.module("app.addStockForm", [
    "app.stockData"
  ])
  .component("addStockForm", {
    template,
    controller
  })
  .service("addStockEvent", AddStockEventService);
