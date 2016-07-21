import angular from "angular";
import "angular-animate"; // ngAnimate module
import "angular-toastr"; // toastr module
import "angular-toastr/dist/angular-toastr.min.css";

import "../stock-data"; // app.stockData module

import template from "./add-stock-form.html";
import controller from "./add-stock-form.controller";
import AddStockEventService from "./add-stock-event.service";

angular.module("app.addStockForm", [
    "ngAnimate",
    "toastr",

    "app.stockData"
  ])
  .component("addStockForm", {
    template,
    controller
  })
  .service("addStockEvent", AddStockEventService);
