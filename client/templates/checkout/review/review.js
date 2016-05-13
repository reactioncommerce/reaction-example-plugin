/**
* review status
* trigger checkoutPayment step on template checkoutReview render
*/

Template.checkoutReviewBeesknees.onRendered(function () {
  Meteor.call("workflow/pushCartWorkflow", "coreCartWorkflow", "checkoutReview");
});
