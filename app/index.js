import angular from "angular";
import appTemplate from "./app.html";

// angular modules
import "./stock-data";

const app = angular.module("app", [
    "app.stockData"
  ])
  .component("app", {
    template: appTemplate
  })
  .controller("StocksController", ["stockQuotes", "stockHistories",
    function(stockQuotes, stockHistories)
  {
    stockQuotes.get().then(data => {
      this.quotes = data;
    });

    stockHistories.get().then(data => {
      this.histories = data;
    });
  }]);

export default app;
