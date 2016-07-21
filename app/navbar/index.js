import angular from "angular";

import template from "./navbar.html";

import "./navbar.scss";

angular.module("app.navbar", [])
  .component("navbar", {
    template
  });
