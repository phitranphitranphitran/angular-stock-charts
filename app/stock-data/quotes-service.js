import { getQuotesUrl } from "./api-utils";
import { symbols } from "./config";

function quotesService($http) {
  this.get = function() {
    return $http.get(getQuotesUrl(symbols));
  };
}

quotesService.$inject = ["$http"];

export default quotesService;
