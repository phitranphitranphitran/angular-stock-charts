import angular from "angular";

import apiConstants from "./api.constant";
import ApiSelectorService from "./api-selector.service";

angular.module("app.apiSelector", [])
  .constant("apiConstants", apiConstants)
  .service("apiSelector", ApiSelectorService);
