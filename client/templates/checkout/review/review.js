import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Components } from "/imports/plugins/core/components/lib";


/**
 * review status
 * trigger checkoutPayment step on template checkoutReview render
 */
Template.checkoutReviewBeesknees.onRendered(function () {
  Meteor.call("workflow/pushCartWorkflow", "coreCartWorkflow", "checkoutReview");
});

Template.checkoutReviewBeesknees.helpers({
  cartSubTotal() {
    return Components.CartSubTotal;
  }
});
