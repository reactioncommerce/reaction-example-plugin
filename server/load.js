import { Packages, Shops } from "/lib/collections";
import { Reaction, Logger } from "/server/api";

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
if (Reaction && Reaction.Hooks) {
  Reaction.Hooks.Events.add("onCoreInit", () => {
    Logger.info("Initialize using Bees Knees Data");
    ReactionImport.fixture().process(Assets.getText("private/data/Shops.json"), ["name"], ReactionImport.shop);
    // ensure Shops are loaded first.
    ReactionImport.flush(Shops);
    // these will flush/import with the rest of the imports from core init.
    ReactionImport.fixture().process(Assets.getText("private/data/Products.json"), ["title"], ReactionImport.load);
    ReactionImport.fixture().process(Assets.getText("private/data/Tags.json"), ["name"], ReactionImport.load);
    ReactionImport.flush();
  });

  Reaction.Hooks.Events.add("afterCoreInit", () => {
    modifyCheckoutWorkflow();
  });
}
