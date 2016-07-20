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
        if (err.type === "info") {
          toastr.info(err.message);
        } else if (err.message) {
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
