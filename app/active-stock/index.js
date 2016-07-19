import angular from "angular";

import ActiveStockService from "./active-stock-service";

angular.module("app.activeStock", [])
  .service("activeStock", ActiveStockService);
