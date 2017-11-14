import {Router, Logger} from "/client/api";

// create a function to do something on the product detail page
function logSomeStuff() {
  Logger.info("We're arriving at the product page!");
}

// add that to the product detail page onEnter hook
Router.Hooks.onEnter("product", logSomeStuff);
