import { Packages, Shops } from "/lib/collections";
import { Hooks, Reaction, Logger } from "/server/api";

function modifyCheckoutWorkflow() {
  // Replace checkoutReview with our custom Template
  Logger.info("::: Modifying checkout workflow");
  Packages.update({
    "name": "reaction-checkout",
    "layout": {
      "$elemMatch": {
        "template": "checkoutReview"
      }
    }
  }, {
    "$set": {
      "layout.$.template": "checkoutReviewBeesknees",
      "layout.$.label": "Review Order"
    }
  });
}

function addRolesToVisitors() {
  // Add the about permission to all default roles since it's available to all
  Logger.info("::: Adding about route permissions to default roles");
  const shop = Shops.findOne(Reaction.getShopId());
  Shops.update(shop._id, {
      $addToSet: { "defaultVisitorRole": "about"}
    }
  );
  Shops.update(shop._id, {
    $addToSet: { "defaultRole": "about"}
  });
}

/**
 * Hook to make additional configuration changes
 */
Hooks.Events.add("afterCoreInit", () => {
  modifyCheckoutWorkflow();
  addRolesToVisitors();
});
