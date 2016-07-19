import * as apiUtils from "./api-utils";
import { symbols, startDate, endDate } from "./config";
// import { APIS } from "../constants";

class StockDataService {

  constructor($http, $q, apiSelector) {
    this.$http = $http;
    this.$q = $q;
    this.apiSelector = apiSelector;

    this.data = false; // persist data to minimize network requests
    this.fetching = false;
  }

  // primary getter method
  // only sends network requests after an API change or when no data is iniitally present
  get() {
    // for when a get() call occurs when already fetching; returns the first promise
    if (this.fetching) {
      return this.fetching;
    }
    // get() will configure itself to API changes automatically
    // so client code does not need to call onUpdateApi.
    // small note: an API change won't affect the service if done while fetching
    const api = this.apiSelector.getApi();
    if (this.api !== api) {
      this.api = api;
      this.onUpdateApi(api);
      this.data = false;
    }
    return this.fetching = this.$q((resolve, reject) => {
      // doesn't fetch if data is already present from prior network request
      if (!this.data) {
        return this.fetchData()
          .then(res => this.extractData(res))
          .then(data => {
            this.data = data;
            this.fetching = false;
            return resolve(data);
          })
          .catch(reject);
      }
      return resolve(this.data);
    });
  }

  // sends 2 simultaneous network requests: one for stock quotes, one for stock histories
  fetchData() {
    const quotesUrl = process.env.NODE_ENV === "production" ?
      this.getQuotesUrl(symbols) : "/quotes.mock.json";
    const historiesUrl = process.env.NODE_ENV === "production" ?
      this.getHistoriesUrl(symbols, startDate, endDate) : "/histories.mock.json";
    return this.$q.all([
      this.$http.get(quotesUrl),
      this.$http.get(historiesUrl)
    ]);
  }

  // formats and aggregates data received from API calls for use with directives and controllers
  extractData(res) {
    const quotes = this.extractQuotes(res[0].data);
    const histories = this.extractHistories(res[1].data);
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

  // on API change, simply replace get- and extract- methods with the API-specific ones from apiUtils
  onUpdateApi(api) {
    switch(api) {
      // case APIS.YAHOO:
      default: {
        this.getQuotesUrl = apiUtils.yahoo.urlUtils.getQuotesUrl;
        this.getHistoriesUrl = apiUtils.yahoo.urlUtils.getHistoriesUrl;
        this.extractQuotes = apiUtils.yahoo.dataUtils.extractQuotes;
        this.extractHistories = apiUtils.yahoo.dataUtils.extractHistories;
      }
    }
  }

}

StockDataService.$inject = ["$http", "$q", "apiSelector"];

export default StockDataService;
