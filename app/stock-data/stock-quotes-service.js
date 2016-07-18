import ApiService from "./api-utils/api-service";
import { getQuotesUrl } from "./api-utils/yahoo/url-utils";
import { extractQuotes } from "./api-utils/yahoo/data-utils";
import { symbols } from "./config";

class StockQuotesService extends ApiService {
  getUrl() {
    return process.env.NODE_ENV === "production" ?
      getQuotesUrl(symbols) : "/quotes.mock.json";
  }
  formatData(data) {
    return extractQuotes(data);
  }
}

export default StockQuotesService;
