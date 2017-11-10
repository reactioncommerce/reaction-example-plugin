import React from "react";
import { DocHead } from "meteor/kadira:dochead";

import { registerComponent } from "/imports/plugins/core/components/lib";


class AvailabilityMap extends React.Component {
  static TRACKING_ID = "AIzaSyAYLBoaNKbI5GNYZwxOhRkeV_OVV41Qw54";


  constructor(props) {
    debugger;
    super(props);
  }

  componentDidMount() {
    const url = `https://maps.googleapis.com/maps/api/js?key=${AvailabilityMap.TRACKING_ID}`;
    DocHead.loadScript(url, () => {
      debugger;
      // eslint-disable-next-line no-undef, no-new
      const map = new google.maps.Map(this.refs.map, {
        center: {
          lat: this.props.product.lat,
          lng: this.props.product.lng
        },
        zoom: 13
      });

      // eslint-disable-next-line no-undef, no-new
      new google.maps.Marker({
        position: AvailabilityMap.RC_POSITION,
        map: map,
        title: 'Buy here!'
      });
    });
  }

  render() {
    return (
      <div>
        <h3>Product available at the following stores</h3>
        <div style={{ height: "150px", width: "100%" }} ref="map"></div>
      </div>
    );
  }
}


registerComponent("AvailabilityMap", AvailabilityMap);

export default AvailabilityMap;
