import { Meteor } from "meteor/meteor";
import { composeWithTracker, registerComponent } from "/imports/plugins/core/components/lib";
import AvailabilityMap from "../components/availabilityMap";


function composer(props, onData) {
  onData(null, {
    trackingId: Meteor.settings.public.GOOGLE_MAPS_API_KEY
  });
}

registerComponent("AvailabilityMap", AvailabilityMap, composeWithTracker(composer));

export default composeWithTracker(composer)(AvailabilityMap);
