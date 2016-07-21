function ActiveStockService(symbolsStore, addStockEvent) {
  let activeStock = symbolsStore.getSymbols()[0];

  this.setActiveStock = (symbol) => {
    activeStock = symbol;
  };

  this.getActiveStock = () => {
    return activeStock;
  };

  // new stock becomes active stock by default
  addStockEvent.listen(false, (event, symbol) => {
    this.setActiveStock(symbol);
  });
}

ActiveStockService.$inject = ["symbolsStore", "addStockEvent"];

export default ActiveStockService;
