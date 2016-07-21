// import { startDate, endDate } from "../stock-data/config";

function PriceHistoryChartController($scope, stockData, apiSelector, activeStock) {
  // highcharts-ng config object
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
      text: "Stock Price History",
      style: {
        "fontFamily": ["Montserrat", "sans-serif"]
      }
    },
    xAxis: {
      title: { text: "Date" },
      type: "datetime",
      gridLineWidth: 1
    },
    yAxis: {
      title: { text: "Closing Price (USD)" }
    }
  };

  const updateChart = (symbol) => {
    const activeStock = this.histories[symbol];
    this.chartConfig = Object.assign(this.chartConfig, {
      title: {
        text: `${symbol} Stock Price History`
      },
      series: [{
        name: activeStock.name || symbol,
        data: this.histories ? activeStock.history : [],
        marker: { symbol: "circle" },
        tooltip: {
          pointFormat: `<span style="color:{point.color}">\u25CF</span> ${symbol}: <b>{point.y}</b><br/>`
        }
      }]
    });
  };

  const getHistories = () => {
    stockData.get().then(data => {
      // expects a hash of companies' stock price histories
      this.histories = data.histories;
      updateChart(activeStock.getActiveStock());
    });
  };

  getHistories();

  // reload data and chart on API or active stock change
  apiSelector.listen($scope, getHistories);
  $scope.$watch(() => activeStock.getActiveStock(), (activeStock) => {
    if (this.histories && this.histories.hasOwnProperty(activeStock)) {
      return updateChart(activeStock);
    }
    // new stock becomes active stock by default
    return getHistories();
  });
}

PriceHistoryChartController.$inject = ["$scope", "stockData", "apiSelector", "activeStock"];

export default PriceHistoryChartController;
