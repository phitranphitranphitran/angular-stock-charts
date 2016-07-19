import ApiRequestService from "./api-request-service";
import * as apiUtils from "./api-utils";
import { symbols, startDate, endDate } from "./config";
// import { APIS } from "../constants";

class StockHistoriesService extends ApiRequestService {
  constructor($q, apiSelector, $http) {
    super($q, apiSelector);
    this.$http = $http;
  }
  fetchData() {
    const url = process.env.NODE_ENV === "production" ?
      this.getHistoriesUrl(symbols, startDate, endDate) : "/histories.mock.json";
    return this.$http.get(url);
  }
  extractData(res) {
    return this.extractHistories(res.data);
  }
  onUpdateApi(api) {
    switch(api) {
      // case APIS.YAHOO:
      default: {
        this.getHistoriesUrl = apiUtils.yahoo.urlUtils.getHistoriesUrl;
        this.extractHistories = apiUtils.yahoo.dataUtils.extractHistories;
      }
    }
  }
}

StockHistoriesService.$inject = ["$q", "apiSelector", "$http"];

export default StockHistoriesService;
