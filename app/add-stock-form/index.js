import angular from "angular";
import "angular-animate"; // ngAnimate module
import "angular-toastr"; // toastr module
import "angular-toastr/dist/angular-toastr.min.css";

import "../stock-data"; // app.stockData module

import AddStockFormTemplate from "./add-stock-form.html";
import AddStockFormController from "./add-stock-form.controller";
import AddStockEventService from "./add-stock-event.service";

import "./add-stock-form.scss";

angular.module("app.addStockForm", [
    "ngAnimate",
    "toastr",

    "app.stockData"
  ])
  .component("addStockForm", {
    template: AddStockFormTemplate,
    controller: AddStockFormController
  })
  .service("addStockEvent", AddStockEventService);
