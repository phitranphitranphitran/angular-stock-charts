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
      this.quotes = data.query.results.quote[0]["Name"];
    });

    stockHistories.get().then(data => {
      this.history = data.query.results.quote[0]["Symbol"]
       + " - " + data.query.results.quote[0]["Close"];
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
