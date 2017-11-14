import { check } from "meteor/check";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

import { Packages, Shops, Groups, Products } from "/lib/collections";
import { registerSchema } from "/imports/plugins/core/collections/lib/registerSchema";
import { Hooks, Reaction, Logger } from "/server/api";
import { Product } from "/lib/collections/schemas";
import BeesKneesPdpLayout from "../lib/layout/beesKneesPdpLayout";

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
    { multi: true }
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

function changeProductDetailPageLayout() {
  Logger.info("::: changing layouts of product detail page");
  // Customize default productDetailSimple page's layout
  Reaction.registerTemplate({
    name: "productDetailSimple",
    title: "Product Detail Simple Layout",
    type: "react",
    templateFor: ["pdp"],
    permissions: ["admin", "owner"],
    audience: ["anonymous", "guest"],
    template: BeesKneesPdpLayout()
  });
}

function extendProductSchema() {
  Logger.info("::: Add location coordinates to simple product schema");
  const ExtendedSchema = new SimpleSchema([Product,
    {
      lat: {
        optional: true,
        type: Number,
        decimal: true
      },
      lng: {
        optional: true,
        type: Number,
        decimal: true
      }
    }
  ]);
  Products.attachSchema(ExtendedSchema, { replace: true, selector: { type: "simple" } });
  registerSchema("Product", ExtendedSchema);
}

function setProductLocation() {
  Logger.info("::: Set location to product 'Basic Reaction product'");
  Products.update({ title: "Basic Reaction Product" }, {
    $set: {
      lat: 34.0059084,
      lng: -118.4903684
    }
  }, {
    publish: true,
    selector: {
      type: "simple"
    }
  });
}


/**
 * Hook to make additional configuration changes
 */
Hooks.Events.add("afterCoreInit", () => {
  modifyCheckoutWorkflow();
  addRolesToGroups();
  changeLayouts(Reaction.getShopId(), "coreLayoutBeesknees");

  extendProductSchema();
  setProductLocation();
  changeProductDetailPageLayout();
});
