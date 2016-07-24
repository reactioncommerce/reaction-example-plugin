/* eslint-disable */
import { Packages, Shops } from "/lib/collections";
import { Hooks, Reaction, Logger } from "/server/api";

function modifyCheckoutWorkflow() {
  // Replace checkoutReview with our custom Template
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

/**
 * Hook to setup core additional imports during ReactionCore init (shops process first)
 */
if (Hooks) {
  Hooks.Events.add("afterCoreInit", () => {
    // Reaction.Import.fixture().process(Assets.getText("data/Products.json"), ["title"], Reaction.Import.load);
  });
  
  Hooks.Events.add("afterCoreInit", () => {
    Logger.info("Modifying checkout workflow");
    modifyCheckoutWorkflow();
  });
}
