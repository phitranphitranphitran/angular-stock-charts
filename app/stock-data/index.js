import angular from "angular";
import "angular-toastr"; // toastr module

import StockDataService from "./stock-data-service";
import ApiSelectorService from "./api-selector-service";
import SymbolsStoreService from "./symbols-store-service";

angular.module("app.stockData", [
    "toastr"
  ])
  .service("stockData", StockDataService)
  .service("apiSelector", ApiSelectorService)
  .service("symbolsStore", SymbolsStoreService);
