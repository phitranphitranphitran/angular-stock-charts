function CompaniesTableController($scope, stockData, activeStock, apiSelector, addStockEvent) {
  const getQuotes = () => {
    stockData.get().then(data => {
      // expects an array of company stock quotes
      this.companies = data.quotes;
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

  // will show company in table if searchString is substring of name or symbol
  this.filterByNameOrSymbol = (searchString) => {
    return function(company) {
      if (!searchString) {
        return true;
      }
      // case insensitive
      const name = company.name.toLowerCase();
      const symbol = company.symbol.toLowerCase();
      searchString = searchString.toLowerCase();

      return name.includes(searchString) || symbol.includes(searchString);
    };
  };
}

CompaniesTableController.$inject = ["$scope", "stockData", "activeStock", "apiSelector", "addStockEvent"];

export default CompaniesTableController;
