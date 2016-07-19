import ApiRequestService from "./api-request-service";
// import { APIS } from "../constants";

// main service for clients of the module
// aggregates data retrieved from the quotes service and the histories service
class StockDataService extends ApiRequestService {
  constructor($q, apiSelector, stockQuotes, stockHistories) {
    super($q, apiSelector);
    this.stockQuotes = stockQuotes;
    this.stockHistories = stockHistories;
  }
  fetchData() {
    return this.$q.all([
      this.stockQuotes.get(),
      this.stockHistories.get()
    ]);
  }
  extractData([ quotes, histories ]) {
    switch(this.apiSelector.getApi()) {
      // case APIS.YAHOO:
      default: {
        const combined = { quotes, histories };
        combined.quotes.forEach(quote => {
          const { symbol } = quote;
          // give quotes access to histories, but keep as array
          quote.history = histories[symbol].history;
          // give histories access to quotes, but keep as object
          histories[symbol] = Object.assign(histories[symbol], quote);
        });
        return combined;
      }
    }
  }
}

StockDataService.$inject = ["$q", "apiSelector", "stockQuotes", "stockHistories"];

export default StockDataService;
