function AddStockFormController(stockData, addStockEvent, symbolsStore, toastr) {
  this.fetching = false;

  this.onSubmit = (symbol) => {
    symbol = symbol.toUpperCase();
    if (symbol === this.symbol) {
      return;
    }
    this.symbol = symbol;
    this.fetching = true;

    return stockData.add(symbol)
      .then(() => {
        toastr.success(`${symbol} added`);
        addStockEvent.broadcast(symbol);
        symbolsStore.addSymbol(symbol);
      })
      .catch(err => {
        switch (err.type) {
          case "duplicate":
            toastr.info(err.message);
            break;
          case "fetching":
            return err.promise; // keep spinner spinning until resolved
          default:
            toastr.error(`Error - Request for ${symbol} failed`);
        }
      })
      .finally(() => {
        this.fetching = false;
      });
  };
}

AddStockFormController.$inject = ["stockData", "addStockEvent", "symbolsStore", "toastr"];

export default AddStockFormController;
