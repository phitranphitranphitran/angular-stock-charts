import ApiService from "../common/api-service";
import { getHistoriesUrl } from "./api-utils";
import { symbols, startDate, endDate } from "./config";

class StockHistoriesService extends ApiService {
  getUrl() {
    return process.env.NODE_ENV === "production" ?
      getHistoriesUrl(symbols, startDate, endDate) : "/mock-histories.json";
  }
  formatData(data) {
    return data.query.results.quote;
  }
}

export default StockHistoriesService;
