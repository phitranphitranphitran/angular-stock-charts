import * as apiUtils from "./api-utils";
import { symbols as defaultSymbols, startDate, endDate } from "./config";
// import { APIS } from "../constants";

class StockDataService {

  constructor($http, $q, apiSelector) {
    this.$http = $http;
    this.$q = $q;
    this.apiSelector = apiSelector;

    this.onUpdateApi(apiSelector.getApi());
    this.get(defaultSymbols);

    apiSelector.listen(false, (event, api) => {
      this.onUpdateApi(api);
      this.get();
    });
  }

  // on API change, simply replace fetchData and extractData with API-specific methods from apiUtils
  onUpdateApi(api) {
    this.data = false;
    this.fetching = false;
    switch(api) {
      // case APIS.YAHOO:
      default: {
        this.fetchData = apiUtils.yahoo.fetchData(this.$http, this.$q);
        this.extractData = apiUtils.yahoo.extractData;
      }
    }
  }

  // main getter method
  // only sends network requests after an API change or when no data is initially present.
  // if "symbols" arg is present, that means new stock data is to be added
  get(symbols) {
    // doesn't fetch if data is already present and no fetches are happening
    if (this.data && !this.fetching && !symbols) {
      return this.$q(resolve => resolve(this.data));
    }

    if (this.fetching) {
      if (!symbols) {
        // returns the updated data after all pending requests finish
        const totalFetches = Object.keys(this.fetching).map(symbol => this.fetching[symbol]);
        return this.$q.all(totalFetches).then(() => this.data);
      } else {
        const { fetching, toBeFetched } = this.getOngoingFetches(symbols);
        // no new requests to be made
        if (!toBeFetched.length) {
          return this.$q.all(fetching).then(() => this.data);
        }
        return this.$q.all([
            ...fetching,
            this.sendRequest(toBeFetched)
          ])
          .then(() => this.data);
      }
    }

    return this.sendRequest(symbols);
  }

  sendRequest(symbols) {
    const fetch = this.$q((resolve, reject) => {
      // fetchData varies by API
      return this.fetchData(symbols, startDate, endDate)
        // extractData varies by API
        .then(res => this.extractData(res))
        .then(data => {
          // clear references to the request in this.fetching
          symbols.forEach(symbol => {
            delete this.fetching[symbol];
          });
          if (!Object.keys(this.fetching).length) {
            this.fetching = false;
          }
          if (!data) {
            return reject(new Error("No stock data, please double check the symbol"));
          }
          // assign data on initial get, otherwise combine new data
          this.data = !this.data ? data : this.combineData(this.data, data);
          return resolve(this.data);
        })
        .catch(reject);
    });

    if (!this.fetching) {
      this.fetching = {};
    }

    symbols.forEach(symbol => {
      this.fetching[symbol] = fetch;
    });

    return fetch;
  }

  add(symbol) {
    return this.$q((resolve, reject) => {
      if (this.hasSymbol(symbol)) {
        return reject({
          message: `${symbol} already present`,
          type: "duplicate"
        });
      }
      if (this.fetching.hasOwnProperty(symbol)) {
        return reject({
          message: `${symbol} is already being added`,
          promise: this.fetching[symbol].then(resolve).catch(reject),
          type: "fetching"
        });
      }
      return this.get([symbol]).then(resolve).catch(reject);
    });
  }

  hasSymbol(symbol) {
    return this.data.histories.hasOwnProperty(symbol);
  }

  // checks if requests for certain symbols are already being made.
  // returns an array of Promises for each symbol currently being requested
  // and an array of the symbols that are not being requested
  getOngoingFetches(symbols) {
    const fetching = [];
    const toBeFetched = [];
    symbols.forEach(symbol => {
      if (this.fetching.hasOwnProperty(symbol)) {
        fetching.push(this.fetching[symbol]);
      } else {
        toBeFetched.push(symbol);
      }
    });
    return { fetching, toBeFetched };
  }

  combineData(data, newData) {
    return {
      quotes: [ ...data.quotes, ...newData.quotes ],
      histories: { ...data.histories, ...newData.histories }
    };
  }

}

StockDataService.$inject = ["$http", "$q", "apiSelector"];

export default StockDataService;
