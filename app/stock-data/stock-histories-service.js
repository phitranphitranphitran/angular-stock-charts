import ApiService from "./api-utils/api-service";
import { getHistoriesUrl } from "./api-utils/yahoo/url-utils";
import { symbols, startDate, endDate } from "./config";

class StockHistoriesService extends ApiService {
  getUrl() {
    return process.env.NODE_ENV === "production" ?
      getHistoriesUrl(symbols, startDate, endDate) : "/histories.mock.json";
  }
  formatData(data) {
    return data;
  }
}

export default StockHistoriesService;
