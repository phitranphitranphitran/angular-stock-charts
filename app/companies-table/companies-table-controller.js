function CompaniesTableController(stockQuotes) {

  stockQuotes.get().then(data => {
    // take only necessary data and simplify property names
    this.companies = data.query.results.quote.map(company => ({
      symbol: company["Symbol"],
      name: company["Name"],
      currentPrice: Number(company["LastTradePriceOnly"]).toFixed(2),
      marketCapFormatted: company["MarketCapitalization"],
      marketCap: marketCapToNum(company["MarketCapitalization"])
    }));
  });

  // table rows initially ordered by symbol ascending
  this.orderByField = "symbol";
  this.orderReverse = false;

  // will show company in table if searchString is substring of name or symbol
  this.filterByNameOrSymbol = function(searchString) {
    return function(company) {
      if (!searchString) {
        return true;
      }
      const name = company.name.toLowerCase();
      const symbol = company.symbol.toLowerCase();
      searchString = searchString.toLowerCase();

      return name.includes(searchString) || symbol.includes(searchString);
    };
  };

  this.setActiveStock = function(company) {
    this.activeStock = company;
    console.log(company.symbol);
  };

}

CompaniesTableController.$inject = ["stockQuotes"];

export default CompaniesTableController;

// converts a formatted market cap string from the API response into a Number
function marketCapToNum(mcString) {
  const suffix = mcString.charAt(mcString.length-1);
  let mcNum;
  switch(suffix) {
    // billions
    case "B":
      mcNum = Number(mcString.replace("B", "")) * 1000000000;
      break;
    // millions
    case "M":
      mcNum = Number(mcString.replace("M", "")) * 1000000;
      break;
    // < 1 million, no suffix, remove commas
    default:
      mcNum = Number(mcString.replace(",", ""));
  }
  return mcNum;
}
