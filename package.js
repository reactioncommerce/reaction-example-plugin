Package.describe({
  name: "beesknees:beesknees",
  summary: "Bee's Knees Custom Store",
  version: "0.1.0"
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.3");

  Npm.depends({
    "jquery.payment": "1.2.4",
    "autosize": "3.0.15",
    "jquery-tags-input": "1.3.5",
    "accounting": "0.4.1",
    "money": "0.2.0",
    "draggabilly": "1.2.0",
    "imagesloaded": "4.1.0",
    "jquery": "2.2.3",
    "jquery-ui": "1.10.5"
  });

  // core Meteor dependencies
  api.use("meteor-base");
  api.use("mongo");
  api.use("ecmascript");
  api.use("es5-shim");
  api.use("blaze-html-templates");
  api.use("session");
  api.use("jquery");
  api.use("tracker");


  // meteor add-on packages
  api.use("underscore");
  api.use("logging");
  api.use("reload");
  api.use("random");
  api.use("ejson");
  api.use("check");
  api.use("http");
  api.use("reactive-var");
  api.use("reactive-dict");


  // Reaction package dependencies
  api.use("reactioncommerce:core@0.13.0");

  // theme dependencies
  api.use("less");
  api.use("reactioncommerce:core-theme@2.0.0");

  // Server files
  api.addFiles("server/register.js", "server");
  api.addFiles("server/load.js", "server");

  // Private fixture data
  api.addAssets("private/data/Products.json", "server");
  api.addAssets("private/data/Shops.json", "server");
  api.addAssets("private/data/Tags.json", "server");


  // Client files
  api.addFiles("client/styles/variables.less", "client", {isImport: true});
  api.addFiles("client/styles/base.less", "client", {isImport: true});
  api.addFiles("client/styles/main.less", "client");

  //Templates
  api.addFiles("client/templates/layouts/core.html", "client");
  api.addFiles("client/templates/products/productsLanding.html", "client");
  api.addFiles("client/templates/products/productsLanding.js", "client");
  api.addFiles("client/templates/products/productGrid/productGrid.html", "client");
  api.addFiles("client/templates/products/productGrid/productGrid.js", "client");
  api.addFiles("client/templates/products/productGrid/content/content.html", "client");
  api.addFiles("client/templates/products/productGrid/content/content.js", "client");
  api.addFiles("client/templates/products/productGrid/controls/controls.html", "client");
  api.addFiles("client/templates/products/productGrid/controls/controls.js", "client");
  api.addFiles("client/templates/products/productGrid/item/item.html", "client");
  api.addFiles("client/templates/products/productGrid/item/item.js", "client");
  api.addFiles("client/templates/products/productGrid/notice/notice.html", "client");
  api.addFiles("client/templates/products/productGrid/notice/notice.js", "client");
  api.addFiles("client/templates/products/productList/productList.html", "client");
  api.addFiles("client/templates/products/productList/productList.js", "client");


});
