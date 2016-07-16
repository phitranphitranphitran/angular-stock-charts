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
      this.quotes = data.query.results.quote;
    });

    stockHistories.get().then(data => {
      this.histories = data.query.results.quote;
    });

    this.get = function() {
      stockQuotes.get().then(data => {
        console.log(data.query.created);
      });
      stockHistories.get().then(data => {
        console.log(data.query.created);
      });
    };
  }]);

export default app;
