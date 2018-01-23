import _ from "lodash";
import { check } from "meteor/check";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Packages, Shops, Products } from "/lib/collections";
import { Product } from "/lib/collections/schemas";
import { Hooks, Reaction, Logger } from "/server/api";
import { registerSchema } from "/imports/plugins/core/collections/lib/registerSchema";
import ProductDetailPageSimpleLayout from "/imports/plugins/included/product-detail-simple/lib/layout/simple";
import { addRolesToGroups } from "/server/api/core/addDefaultRoles";

function modifyCheckoutWorkflow() {
  // Replace workflow step checkoutReview with our custom template
  // Modifications of *workflow steps* need to go into Packages collection
  Logger.info("::: Modifying checkout workflow step 'Review'");
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

function setProductDetailPageFooter() {
  // Modifications of *workflows* (contrary to workflow steps - see above)
  // need to go into Shops collection
  Logger.info("::: Set footer for product detail page workflow");
  const shopId = Reaction.getShopId();
  Shops.update({
    _id: shopId,
    layout: {
      $elemMatch: {
        "structure.template": "productDetailSimple"
      }
    }
  }, {
    $set: {
      "layout.$.structure.layoutFooter": "Footer"
    }
  });
}

function changeLayouts(newLayout) {
  check(newLayout, String);
  Logger.info(`::: changing all layouts to ${newLayout}`);
  const shopId = Reaction.getShopId();
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
  const customPdpLayout = _.cloneDeep(ProductDetailPageSimpleLayout());
  customPdpLayout.forEach((item) => {
    if (item.children) {
      for (const child of item.children) {
        if (child.component === "ProductMetadata") {
          // Replace product metadata with our Google Maps component
          child.component = "AvailabilityMap";
        }
      }
    }
  });

  Reaction.registerTemplate({
    name: "productDetailSimple",
    title: "Product Detail Simple Layout",
    type: "react",
    templateFor: ["pdp"],
    permissions: ["admin", "owner"],
    audience: ["anonymous", "guest"],
    template: customPdpLayout
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
  Logger.info("::: Add permission for new route 'About us' for guest users.");
  addRolesToGroups({ allShops: true, roles: ["about"], shops: [], groups: ["guest"] });
  changeLayouts("coreLayoutBeesknees");
  setProductDetailPageFooter();
  extendProductSchema();
  setProductLocation();
  changeProductDetailPageLayout();
});
