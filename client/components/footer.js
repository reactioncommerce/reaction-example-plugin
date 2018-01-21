import React from "react";
import { Link } from 'react-router-dom'

import { replaceComponent } from "/imports/plugins/core/components/lib";
import { Reaction } from "/client/api";

const FooterBeesKnees = () => (
  <div className="reaction-navigation-footer footer-default">
    <nav className="navbar-bottom" role="navigation">
      <div className="row">
        <Link to={Reaction.Router.pathFor("about")}>About Us</Link>
      </div>
    </nav>
  </div>
);


replaceComponent("Footer", FooterBeesKnees);

export default FooterBeesKnees;
