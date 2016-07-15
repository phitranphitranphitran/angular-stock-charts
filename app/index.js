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
  .controller("TestController", ["stockHistoricalData", function(stockHistoricalData) {
    stockHistoricalData.get().then(res => {
      this.data = res.data.query.results.quote;
    });
  }]);
  // .controller("TestController", ["stockQuotes", function(stockQuotes) {
  //   stockQuotes.get().then(res => {
  //     this.data = res.data.query.results.quote.map(quote => ({
  //       symbol: quote.symbol
  //     }));
  //   });
  // }]);

export default app;
