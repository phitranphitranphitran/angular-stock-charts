import ApiRequestService from "./api-request-service";
import { yahoo } from "./api-utils";
import { symbols } from "./config";

class StockQuotesService extends ApiRequestService {
  getUrl() {
    return process.env.NODE_ENV === "production" ?
      yahoo.urlUtils.getQuotesUrl(symbols) : "/quotes.mock.json";
  }
  formatData(data) {
    return yahoo.dataUtils.extractQuotes(data);
  }
}

export default StockQuotesService;
