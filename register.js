import Reaction from "/imports/plugins/core/core/server/Reaction";

Reaction.registerPackage({
  label: "Bees Knees",
  name: "beesknees",
  icon: "fa fa-vine",
  meta: {
    version: "1.0.0"
  },
  autoEnable: true,
  registry: [
    {
      route: "/about",
      name: "about",
      template: "aboutUs",
      workflow: "coreProductGridWorkflow"
    }
  ],
  layout: [{
    layout: "coreLayoutBeesknees",
    workflow: "coreProductGridWorkflow",
    collection: "Products",
    theme: "default",
    enabled: true,
    priority: 1,
    structure: {
      template: "productsLanding",
      layoutHeader: "NavBar",
      layoutFooter: "Footer",
      notFound: "productNotFound",
      dashboardHeader: "",
      dashboardControls: "dashboardControls",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});

