import React, { Component } from "react";
import { registerComponent } from "/imports/plugins/core/components/lib";

class AboutUs extends Component {
  render() {
    return (
      <div className="container">
        <h1>About Us</h1>
        <p>{"Bee's Knees is a company manufacturing quality infant clothing with an emphasis on organic materials, "}
          {"high quality manufacturing, and unique design."}</p>
        <p>{"We are located in Southern California, and all products are proudly Made in the U.S.A."}</p>
      </div>
    );
  }
}

registerComponent("aboutUs", AboutUs);
