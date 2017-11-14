import React from "react";

import {replaceComponent} from "/imports/plugins/core/components/lib";
import {Reaction} from "/client/api";

const FooterBeesKnees = () => (
  <div className="reaction-navigation-footer footer-default">
    <nav className="navbar-bottom" role="navigation">
      <div className="row">
        <a href={Reaction.Router.pathFor("about")}>About Us</a>
      </div>
    </nav>
  </div>
);


replaceComponent("Footer", FooterBeesKnees);

export default FooterBeesKnees;
