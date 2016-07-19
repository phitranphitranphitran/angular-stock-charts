// main service for clients of the module
// aggregates data retrieved from the quotes service and the histories service

class StockDataService {
  constructor($q, stockQuotes, stockHistories) {
    this.$q = $q;
    this.stockQuotes = stockQuotes;
    this.stockHistories = stockHistories;
  }
  get() {
    return this.$q.all([
      this.stockQuotes.get(),
      this.stockHistories.get()
    ])
    .then(([ quotes, histories ]) => {
      // if yahoo
      const combined = { quotes, histories };
      combined.quotes.forEach(quote => {
        const { symbol } = quote;
        // give quotes access to histories, but keep as array
        quote.history = histories[symbol].history;
        // give histories access to quotes, but keep as object
        histories[symbol] = Object.assign(histories[symbol], quote);
      });
      return combined;
    });
  }
}

StockDataService.$inject = ["$q", "stockQuotes", "stockHistories"];

export default StockDataService;
