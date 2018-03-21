/* eslint-disable no-undef */
import React, { Component } from "react";
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
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
      const GeoCodeService = new google.maps.Geocoder();

      GeoCodeService.geocode(
        {
          address: this.props.origin
        },
        (result, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            this.setState(
              {
                place: {
                  lat: result[0].geometry.location.lat(),
                  lng: result[0].geometry.location.lng()
                }
                // place: { lat: 42.397, lng: -89.644 }
              },
              function() {
                console.log("place", result[0].geometry.location);
              }
            );
          } else {
            console.error(`error fetching location ${result}`);
          }
        }
      );

      console.log("new map props", this.props);

      let splitOrigin =
        this.props.waypoints > 1
          ? this.props.waypoints[0].location
          : this.props.origin;
      let splitDestination =
        this.props.waypoints > 1
          ? this.props.waypoints.pop().location
          : this.props.destination;
      let splitWaypoints = this.props.waypoints.slice(
        1,
        this.props.waypoints.length - 1
      );
      console.log(splitOrigin);
      DirectionsService.route(
        {
          // Problem: destination should be last waypoint probably...yet, need a destination first to copmute....
          // origin: splitOrigin,
          // destination: splitDestination,
          // waypoints: splitWaypoints,
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
      const GeoCodeService = new google.maps.Geocoder();

      GeoCodeService.geocode(
        {
          address: this.props.origin
        },
        (result, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            this.setState(
              {
                // place: result[0].geometry.location
                // place: { lat: 42.397, lng: -89.644 }
                place: {
                  lat: result[0].geometry.location.lat(),
                  lng: result[0].geometry.location.lng()
                }
              },
              function() {
                console.log("place", result[0].location);
              }
            );
          } else {
            console.error(`error fetching location ${result}`);
          }
        }
      );

      console.log("map props", this.props);

      let splitOrigin =
        this.props.waypoints > 1
          ? this.props.waypoints[0].location
          : this.props.origin;
      let splitDestination =
        this.props.waypoints > 1
          ? this.props.waypoints.pop().location
          : this.props.destination;

      let splitWaypoints = this.props.waypoints.slice(
        1,
        this.props.waypoints.length - 1
      );

      DirectionsService.route(
        {
          // origin: splitOrigin,
          // destination: splitDestination,
          // waypoints: splitWaypoints,
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
    defaultCenter={props.place || { lat: 42.397, lng: -89.644 }}
    center={props.place}
  >
    {props.directions &&
      props.waypoints.length > 1 && (
        <DirectionsRenderer directions={props.directions} />
      )}

    {props.waypoints.length <= 1 && (
      <Marker position={props.place} title={props.origin} />
    )}
  </GoogleMap>
));

export default MapWithADirectionsRenderer;
