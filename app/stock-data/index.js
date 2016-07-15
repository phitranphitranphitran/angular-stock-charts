import angular from "angular";

import quotesService from "./quotes-service";
import historicalDataService from "./historical-data-service";

const stockDataModule = angular.module("app.stockData", [])
  .service("stockQuotes", quotesService)
  .service("stockHistoricalData", historicalDataService);

export default stockDataModule;
