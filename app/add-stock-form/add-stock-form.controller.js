function AddStockFormController(stockData, addStockEvent, toastr) {
  this.fetching = false;

  this.onSubmit = (symbol) => {
    symbol = symbol.trim().toUpperCase();
    if (symbol === this.symbol) {
      return;
    }
    this.symbol = symbol;
    this.fetching = true;

    return stockData.add(symbol)
      .then(() => {
        toastr.success(`${symbol} added`);
        addStockEvent.broadcast(symbol);
      })
      .catch(err => {
        switch (err.type) {
          case "duplicate":
            toastr.info(err.message);
            break;
          case "fetching":
            return err.promise; // keep spinner spinning until resolved
          default:
            this.symbol = "";
        }
      })
      .finally(() => {
        this.fetching = false;
      });
  };
}

AddStockFormController.$inject = ["stockData", "addStockEvent", "toastr"];

export default AddStockFormController;
