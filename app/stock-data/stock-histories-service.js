import ApiServiceFactory from "../common/api-service-factory";
import { getHistoriesUrl } from "./api-utils";
import { symbols, startDate, endDate } from "./config";

const historiesUrl = process.env.NODE_ENV === "production" ?
  getHistoriesUrl(symbols, startDate, endDate) : "/mock-histories.json";

const StockHistoriesService = ApiServiceFactory(historiesUrl);

export default StockHistoriesService;
