function modifyCheckoutWorkflow() {
  // Replace checkoutReview with our custom Template
  ReactionCore.Collections.Packages.update({
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
if (ReactionCore && ReactionCore.Hooks) {
  ReactionCore.Hooks.Events.add("onCoreInit", () => {
    ReactionCore.Log.info("Initialize using Bees Knees Data");
    ReactionImport.fixture().process(Assets.getText("private/data/Shops.json"), ["name"], ReactionImport.shop);
    // ensure Shops are loaded first.
    ReactionImport.flush(ReactionCore.Collections.Shops);
    // these will flush/import with the rest of the imports from core init.
    ReactionImport.fixture().process(Assets.getText("private/data/Products.json"), ["title"], ReactionImport.load);
    ReactionImport.fixture().process(Assets.getText("private/data/Tags.json"), ["name"], ReactionImport.load);
    ReactionImport.flush();
  });

  ReactionCore.Hooks.Events.add("afterCoreInit", () => {
    modifyCheckoutWorkflow();
  });
}
