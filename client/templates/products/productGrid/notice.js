import { Template } from "meteor/templating";

/**
 * gridNotice helpers
 */
Template.gridNoticeBeesknees.helpers({
  isLowQuantity: function () {
    return this.isLowQuantity;
  },
  isSoldOut: function () {
    return this.isSoldOut;
  },
  isBackorder: function () {
    return this.isBackorder;
  }
});
