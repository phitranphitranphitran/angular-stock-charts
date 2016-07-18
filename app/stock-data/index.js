import angular from "angular";

import StockQuotesService from "./stock-quotes-service";
import StockHistoriesService from "./stock-histories-service";
import ApiSelectorService from "./api-selector-service";

angular.module("app.stockData", [])
  .service("stockQuotes", StockQuotesService)
  .service("stockHistories", StockHistoriesService)
  .service("apiSelector", ApiSelectorService);
