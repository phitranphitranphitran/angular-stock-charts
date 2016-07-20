function AddStockFormController(stockData, addStockEvent, toastr) {
  this.fetching = false;

  this.onSubmit = (symbol) => {
    symbol = symbol.toUpperCase();
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
