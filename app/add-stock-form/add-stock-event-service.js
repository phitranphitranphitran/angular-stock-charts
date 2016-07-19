function AddStockEventService($rootScope) {
  this.broadcast = (symbol) => {
    $rootScope.$broadcast("stockAdded", symbol);
  };
  this.listen = (callback) => {
    $rootScope.$on("stockAdded", callback);
  };
}

AddStockEventService.$inject = ["$rootScope"];

export default AddStockEventService;
