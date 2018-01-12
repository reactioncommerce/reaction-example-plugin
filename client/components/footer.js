import React from "react";

import { replaceComponent } from "/imports/plugins/core/components/lib";
import { Reaction } from "/client/api";

const FooterBeesKnees = () => (
  <div className="reaction-navigation-footer footer-default">
    <nav className="navbar-bottom" role="navigation">
      <div className="row">
        <a href="javascript: void(0)" onClick={() => {
            const path = Reaction.Router.pathFor("about");
            Reaction.Router.go(path);
            return false;
          }
        }>About Us</a>
      </div>
    </nav>
  </div>
);


replaceComponent("Footer", FooterBeesKnees);

export default FooterBeesKnees;
