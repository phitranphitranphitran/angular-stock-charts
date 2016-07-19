import { getQuotesUrl, getHistoriesUrl } from "./url-utils";

// sends 2 simultaneous network requests: one for stock quotes, one for stock histories
export function fetchData($http, $q) {
  return function(symbols, startDate, endDate) {
    const quotesUrl = getQuotesUrl(symbols);
    const historiesUrl = getHistoriesUrl(symbols, startDate, endDate);
    return $q.all([
      $http.get(quotesUrl),
      $http.get(historiesUrl)
    ]);
  };
}

// formats and aggregates data received from API calls for use with directives and controllers
export function extractData(res) {
  if (dataIsNull(res)) {
    return false;
  }
  const quotes = extractQuotes(res[0].data);
  const histories = extractHistories(res[1].data);
  const combined = { quotes, histories };
  combined.quotes.forEach(quote => {
    const { symbol } = quote;
    // give quotes access to histories, but keep as array
    quote.history = histories[symbol].history;
    // give histories access to quotes, but keep as object
    histories[symbol] = Object.assign(histories[symbol], quote);
  });
  return combined;
}

// convert to hash, take only necessary data and simplify property names
function extractQuotes(data) {
  let quotes = data.query.results.quote;
  if (!quotes.length) {
    quotes = [quotes]; // if just one quote, put in array
  }
  return quotes.map(company => ({
    symbol: company["Symbol"],
    name: company["Name"],
    currentPrice: Number(company["LastTradePriceOnly"]),
    marketCapFormatted: company["MarketCapitalization"] || "N/A",
    marketCap: company["MarketCapitalization"] ?
      marketCapToNum(company["MarketCapitalization"]) : 0
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
function extractHistories(data) {
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

// determines from the response if no data is available or the request was invalid
function dataIsNull(res) {
  return !res[1].data.query.results;
}
