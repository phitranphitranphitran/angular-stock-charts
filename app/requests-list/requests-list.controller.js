import "./loader-vendor.scss"; // loading animation
import "./loader-override.scss";

function RequestsListController($scope, $timeout, stockData, toastr) {
  this.toasts = new Map();
  let initialLoad = true;

  const toastSettings =  {
    iconClass: "toast-adding",
    timeOut: 0,
    extendedTimeOut: 0,
    allowHtml: true
  };

  const toastTemplate = (text) =>
    `<div class="loader">Loading...</div>
      <span class="toast-adding-text">${text}</span>
    </div>`;

  const removeToast = (symbol) => {
    const toast = this.toasts.get(symbol);
    // check if timeout promise
    if (typeof toast.then === "function" && typeof toast.catch === "function") {
      $timeout.cancel(toast);
    } else {
      // cannot use toastr.clear because of https://github.com/Foxandxss/angular-toastr/issues/136
      // so must manually remove instead
      toast.el.remove();
    }
    this.toasts.delete(symbol);
  };

  $scope.$watch(() => stockData.getRequestingSymbols(), (latestRequests) => {
    if (initialLoad) {
      this.toasts.set("INITIAL_LOAD", toastr.info(toastTemplate("Getting stocks data"), toastSettings));
      initialLoad = false;
      return;
    }
    if (latestRequests.length) {
      // open toasts for new requests
      latestRequests.forEach(symbol => {
        if (!this.toasts.has(symbol)) {
          // prevent jarring flash by only showing toast for "long" requests
          this.toasts.set(symbol, $timeout(() => {
            this.toasts.set(symbol, toastr.info(toastTemplate(`Adding ${symbol}`), toastSettings));
          }, 500));
        }
      });
      // close toasts for finished requests
      this.toasts.forEach((request, symbol) => {
        if (!latestRequests.indexOf(symbol) <= -1) {
          removeToast(symbol);
        }
      });
    }
    // close all toasts
    else {
      this.toasts.forEach((request, symbol) => removeToast(symbol));
    }
  }, true);
}

RequestsListController.$inject = ["$scope", "$timeout", "stockData", "toastr"];

export default RequestsListController;
