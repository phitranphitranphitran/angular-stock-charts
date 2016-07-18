function CompaniesTableController(stockQuotes) {
  stockQuotes.get().then(quotes => {
    this.companies = quotes;
  });

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

CompaniesTableController.$inject = ["stockQuotes"];

export default CompaniesTableController;
