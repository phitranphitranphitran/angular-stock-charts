import { startDate, endDate } from "../stock-data/config";

function PriceHistoryChartController($scope, stockHistories, apiSelector) {
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
      // text: `${activeStock} Stock Price From ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;
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

  const getHistories = () => {
    stockHistories.get().then(histories => {
      this.histories = histories;
      updateChart(this.activeStock);
    });
  };

  getHistories();

  // reload data and chart on API change
  $scope.$watch(() => apiSelector.getApi(), getHistories);

  // update chart series and labels when activeStock changes
  $scope.$watch(() => this.activeStock, updateChart);
}

PriceHistoryChartController.$inject = ["$scope", "stockHistories", "apiSelector"];

export default PriceHistoryChartController;
