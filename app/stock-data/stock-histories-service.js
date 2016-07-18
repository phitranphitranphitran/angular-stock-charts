import ApiService from "./api-utils/api-service";
import { getHistoriesUrl } from "./api-utils/yahoo/url-utils";
import { extractHistories } from "./api-utils/yahoo/data-utils";
import { symbols, startDate, endDate } from "./config";

class StockHistoriesService extends ApiService {
  getUrl() {
    return process.env.NODE_ENV === "production" ?
      getHistoriesUrl(symbols, startDate, endDate) : "/histories.mock.json";
  }
  formatData(data) {
    return extractHistories(data);
  }
}

export default StockHistoriesService;
