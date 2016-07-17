function PriceHistoryChartController(stockHistories) {
  stockHistories.get().then(data => {
    this.histories = {};
    // transform raw API data points to a hash of data series for each company
    data.query.results.quote.forEach(dataPoint => {
      const symbol = dataPoint["Symbol"];
      if (!this.histories.hasOwnProperty(symbol)) {
        this.histories[symbol] = [];
      }
      const time = (new Date(dataPoint["Date"])).getTime();
      const price = +Number(dataPoint["Close"]).toFixed(2);

      this.histories[symbol].push([time, price]);
    });
    console.log(this.histories);
    this.chartConfig.series[0].data = this.histories["XOM"];
  });



  this.chartConfig = {
    options: {
      chart: {
        type: "line"
      }
    },
    title: {
      text: "Hello"
    },
    xAxis: {
      title: { text: "Date" },
      type: "datetime"
    },
    yAxis: {
      title: { text: "Stock Price (USD)" }
    },
    series: [{
      // name
    }]
  };
}

PriceHistoryChartController.$inject = ["stockHistories"];

export default PriceHistoryChartController;
