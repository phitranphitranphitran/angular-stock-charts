import ApiRequestService from "./api-request-service";
import * as apiUtils from "./api-utils";
import { APIS } from "../constants";
import { symbols, startDate, endDate } from "./config";

class StockHistoriesService extends ApiRequestService {
  getUrl() {
    return process.env.NODE_ENV === "production" ?
      this.getHistoriesUrl(symbols, startDate, endDate) : "/histories.mock.json";
  }
  formatData(data) {
    return this.extractHistories(data);
  }
  onUpdateApi(api) {
    switch(api) {
      case APIS.YAHOO:
      default:
        this.getHistoriesUrl = apiUtils.yahoo.urlUtils.getHistoriesUrl;
        this.extractHistories = apiUtils.yahoo.dataUtils.extractHistories;
    }
  }
}

export default StockHistoriesService;
