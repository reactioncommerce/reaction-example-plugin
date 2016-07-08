import { Template } from "meteor/templating";
import { Session } from "meteor/session";

Template.gridControlsBeesknees.onRendered(function () {
  return this.$("[data-toggle='tooltip']").tooltip({
    position: "top"
  });
});

Template.gridControlsBeesknees.helpers({
  checked: function () {
    const selectedProducts = Session.get("productGrid/selectedProducts");
    return _.isArray(selectedProducts) ? selectedProducts.indexOf(this._id) >= 0 : false;
  }
});
