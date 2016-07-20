import angular from "angular";
import "angular-animate"; // ngAnimate module
import "angular-toastr"; // toastr module
import "angular-toastr/dist/angular-toastr.min.css";

import StockDataService from "./stock-data-service";
import ApiSelectorService from "./api-selector-service";
import SymbolsStoreService from "./symbols-store-service";

angular.module("app.stockData", [
    "ngAnimate",
    "toastr"
  ])
  .service("stockData", StockDataService)
  .service("apiSelector", ApiSelectorService)
  .service("symbolsStore", SymbolsStoreService);
