import "./loader-vendor.scss"; // loading animation
import "./loader-override.scss";

function RequestsListController($scope, $timeout, stockData, toastr) {
  this.toasts = {};
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
    const toast = this.toasts[symbol];
    // check if timeout promise
    if (typeof toast.then === "function" && typeof toast.catch === "function") {
      $timeout.cancel(toast);
    } else {
      // cannot use toastr.clear because of https://github.com/Foxandxss/angular-toastr/issues/136
      // so must manually remove instead
      toast.el.remove();
    }
    delete this.toasts[symbol];
  };

  $scope.$watch(() => stockData.requests, (latestRequests) => {
    if (initialLoad) {
      this.toasts.INITIAL_LOAD = toastr.info(toastTemplate("Getting stocks data"), toastSettings);
      initialLoad = false;
      return;
    }
    if (latestRequests) {
      // open toasts for new requests
      Object.keys(latestRequests).forEach(symbol => {
        if (!this.toasts.hasOwnProperty(symbol)) {
          // prevent jarring flash by only showing toast for "long" requests
          this.toasts[symbol] = $timeout(() => {
            this.toasts[symbol] = toastr.info(toastTemplate(`Adding ${symbol}`), toastSettings);
          }, 500);
        }
      });
      // close toasts for finished requests
      Object.keys(this.toasts).forEach(symbol => {
        if (!latestRequests.hasOwnProperty(symbol)) {
          removeToast(symbol);
        }
      });
    }
    // close all toasts
    else {
      Object.keys(this.toasts).forEach(symbol => {
        removeToast(symbol);
      });
    }
  }, true);
}

RequestsListController.$inject = ["$scope", "$timeout", "stockData", "toastr"];

export default RequestsListController;
