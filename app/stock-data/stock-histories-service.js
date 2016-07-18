import * as apiUtils from "./api-utils";
import { symbols, startDate, endDate } from "./config";

class StockHistoriesService extends apiUtils.ApiService {
  getUrl() {
    // check this.api to see which api url to use / module to call
    return process.env.NODE_ENV === "production" ?
      apiUtils.yahoo.urlUtils.getHistoriesUrl(symbols, startDate, endDate) :
      "/histories.mock.json";
  }
  formatData(data) {
    // check this.api to see which module to call
    return apiUtils.yahoo.dataUtils.extractHistories(data);
  }
}

export default StockHistoriesService;
