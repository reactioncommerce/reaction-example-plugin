import { check } from "meteor/check";
import { Packages, Shops, Groups } from "/lib/collections";
import { Hooks, Reaction, Logger } from "/server/api";

function modifyCheckoutWorkflow() {
  // Replace checkoutReview with our custom Template
  Logger.info("::: Modifying checkout workflow");
  Packages.update({
    name: "reaction-checkout",
    layout: {
      $elemMatch: {
        template: "checkoutReview"
      }
    }
  }, {
    $set: {
      "layout.$.template": "checkoutReviewBeesknees",
      "layout.$.label": "Review Order"
    }
  });
}

function addRolesToGroups() {
  Logger.info("::: Adding about route permissions to groups");
  Groups.update({},
    { $addToSet: { permissions: "about" } },
    { multi: true}
  );
}

function changeLayouts(shopId, newLayout) {
  check(shopId, String);
  check(newLayout, String);
  Logger.info(`::: changing all layouts to ${newLayout}`);
  const shop = Shops.findOne(shopId);
  for (let i = 0; i < shop.layout.length; i++) {
    shop.layout[i].layout = newLayout;
  }
  return Shops.update(shopId, {
    $set: { layout: shop.layout }
  });
}

/**
 * Hook to make additional configuration changes
 */
Hooks.Events.add("afterCoreInit", () => {
  modifyCheckoutWorkflow();
  addRolesToGroups();
  changeLayouts(Reaction.getShopId(), "coreLayoutBeesknees");
});
