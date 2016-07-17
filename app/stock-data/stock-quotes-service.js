import ApiService from "../common/api-service";
import { getQuotesUrl } from "./api-utils";
import { symbols } from "./config";

class StockQuotesService extends ApiService {
  getUrl() {
    return process.env.NODE_ENV === "production" ?
      getQuotesUrl(symbols) : "/mock-quotes.json";
  }
  formatData(data) {
    return data.query.results.quote;
  }
}

export default StockQuotesService;
