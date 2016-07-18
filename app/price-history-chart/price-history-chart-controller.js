import { startDate, endDate } from "../stock-data/config";

function PriceHistoryChartController($scope, stockHistories) {
  stockHistories.get().then(data => {
    this.histories = getPriceHistories(data);
    updateChart(this.activeStock);

    // transforms raw API data points to a hash of price histories for each company
    function getPriceHistories(data) {
      const histories = createHistoriesHash(data);
      // sort each company's data series
      for (let symbol in histories) {
        if (histories.hasOwnProperty(symbol)) {
          histories[symbol] = sortDataPoints(histories[symbol]);
        }
      }
      return histories;

      // uses API data to create hash with the form { companySymbol: [dataSeries] }
      function createHistoriesHash(data) {
        const histories = {};
        // iterate through each raw data point
        data.query.results.quote.forEach(dataPoint => {
          const symbol = dataPoint["Symbol"];
          if (!histories.hasOwnProperty(symbol)) {
            histories[symbol] = [];
          }
          histories[symbol].push(formatDataPoint(dataPoint));
        });
        return histories;
      }
      // transforms a data point to a format compatible with charting library
      function formatDataPoint(dataPoint) {
        const time = (new Date(dataPoint["Date"])).getTime();
        const price = +Number(dataPoint["Close"]).toFixed(2);
        return [time, price];
      }
      function sortDataPoints(series) {
        // Yahoo API gives data points in descending time; must reverse for Highcharts
        return series.reverse();
      }
    }
  });

  this.chartConfig = {
    options: {
      chart: {
        type: "line"
      },
      plotOptions: {
        line: { color: "#F37121" }
      }
    },
    title: {
      style: {
        "fontFamily": ["Montserrat", "sans-serif"]
      }
      // text: this.activeStock
    },
    xAxis: {
      title: { text: "Date" },
      type: "datetime",
      gridLineWidth: 1
    },
    yAxis: {
      title: { text: "Stock Price (USD)" }
    },
    series: [{
      // name: this.activeStock,
      // data: this.histories ? this.histories[this.activeStock] : []
    }]
  };

  const updateChart = (activeStock) => {
    this.chartConfig.title.text =
      `${activeStock} Stock Price From ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;
    this.chartConfig.series[0].name = activeStock;
    this.chartConfig.series[0].data = this.histories ?
      this.histories[activeStock] : [];
  };

  // update chart series and labels when activeStock changes
  $scope.$watch("$ctrl.activeStock", updateChart);
}

PriceHistoryChartController.$inject = ["$scope", "stockHistories"];

export default PriceHistoryChartController;
