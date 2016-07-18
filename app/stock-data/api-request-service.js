// abstract class for an API request service
// only fetches on initial get or on API changes, stores data after

class ApiRequestService {
  constructor($http, $q, apiSelector) {
    if (new.target === ApiRequestService) {
      throw new Error("Cannot instantiate ApiService directly (abstract class)");
    }
    if (!this.getUrl) {
      throw new Error("Must implement getUrl and specify API url (abstract method)");
    }
    this.$http = $http;
    this.$q = $q;
    this.apiSelector = apiSelector;

    this.api = apiSelector.getApi();
    this.onUpdateApi(this.api);
    this.data = null;
  }
  get() {
    const api = this.apiSelector.getApi();
    return this.$q((resolve, reject) => {
      // fetch only initially or on selected API change
      if (!this.data || this.api !== api) {
        // get() will configure itself to API changes automatically
        // so client code does not need to call onUpdateApi
        this.api = api;
        this.onUpdateApi(api);

        return this.fetchData()
          .then(data => this.formatData(data))
          .then(data => this.data = data)
          .then(resolve)
          .catch(reject);
      }
      return resolve(this.data);
    });
  }
  onUpdateApi(api) {
    return api; // default implementation, does nothing
  }
  fetchData() {
    return this.$http.get(this.getUrl()).then(res => res.data);
  }
  formatData(data) {
    return data; // default implementation, no formatting
  }
}

ApiRequestService.$inject = ["$http", "$q", "apiSelector"];

export default ApiRequestService;
