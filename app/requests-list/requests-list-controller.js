function RequestsListController($scope, $timeout, stockData, toastr) {
  this.toasts = {};
  let initialLoad = true;
  let toastSettings =  {
    iconClass: "toast-adding",
    timeOut: 0,
    extendedTimeOut: 0
  };

  $scope.$watch(() => stockData.requests, (latestRequests) => {
    if (initialLoad) {
      this.toasts.INITIAL_LOAD = toastr.info("Getting stocks data", toastSettings);
      initialLoad = false;
      return;
    }
    if (latestRequests) {
      // open toasts for new requests
      Object.keys(latestRequests).forEach(symbol => {
        if (!this.toasts.hasOwnProperty(symbol)) {
          this.toasts[symbol] = toastr.info(`Adding ${symbol}`, toastSettings);
        }
      });
      // close toasts for finished requests
      Object.keys(this.toasts).forEach(symbol => {
        if (!latestRequests.hasOwnProperty(symbol)) {
          // cannot use toastr.clear because of https://github.com/Foxandxss/angular-toastr/issues/136
          // so must manually remove instead
          this.toasts[symbol].el.remove();
          delete this.toasts[symbol];
        }
      });
    }
    // close all toasts
    else {
      Object.keys(this.toasts).forEach(symbol => {
        this.toasts[symbol].el.remove();
        delete this.toasts[symbol];
      });
    }
  }, true);
}

RequestsListController.$inject = ["$scope", "$timeout", "stockData", "toastr"];

export default RequestsListController;
