import angular from "angular";

import StockDataService from "./stock-data-service";
import StockQuotesService from "./stock-quotes-service";
import StockHistoriesService from "./stock-histories-service";
import ApiSelectorService from "./api-selector-service";

angular.module("app.stockData", [])
  .service("stockData", StockDataService)
  .service("stockQuotes", StockQuotesService)
  .service("stockHistories", StockHistoriesService)
  .service("apiSelector", ApiSelectorService);
