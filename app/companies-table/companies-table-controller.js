function CompaniesTableController($scope, stockData, apiSelector, activeStock, addStockEvent) {
  const getQuotes = () => {
    stockData.get().then(data => {
      // expects an array of company stock quotes
      this.companies = data.quotes;
    });
  };

  getQuotes();

  // reload data on API change or new stock added
  $scope.$watch(() => apiSelector.getApi(), getQuotes);
  addStockEvent.listen(getQuotes);

  // table rows initially ordered by symbol ascending
  this.orderByField = "symbol";
  this.orderReverse = false;

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

  this.getActiveStock = activeStock.getActiveStock;
  this.setActiveStock = activeStock.setActiveStock;
}

CompaniesTableController.$inject = ["$scope", "stockData", "apiSelector", "activeStock", "addStockEvent"];

export default CompaniesTableController;
