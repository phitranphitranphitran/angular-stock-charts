import angular from "angular";
import "angular-toastr"; // toastr module

import "../stock-data"; // app.stockData module

import RequestsListController from "./requests-list-controller";

angular.module("app.requestsList", [
    "toastr",

    "app.stockData"
  ])
  .config(function(toastrConfig) {
    angular.extend(toastrConfig, {
      preventOpenDuplicates: true
    });
  })
  .component("requestsList", {
    controller: RequestsListController
  });
