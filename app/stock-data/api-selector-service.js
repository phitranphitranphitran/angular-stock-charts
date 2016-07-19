import { APIS } from "../constants";

function ApiSelectorService($rootScope) {
  let selected = APIS.YAHOO;

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

ApiSelectorService.$inject = ["$rootScope"];

export default ApiSelectorService;
