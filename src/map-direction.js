/* eslint-disable no-undef */
import React, { Component } from "react";
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAUmfYzdwc8GFbdBKWMVy0Oqqeh0zN3J6E&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withGoogleMap,
  lifecycle({
    componentWillUpdate() {
      const DirectionsService = new google.maps.DirectionsService();

      console.log("new map props", this.props);

      DirectionsService.route(
        {
          origin: this.props.origin,
          destination: this.props.destination,
          waypoints: this.props.waypoints,
          optimizeWaypoints: false,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState(
              {
                directions: result
              },
              function() {
                console.log(result);
              }
            );
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    },
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      console.log("map props", this.props);

      DirectionsService.route(
        {
          origin: this.props.origin,
          destination: this.props.destination,
          waypoints: this.props.waypoints,
          optimizeWaypoints: false,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState(
              {
                directions: result
              },
              function() {
                console.log(result);
              }
            );
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  })
)(props => (
  <GoogleMap
    defaultZoom={props.zoom || 8}
    defaultCenter={props.center || { lat: -34.397, lng: 150.644 }}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

export default MapWithADirectionsRenderer;
