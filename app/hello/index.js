import angular from "angular";

import helloTemplate from "./hello.html";
import helloController from "./hello-controller";

const helloModule = angular.module("hello", [])
  .component("helloWorld", {
    template: helloTemplate,
    controller: helloController
  });

export default helloModule;
