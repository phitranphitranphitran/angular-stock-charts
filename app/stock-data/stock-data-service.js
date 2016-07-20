import * as apiUtils from "./api-utils";
import { symbols as defaultSymbols, startDate, endDate } from "./config";
// import { APIS } from "../constants";

class StockDataService {

  constructor($http, $q, apiSelector) {
    this.$http = $http;
    this.$q = $q;
    this.apiSelector = apiSelector;

    this.data = false;
    this.fetching = false;

    apiSelector.listen(false, (event, api) => {
      this.onUpdateApi(api);
      this.get();
    });
  }

  // primary getter method
  // only sends network requests after an API change or when no data is initially present.
  // if "symbols" arg is present, that means new stock data is to be added
  get(symbols) {
    // for when a get() call occurs when already fetching; returns the original promise
    if (this.fetching) {
      return this.fetching;
    }
    // get() will configure itself to API changes automatically
    // small note: an API change won't affect the service if done while fetching
    const api = this.apiSelector.getApi();
    if (this.api !== api) {
      this.api = api;
      this.onUpdateApi(api);
    }
    // doesn't fetch if data is already present from prior network request
    if (this.data && !symbols) {
      return this.$q(resolve => resolve(this.data));
    }

    return this.fetching = this.$q((resolve, reject) => {
      // fetchData varies by API
      return this.fetchData(symbols || defaultSymbols, startDate, endDate)
        // extractData varies by API
        .then(res => this.extractData(res))
        .then(data => {
          this.fetching = false;
          if (!data) {
            return reject(new Error("No stock data, please double check the symbol"));
          }
          if (!symbols) {
            this.data = data;
          } else {
            this.data = this.combineData(this.data, data);
          }
          return resolve(data);
        })
        .catch(reject);
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

  combineData(data, newData) {
    return {
      quotes: [ ...data.quotes, ...newData.quotes ],
      histories: { ...data.histories, ...newData.histories }
    };
  }

  add(symbol) {
    return this.$q((resolve, reject) => {
      return this.hasSymbol(symbol)
        .then(hasSymbol => {
          if (hasSymbol) {
            return reject({ message: `${symbol} already present`, type: "info", symbol });
          }
          return this.get([symbol]);
        })
        .then(resolve)
        .catch(reject);
    });
  }

  hasSymbol(symbol) {
    // return promise because the symbol may already be fetching
    return this.$q(resolve => {
      if (this.fetching) {
        // use histories hash for faster lookpup than quotes array
        return this.fetching.then(data => data.histories.hasOwnProperty(symbol));
      }
      return resolve(this.data.histories.hasOwnProperty(symbol));
    });
  }

}

StockDataService.$inject = ["$http", "$q", "apiSelector"];

export default StockDataService;
