import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Blaze from "meteor/gadicc:blaze-react-component";
import { Template } from "meteor/templating";

import { getComponent as assertComponent, registerComponent } from "/imports/plugins/core/components/lib";


class CoreLayoutBeesknees extends Component {
  static propTypes = {
    actionViewIsOpen: PropTypes.bool,
    data: PropTypes.object,
    structure: PropTypes.object
  }

  getComponent(name) {
    try {
      if (name) {
        return assertComponent(name);
      }
    } catch (e) {
      // No-op
    }
    return null;
  }

  renderMain() {
    const template = this.props.structure && this.props.structure.template;
    const mainComponent = this.getComponent(template);
    if (mainComponent) {
      return React.createElement(mainComponent, {});
    } else if (Template[template]) {
      return (
        <Blaze template={template} />
      );
    }
    return null;
  }

  render() {
    const { layoutHeader, layoutFooter, template } = this.props.structure || {};
    const pageClassName = classnames({
      "page": true,
      "show-settings": this.props.actionViewIsOpen
    });

    const headerComponent = layoutHeader && this.getComponent(layoutHeader);
    const footerComponent = layoutFooter && this.getComponent(layoutFooter);

    return (
      <div className={pageClassName} id="reactionAppContainer">

        {headerComponent && React.createElement(headerComponent, {})}

        <Blaze template="cartDrawer" className="reaction-cart-drawer" />

        <main>
          <div className="rui beesknees">
            <div className="bkdebug"><em>{"Bee's Knees layout"}</em></div>
            <div className="bkdebug"><em>{"layoutHeader component:"}</em> {this.props.structure.layoutHeader || "not applicable"}</div>
            <div className="bkdebug"><em>{"layoutFooter component:"}</em> {this.props.structure.layoutFooter || "not applicable"}</div>
            <div className="bkdebug"><em>main {this.getComponent(template) ? "component:" : "(Blaze template):"}</em> {template}</div>
          </div>

          { this.renderMain() }
        </main>

        {footerComponent && React.createElement(footerComponent, {})}
      </div>
    );
  }
}

// Register component for it to be usable
registerComponent("coreLayoutBeesknees", CoreLayoutBeesknees);

export default CoreLayoutBeesknees;
