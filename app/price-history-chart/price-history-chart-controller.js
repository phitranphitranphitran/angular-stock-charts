import { startDate, endDate } from "../stock-data/config";

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

  const updateChart = (activeStock) => {
    this.chartConfig = Object.assign(this.chartConfig, {
      title: {
        text: `${activeStock} Stock Price From ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`
      },
      series: [{
        name: this.histories ? this.histories[activeStock].name : "",
        data: this.histories ? this.histories[activeStock].history : [],
        marker: { symbol: "circle" },
        tooltip: {
          pointFormat: `<span style="color:{point.color}">\u25CF</span> ${activeStock}: <b>{point.y}</b><br/>`
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

  // reload data and chart on API change or new stock added
  $scope.$watch(() => apiSelector.getApi(), getHistories);

  // update chart series and labels when activeStock changes
  $scope.$watch(() => activeStock.getActiveStock(), getHistories);
}

PriceHistoryChartController.$inject = ["$scope", "stockData", "apiSelector", "activeStock"];

export default PriceHistoryChartController;
