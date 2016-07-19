function AddStockFormController($rootScope, stockData, addStockEvent, toastr) {
  this.onSubmit = (symbol) => {
    symbol = symbol.toUpperCase();
    return stockData.hasSymbol(symbol)
      .then(hasSymbol => {
        if (hasSymbol) {
          toastr.info(`${symbol} is already present`);
          return;
        }
        return stockData.add(symbol);
      })
      .then(data => {
        if (data) {
          toastr.success(`${symbol} added`);
          addStockEvent.broadcast(symbol);
        }
      })
      .catch(err => {
        toastr.error("Error - Request failed");
      });
  };
}

AddStockFormController.$inject = ["$rootScope", "stockData", "addStockEvent", "toastr"];

export default AddStockFormController;
