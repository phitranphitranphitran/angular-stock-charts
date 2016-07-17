function CompaniesTableController(stockQuotes) {

  stockQuotes.get().then(data => {
    this.companies = data.query.results.quote.map(company => {
      // simplify property names
      company.symbol = company["Symbol"];
      company.name = company["Name"];
      company.currentPrice = Number(company["LastTradePriceOnly"]).toFixed(2);
      // market cap is formatted by default in API response
      company.marketCapFormatted = company["MarketCapitalization"];
      company.marketCap = marketCapToNum(company["MarketCapitalization"]);
      return company;
    });
  });

  // table rows initially ordered by symbol ascending
  this.orderByField = "symbol";
  this.orderReverse = false;

  this.setActiveStock = function(index) {
    console.log(this.companies[index]["Symbol"]);
  };

  // determines if a company row should be shown or hidden in the table
  // according to the user search input
  this.isNotFiltered = function(index, searchString) {
    if (!searchString) {
      return true;
    }
    const company = this.companies[index];
    const name = company.name.toLowerCase();
    const symbol = company.symbol.toLowerCase();
    searchString = searchString.toLowerCase();

    return name.includes(searchString) || symbol.includes(searchString);
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
