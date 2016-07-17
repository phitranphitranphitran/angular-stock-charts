function companiesTableController(stockQuotes) {
  stockQuotes.get().then(data => {
    this.companies = data.query.results.quote;
  });
  this.setActiveStock = function(index) {
    console.log(this.companies[index]["Symbol"]);
  };
}

companiesTableController.$inject = ["stockQuotes"];

export default companiesTableController;
