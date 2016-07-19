function AddStockFormController(stockData, addStockEvent, toastr) {
  this.fetching = false;
  this.onSubmit = (symbol) => {
    symbol = symbol.toUpperCase();
    return stockData.hasSymbol(symbol)
      .then(hasSymbol => {
        if (hasSymbol) {
          toastr.info(`${symbol} is already present`);
        } else {
          this.fetching = true;
          return stockData.add(symbol);
        }
      })
      .then(data => {
        if (data) {
          toastr.success(`${symbol} added`);
          addStockEvent.broadcast(symbol);
        }
      })
      .catch(err => {
        if (err.message) {
          toastr.error(err.message);
        } else {
          toastr.error("Error - Request failed");
        }
      })
      .finally(() => {
        this.fetching = false;
      });
  };
}

AddStockFormController.$inject = ["stockData", "addStockEvent", "toastr"];

export default AddStockFormController;
