import angular from "angular";

import template from "./companies-table.html";
import controller from "./companies-table-controller";

const companiesTableModule = angular.module("app.companiesTable", [
    "app.stockData"
  ])
  .component("companiesTable", {
    template,
    controller
  });

export default companiesTableModule;
