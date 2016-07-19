function CompaniesTableController($scope, stockData, apiSelector) {
  const getQuotes = () => {
    stockData.get().then(data => {
      // expects an array of company stock quotes
      this.companies = data.quotes;
    });
  };

  getQuotes();

  // reload data on API change
  $scope.$watch(() => apiSelector.getApi(), getQuotes);

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
}

CompaniesTableController.$inject = ["$scope", "stockData", "apiSelector"];

export default CompaniesTableController;
