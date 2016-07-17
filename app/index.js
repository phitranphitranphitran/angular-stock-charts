import angular from "angular";
import appTemplate from "./app.html";

// import all angular modules here
import "./stock-data";
import "./companies-table";

const app = angular.module("app", [
    "app.companiesTable"
  ])
  .component("app", {
    template: appTemplate
  });
  // .controller("StocksController", ["stockQuotes", "stockHistories",
  //   function(stockQuotes, stockHistories)
  // {
  //   stockQuotes.get().then(data => {
  //     this.quotes = data.query.results.quote;
  //   });
  //
  //   stockHistories.get().then(data => {
  //     this.histories = data.query.results.quote;
  //   });
  //
  //   this.get = function() {
  //     stockQuotes.get().then(data => {
  //       console.log(data.query.created);
  //     });
  //     stockHistories.get().then(data => {
  //       console.log(data.query.created);
  //     });
  //   };
  // }]);

export default app;
