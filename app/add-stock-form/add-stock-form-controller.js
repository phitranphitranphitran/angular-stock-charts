function AddStockFormController($rootScope, stockData, addStockEvent) {
  this.onSubmit = (symbol) => {
    // TODO: validate symbol
    return stockData.add(symbol)
      .then(() => {
        addStockEvent.broadcast(symbol);
      })
      .catch(console.error);
  };
}

AddStockFormController.$inject = ["$rootScope", "stockData", "addStockEvent"];

export default AddStockFormController;
