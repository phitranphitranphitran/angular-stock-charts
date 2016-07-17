import angular from "angular";
import Highcharts from "highcharts";
window.Highcharts = Highcharts;
import "highcharts-ng";

import appTemplate from "./app.html";

// import all angular modules here
import "./stock-data";
import "./companies-table";
// import "./price-history-chart";

const app = angular.module("app", [
    "highcharts-ng",
    "app.companiesTable"
  ])
  .component("app", {
    template: appTemplate,
    controller: function() {
      this.chartConfig = {
        options: {
          chart: {
            type: "bar"
          }
        },
        series: [{
          data: [10, 15, 12, 8, 7]
        }],
        title: {
          text: "Hello"
        },
        loading: false
      };
    }
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
