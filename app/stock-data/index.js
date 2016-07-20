import angular from "angular";
import "angular-animate"; // ngAnimate module
import "angular-toastr"; // toastr module
import "angular-toastr/dist/angular-toastr.min.css";

import StockDataService from "./stock-data-service";
import SymbolsStoreService from "./symbols-store-service";

import "../api-selector"; // app.apiSelector module

angular.module("app.stockData", [
    "ngAnimate",
    "toastr",

    "app.apiSelector"
  ])
  .service("stockData", StockDataService)
  .service("symbolsStore", SymbolsStoreService);
