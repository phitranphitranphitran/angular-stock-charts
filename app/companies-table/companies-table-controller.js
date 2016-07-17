function CompaniesTableController(stockQuotes) {

  stockQuotes.get().then(data => {
    this.companies = data.query.results.quote.map(company => {
      // simpler property names
      company.symbol = company["Symbol"];
      company.name = company["Name"];
      company.currentPrice = company["LastTradePriceOnly"];
      company.marketCap = company["MarketCapitalization"];
      return company;
    });
  });

  this.setActiveStock = function(index) {
    console.log(this.companies[index]["Symbol"]);
  };

  // determines if a company row should be shown or hidden in the table
  // according to the user search input
  this.isNotFiltered = function(index) {
    if (!this.searchString) {
      return true;
    }
    const company = this.companies[index];
    const name = company.name.toLowerCase();
    const symbol = company.symbol.toLowerCase();
    const searchString = this.searchString.toLowerCase();

    return name.includes(searchString) || symbol.includes(searchString);
  };
}

CompaniesTableController.$inject = ["stockQuotes"];

export default CompaniesTableController;
