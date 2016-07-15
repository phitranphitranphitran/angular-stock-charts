import { getHistoricalDataUrl } from "./api-utils";
import { symbols, startDate, endDate } from "./config";

function historicalDataService($http) {
  this.get = function() {
    return $http.get(getHistoricalDataUrl(symbols, startDate, endDate));
  };
}

historicalDataService.$inject = ["$http"];

export default historicalDataService;
