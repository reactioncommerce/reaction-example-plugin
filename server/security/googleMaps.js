import { BrowserPolicy } from "meteor/browser-policy-common";

BrowserPolicy.content.allowOriginForAll("https://maps.googleapis.com");
BrowserPolicy.content.allowOriginForAll("csi.gstatic.com");
BrowserPolicy.content.allowOriginForAll("maps.gstatic.com");
