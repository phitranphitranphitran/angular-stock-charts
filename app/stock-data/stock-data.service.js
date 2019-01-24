// see README in api-utils folder to see how to add another API data source

import apiUtils from "./api-utils";
import { startDate, endDate } from "./config";

class StockDataService {

  constructor($http, $q, symbolsStore, apiSelector, toastr) {
    this.$http = $http;
    this.$q = $q;
    this.symbolsStore = symbolsStore;
    this.apiSelector = apiSelector;
    this.toastr = toastr;

    // keeps track of all ongoing request promises and for which symbols
    this.requests = new Map();

    this.onUpdateApi(apiSelector.getApi());

    apiSelector.listen(false, (event, api) => {
      this.onUpdateApi(api);
      this.get(symbolsStore.getSymbols());
    });
  }

  // on API change, simply replace sendRequest and extractData with API-specific methods from apiUtils
  onUpdateApi(api) {
    this.data = false;
    this.requests.clear();
    this.sendRequest = apiUtils[api].sendRequest(this.$http, this.$q);
    this.extractData = apiUtils[api].extractData;
  }

  // main getter method
  // returns a Promise that resolves to the stocks data
  // determines when the Promise should resolve based on any ongoing requests
  get(symbols) {
    // if "symbols" arg is present, that means new stock data is to be added
    const adding = symbols ? true : false;

    if (!this.requests.size && !adding) {
      // simplest case, return data stored if no requests are happening
      if (this.data) {
        return this.$q(resolve => resolve(this.data));
      }
      // no data, requests, and not adding - get all symbols
      else {
        return this.get(this.symbolsStore.getSymbols());
      }
    }

    if (this.requests.size) {
      // a get() call while requests are happening
      if (!adding) {
        // return the updated data after all pending requests finish
        const allRequests = Array.from(this.requests.values());
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
          if (!data) {
            this.toastr.error(`No stock data for ${symbols}`);
            return reject({ message: `No stock data for ${symbols}`, type: "nodata" });
          }
          // assign data on initial get, otherwise combine new data
          this.data = !this.data ? data : this.combineData(this.data, data);
          return resolve(this.data);
        })
        .catch(err => {
          this.toastr.error("Error - Request failed", {
            // sticky toast if initial fetch fails
            timeOut: this.data ? 5000 : 0,
            extendedTimeOut: this.data ? 1000 : 0
          });
          return reject(err);
        })
        .finally(() => this.clearRequests(symbols));
    });

    this.trackRequest(symbols, request);

    return request;
  }

  clearRequests(symbols) {
    symbols.forEach(symbol => this.requests.delete(symbol));
  }

  trackRequest(symbols, request) {
    symbols.forEach(symbol => this.requests.set(symbol, request));
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
      if (this.requests.has(symbol)) {
        return reject({
          message: `${symbol} is already being added`,
          promise: this.requests.get(symbol),
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
    return this.data && this.data.histories.hasOwnProperty(symbol);
  }

  getRequestingSymbols() {
    return Array.from(this.requests.keys());
  }

  // checks if requests for certain symbols are already being made.
  // returns an array of Promises for each symbol currently being requested
  // and an array of the symbols that are not being requested
  splitSymbolsByStatus(symbols) {
    const requests = [];
    const toBeFetched = [];
    symbols.forEach(symbol => {
      if (this.requests.has(symbol)) {
        requests.push(this.requests.get(symbol));
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

StockDataService.$inject = ["$http", "$q", "symbolsStore", "apiSelector", "toastr"];

export default StockDataService;
