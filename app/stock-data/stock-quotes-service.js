import { ApiService, yahoo } from "./api-utils";
import { symbols } from "./config";

class StockQuotesService extends ApiService {
  getUrl() {
    return process.env.NODE_ENV === "production" ?
      yahoo.urlUtils.getQuotesUrl(symbols) : "/quotes.mock.json";
  }
  formatData(data) {
    return yahoo.dataUtils.extractQuotes(data);
  }
}

export default StockQuotesService;
