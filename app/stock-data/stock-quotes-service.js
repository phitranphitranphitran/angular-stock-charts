import ApiRequestService from "./api-request-service";
import * as apiUtils from "./api-utils";
import { APIS } from "../constants";
import { symbols } from "./config";

class StockQuotesService extends ApiRequestService {
  getUrl() {
    return process.env.NODE_ENV === "production" ?
      this.getQuotesUrl(symbols) : "/quotes.mock.json";
  }
  formatData(data) {
    return this.extractQuotes(data);
  }
  onUpdateApi(api) {
    switch(api) {
      case APIS.YAHOO:
      default:
        this.getQuotesUrl = apiUtils.yahoo.urlUtils.getQuotesUrl;
        this.extractQuotes = apiUtils.yahoo.dataUtils.extractQuotes;
    }
  }
}

export default StockQuotesService;
