import ApiServiceFactory from "../common/api-service-factory";
import { getQuotesUrl } from "./api-utils";
import { symbols } from "./config";

const quotesUrl = process.env.NODE_ENV === "production" ?
  getQuotesUrl(symbols) : "/mock-quotes.json";

const StockQuotesService = ApiServiceFactory(quotesUrl);

export default StockQuotesService;
