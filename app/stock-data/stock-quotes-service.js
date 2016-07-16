import ApiServiceFactory from "../common/api-service-factory";
import { getQuotesUrl } from "./api-utils";
import { symbols } from "./config";

const StockQuotesService = ApiServiceFactory(getQuotesUrl(symbols));

export default StockQuotesService;
