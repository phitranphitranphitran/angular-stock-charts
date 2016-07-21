function QuotesTableController($scope, stockData, activeStock, apiSelector, addStockEvent) {
  const getQuotes = () => {
    stockData.get().then(data => {
      // expects an array of company stock quotes
      this.quotes = data.quotes;
    });
  };

  getQuotes();

  // reload data on API change or new stock added
  apiSelector.listen($scope, getQuotes);
  addStockEvent.listen($scope, getQuotes);

  // table rows initially ordered by symbol, ascending
  this.orderByField = "symbol";
  this.orderReverse = false;

  this.getActiveStock = activeStock.getActiveStock;
  this.setActiveStock = activeStock.setActiveStock;

  // will show quote in table if searchString is substring in company name or symbol
  this.filterByNameOrSymbol = (searchString) => {
    return function(quote) {
      if (!searchString) {
        return true;
      }
      // case insensitive
      const name = quote.name ? quote.name.toLowerCase() : "";
      const symbol = quote.symbol.toLowerCase();
      searchString = searchString.toLowerCase();

      return name.includes(searchString) || symbol.includes(searchString);
    };
  };
}

QuotesTableController.$inject = ["$scope", "stockData", "activeStock", "apiSelector", "addStockEvent"];

export default QuotesTableController;
