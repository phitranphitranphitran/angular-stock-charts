function ApiSelectorService($rootScope, apiConstants) {
  let selected = apiConstants.yahoo;

  this.setApi = (api) => {
    selected = api;
    $rootScope.broadcast("apiChanged", api);
  };

  this.getApi = () => {
    return selected;
  };

  this.listen = (scope, callback) => {
    const handler = $rootScope.$on("apiChanged", callback);
    if (scope) {
      scope.$on("$destroy", handler);
    }
  };
}

ApiSelectorService.$inject = ["$rootScope", "apiConstants"];

export default ApiSelectorService;
