import { APIS } from "../constants";

function ApiSelectorService() {
  let selected = APIS.YAHOO;
  this.setApi = (api) => {
    selected = api;
  };
  this.getApi = () => {
    return selected;
  };
}

export default ApiSelectorService;
