function AddStockEventService($rootScope) {
  this.broadcast = (symbol) => {
    $rootScope.$broadcast("stockAdded", symbol);
  };
  this.listen = (scope, callback) => {
    const handler = $rootScope.$on("stockAdded", callback);
    if (scope) {
      scope.$on("$destroy", handler);
    }
  };
}

AddStockEventService.$inject = ["$rootScope"];

export default AddStockEventService;
