// convert to hash, take only necessary data and simplify property names
export function extractQuotes(data) {
  let quotes = data.query.results.quote;
  if (!quotes.length) {
    quotes = [quotes];
  }
  return quotes.map(company => ({
    symbol: company["Symbol"],
    name: company["Name"],
    currentPrice: Number(company["LastTradePriceOnly"]),
    marketCapFormatted: company["MarketCapitalization"],
    marketCap: marketCapToNum(company["MarketCapitalization"])
  }));

  // converts a formatted market cap string from the API response into a Number
  function marketCapToNum(mcString) {
    const suffix = mcString.charAt(mcString.length-1);
    let mcNum;
    switch(suffix) {
      // billions
      case "B":
        mcNum = Number(mcString.replace("B", "")) * 1000000000;
        break;
      // millions
      case "M":
        mcNum = Number(mcString.replace("M", "")) * 1000000;
        break;
      // < 1 million, no suffix, remove commas
      default:
        mcNum = Number(mcString.replace(",", ""));
    }
    return mcNum;
  }
}

// transforms raw API data points to a hash of price histories for each company
export function extractHistories(data) {
  const histories = createHistoriesHash(data);
  // sort each company's data series
  for (let symbol in histories) {
    if (histories.hasOwnProperty(symbol)) {
      histories[symbol].history = sortDataPoints(histories[symbol].history);
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
        histories[symbol] = {
          name: symbol,
          history: []
        };
      }
      histories[symbol].history.push(formatDataPoint(dataPoint));
    });
    return histories;
  }
  // transforms a data point to a format compatible with Highcharts
  function formatDataPoint(dataPoint) {
    const time = (new Date(dataPoint["Date"])).getTime();
    const price = Number(dataPoint["Close"]);
    return [time, price];
  }
  function sortDataPoints(series) {
    // Yahoo API gives data points in descending time; must reverse for Highcharts
    return series.reverse();
  }
}
