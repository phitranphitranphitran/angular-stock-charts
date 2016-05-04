import angular from "angular";
import appTemplate from "./app.html";

// angular modules
import "./hello";

const app = angular.module("app", ["hello"])
  .component("app", {
    template: appTemplate
  });

export default app;
