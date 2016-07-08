import { Template } from "meteor/templating";
/**
 * gridContent helpers
 */

Template.gridContentBeesknees.helpers({
  displayPrice: function () {
    if (this.price && this.price.range) {
      return this.price.range;
    }
  }
});
