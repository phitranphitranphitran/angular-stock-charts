import ApiRequestService from "./api-request-service";
import * as apiUtils from "./api-utils";
import { symbols } from "./config";
// import { APIS } from "../constants";

class StockQuotesService extends ApiRequestService {
  constructor($q, apiSelector, $http) {
    super($q, apiSelector);
    this.$http = $http;
  }
  fetchData() {
    const url = process.env.NODE_ENV === "production" ?
      this.getQuotesUrl(symbols) : "/quotes.mock.json";
    return this.$http.get(url);
  }
  extractData(res) {
    return this.extractQuotes(res.data);
  }
  onUpdateApi(api) {
    switch(api) {
      // case APIS.YAHOO:
      default: {
        this.getQuotesUrl = apiUtils.yahoo.urlUtils.getQuotesUrl;
        this.extractQuotes = apiUtils.yahoo.dataUtils.extractQuotes;
      }
    }
  }
}

StockQuotesService.$inject = ["$q", "apiSelector", "$http"];

export default StockQuotesService;
