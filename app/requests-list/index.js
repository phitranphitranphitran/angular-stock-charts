import angular from "angular";
import "angular-animate"; // ngAnimate module
import "angular-toastr"; // toastr module
import "angular-toastr/dist/angular-toastr.min.css";

import "../stock-data"; // app.stockData module

import RequestsListController from "./requests-list.controller";

angular.module("app.requestsList", [
    "ngAnimate",
    "toastr",

    "app.stockData"
  ])
  .component("requestsList", {
    controller: RequestsListController
  });
