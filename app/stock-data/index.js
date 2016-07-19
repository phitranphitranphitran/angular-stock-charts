import angular from "angular";

import StockDataService from "./stock-data-service";
import ApiSelectorService from "./api-selector-service";

angular.module("app.stockData", [])
  .service("stockData", StockDataService)
  .service("apiSelector", ApiSelectorService);
