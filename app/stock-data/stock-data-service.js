import * as apiUtils from "./api-utils";
import { startDate, endDate } from "./config";
// import { APIS } from "../constants";

class StockDataService {

  constructor($http, $q, symbolsStore, apiSelector) {
    this.$http = $http;
    this.$q = $q;
    this.symbolsStore = symbolsStore;
    this.apiSelector = apiSelector;

    this.onUpdateApi(apiSelector.getApi());

    apiSelector.listen(false, (event, api) => {
      this.onUpdateApi(api);
      this.get(symbolsStore.getSymbols());
    });
  }

  // on API change, simply replace sendRequest and extractData with API-specific methods from apiUtils
  onUpdateApi(api) {
    this.data = false;
    this.requests = false;
    switch(api) {
      // case APIS.YAHOO:
      default: {
        this.sendRequest = apiUtils.yahoo.sendRequest(this.$http, this.$q);
        this.extractData = apiUtils.yahoo.extractData;
      }
    }
  }

  // main getter method
  // returns a Promise that resolves to the stocks data
  // determines when the Promise should resolve based on any ongoing requests
  get(symbols) {
    // if "symbols" arg is present, that means new stock data is to be added
    const adding = symbols ? true : false;

    if (!this.requests && !adding) {
      // simplest case, return data stored if no requests are happening
      if (this.data) {
        return this.$q(resolve => resolve(this.data));
      }
      // get all symbols
      else {
        return this.get(this.symbolsStore.getSymbols());
      }
    }

    if (this.requests) {
      // a get() call while requests are happening
      if (!adding) {
        // return the updated data after all pending requests finish
        const allRequests = Object.keys(this.requests).map(symbol => this.requests[symbol]);
        return this.$q.all(allRequests).then(() => this.data);
      }
      // adding data while requests are ongoing, a little trickier
      else {
        const { requests, toBeFetched } = this.splitSymbolsByStatus(symbols);
        if (!toBeFetched.length) {
          return this.$q.all(requests).then(() => this.data);
        }
        // a mix of ongoing and new requests; need all to resolve
        return this.$q.all([
            ...requests,
            this.fetchData(toBeFetched)
          ])
          .then(() => this.data);
      }
    }

    return this.fetchData(symbols);
  }

  // sends the API request and extracts the data
  // also handles bookkeeping of ongoing requests
  fetchData(symbols) {
    const request = this.$q((resolve, reject) => {
      // sendRequest varies by API
      return this.sendRequest(symbols, startDate, endDate)
        // extractData varies by API
        .then(res => this.extractData(res))
        .then(data => {
          this.clearRequests(symbols);
          if (!data) {
            return reject(new Error("No stock data, please double check the symbol"));
          }
          // assign data on initial get, otherwise combine new data
          this.data = !this.data ? data : this.combineData(this.data, data);
          return resolve(this.data);
        })
        .catch(reject);
    });

    this.trackRequest(symbols, request);

    return request;
  }

  clearRequests(symbols) {
    symbols.forEach(symbol => {
      delete this.requests[symbol];
    });
    // if no more fetches, set to false ({} isn't falsey)
    if (!Object.keys(this.requests).length) {
      this.requests = false;
    }
  }

  trackRequest(symbols, request) {
    if (!this.requests) {
      this.requests = {};
    }
    symbols.forEach(symbol => {
      this.requests[symbol] = request;
    });
  }

  // adds a single new stock data entry to the store
  add(symbol) {
    return this.$q((resolve, reject) => {
      if (this.hasSymbol(symbol)) {
        return reject({
          message: `${symbol} already present`,
          type: "duplicate"
        });
      }
      if (this.requests.hasOwnProperty(symbol)) {
        return reject({
          message: `${symbol} is already being added`,
          promise: this.requests[symbol].then(resolve).catch(reject), // try remove then resolve catch reject
          type: "fetching"
        });
      }
      return this.get([symbol])
        .then(() => {
          this.symbolsStore.addSymbol(symbol);
          return resolve(this.data);
        })
        .catch(reject);
    });
  }

  hasSymbol(symbol) {
    return this.data.histories.hasOwnProperty(symbol);
  }

  // checks if requests for certain symbols are already being made.
  // returns an array of Promises for each symbol currently being requested
  // and an array of the symbols that are not being requested
  splitSymbolsByStatus(symbols) {
    const requests = [];
    const toBeFetched = [];
    symbols.forEach(symbol => {
      if (this.requests.hasOwnProperty(symbol)) {
        requests.push(this.requests[symbol]);
      } else {
        toBeFetched.push(symbol);
      }
    });
    return { requests, toBeFetched };
  }

  combineData(data, newData) {
    return {
      quotes: [ ...data.quotes, ...newData.quotes ],
      histories: { ...data.histories, ...newData.histories }
    };
  }

}

StockDataService.$inject = ["$http", "$q", "symbolsStore", "apiSelector"];

export default StockDataService;
