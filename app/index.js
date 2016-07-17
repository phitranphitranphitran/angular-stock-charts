import angular from "angular";

// import all angular modules here
import "./stock-data";
import "./companies-table";
import "./price-history-chart";

import template from "./app.html";

const app = angular.module("app", [
    "app.priceHistoryChart",
    "app.companiesTable"
  ])
  .component("app", {
    template
  });

export default app;
