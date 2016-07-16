import ApiServiceFactory from "../common/api-service-factory";
import { getHistoriesUrl } from "./api-utils";
import { symbols, startDate, endDate } from "./config";

const StockHistoriesService = ApiServiceFactory(
  getHistoriesUrl(symbols, startDate, endDate)
);

export default StockHistoriesService;
