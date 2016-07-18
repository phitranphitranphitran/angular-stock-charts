// abstract class for an API request service
// only fetches on initial get, stores data after

class ApiService {
  constructor($http, $q) {
    if (new.target === ApiService) {
      throw new Error("Cannot instantiate ApiService directly (abstract class)");
    }
    if (!this.getUrl) {
      throw new Error("Must implement getUrl and specify API url (abstract method)");
    }
    this.$http = $http;
    this.$q = $q;
    this.data = null;
  }
  get() {
    return this.$q((resolve, reject) => {
      if (!this.data) {
        return this.fetchData()
          .then(this.formatData)
          .then(data => {
            this.data = data;
            return data;
          })
          .then(resolve)
          .catch(reject);
      }
      return resolve(this.data);
    });
  }
  fetchData() {
    return this.$http.get(this.getUrl()).then(res => res.data);
  }
  formatData(data) {
    return data; // default implementation, no formatting
  }
}

ApiService.$inject = ["$http", "$q"];

export default ApiService;
