Package.describe({
  name: "beesknees:beesknees",
  summary: "Bee's Knees Custom Store",
  version: "0.1.0"
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.3");

  api.use("less");
  api.use("reactioncommerce:core-theme@2.0.0");

  api.addFiles("client/styles/variables.less", "client", {isImport: true});
  api.addFiles("client/styles/base.less", "client", {isImport: true});
  api.addFiles("client/styles/main.less", "client");
});
