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
  Hooks.Events.add("onCoreInit", () => {
    Logger.info("======> Initialize using Bees Knees Data");
    Reaction.Import.fixture().process(Assets.getText("private/data/Shops.json"), ["name"], Reaction.Import.shop);
    // ensure Shops are loaded first.
    Reaction.Import.flush(Shops);
    // these will flush/import with the rest of the imports from core init.
    Reaction.Import.fixture().process(Assets.getText("private/data/Products.json"), ["title"], Reaction.Import.load);
    Reaction.Import.fixture().process(Assets.getText("private/data/Tags.json"), ["name"], Reaction.Import.load);
    Reaction.Import.fixture().process(Assets.getText("private/data/Shipping.json"), ["name"], Reaction.Import.load);
    Reaction.Import.flush();
  });

  Hooks.Events.add("afterCoreInit", () => {
    Logger.info("Modifying checkout workflow");
    modifyCheckoutWorkflow();
  });
}
