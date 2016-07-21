To add a new stock data API to use, simply implement and export the required methods `sendRequest` and `extractData`.

#### sendRequest($http, $q) => function(symbols, startDate, endDate)

Inside this method you can specify how the data will be fetched, i.e. the URL and querystrings.

This method should return an inner function that returns a Promise that will resolve to the response object after the API call.

The API response will be passed as-is to `extractData`.

**Outer function**

Arguments:

- `$http, $q`: Angular services that should be used to make a request to the API URL.

Returns:

An inner function that uses $http and/or $q to make the API request for the given stock symbols and time period.

**Inner function**

Arguments:

- `symbols`: an array of stock symbol strings, Ex. ["NFLX", "MSFT", "AAPL"]

- `startDate, endDate`: Date objects for the time period to fetch data

Returns:

A Promise resulting from $http.get or a $q method that will contain the stock data after resolving.



#### extractData(res) => Object

Transforms the response object into a form usable by the `quotes-table` and `history-chart` components.

Arguments:

- `res`: the raw API response resulting from `sendRequest`

Returns:

`false` if the data is determined to be invalid or not available. Most likely will be due to an invalid stock symbol being passed. Return `false` so that the service can propagate an error message.

If the data is valid, then return an object with the following form at minimum:

```
{
    quotes: [
      {
        symbol: String,
        name: String,
        currentPrice: Number,
        marketCap: Number,
        marketCapFormatted: String
      },
      ...
    ]
    histories: {
      "SYMBOL": {
        name: String,
        history: [
          [timestamp, price], [timestamp, price], [timestamp, price], ...
        ]
      },
      ...
    }
}
```

Timestamps should also be in chronological order, i.e. the data series must be sorted (a requirement by Highcharts).

Example:

```
{
    "quotes": [
      {
        "symbol": "AAPL",
        "name": "Apple Inc.",
        "currentPrice": 99.81,
        "marketCapFormatted": "546.70B",
        "marketCap": 546700000000
      },
      {
        "symbol": "ADBE",
        "name": "Adobe Systems Incorporated",
        "currentPrice": 97.79,
        "marketCapFormatted": "48.73B",
        "marketCap": 48730000000
      },
      ...
    ],
    "histories": {
      "AAPL": {
        "name": "Apple Inc.",
        "history": [
          [1466380800000, 95.099998],
          [1466467200000, 95.910004],
          ...
        ],
      },
      "ADBE": {
        "name": "Adobe Systems Incorporated",
        "history": [
          [1466380800000, 97.989998],
          [1466467200000, 99.720001],
          ...
        ]
      }
    }
}
```
