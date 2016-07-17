// returns a URL that will request stock quotes for the given company symbols
export function getQuotesUrl(symbols) {
  const query = `select * from yahoo.finance.quotes
    where symbol in (${formatSymbols(symbols)})`;

  return getApiReqUrl(query);
}

// returns a URL that will request stock prices for company symbols over the
// given range in time
export function getHistoriesUrl(symbols, startDate, endDate) {
  const query = `select * from yahoo.finance.historicaldata
    where symbol in (${formatSymbols(symbols)})
    and startDate = "${formatDate(startDate)}"
    and endDate = "${formatDate(endDate)}"`;

  return getApiReqUrl(query);
}

// embeds a YQL query into a Yahoo Finance API request URL
function getApiReqUrl(query) {
  return encodeURI(`https://query.yahooapis.com/v1/public/yql?q=${query}
    &format=json
    &env=store://datatables.org/alltableswithkeys`);
}

// converts an array of strings for company symbols to a YQL-compatible string
function formatSymbols(symbols) {
  return symbols.map(symbol => `"${symbol}"`).join(", ");
}

// converts a Date object to a YQL-compatible date string
function formatDate(date) {
  return date.toISOString().substr(0, 10);
}
