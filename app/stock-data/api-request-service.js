// abstract class for an API request service
// only fetches on initial get or on API changes, stores data after

class ApiRequestService {
  constructor($q, apiSelector) {
    if (new.target === ApiRequestService) {
      throw new Error("Cannot instantiate ApiService directly (abstract class)");
    }
    if (!this.extractData) {
      throw new Error("Must implement extractData (abstract method)");
    }
    this.$q = $q;
    this.apiSelector = apiSelector;

    this.data = false;
    this.fetching = false;
  }
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
  onUpdateApi(api) {
    return api; // default implementation, does nothing
  }
  extractData(res) {
    return res; // default implementation, no formatting
  }
}

ApiRequestService.$inject = ["$http", "$q", "apiSelector"];

export default ApiRequestService;
