/* eslint-disable no-undef */
import React, { Component } from 'react';
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAUmfYzdwc8GFbdBKWMVy0Oqqeh0zN3J6E&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({

    // constructor(props) {
    //   super(props);

    //   // Init state.
    //   this.state = {
    //     origin: "Montreal",
    //     destination: "Toronto, Ontario",
    //     waypoints: [{location:'Boston', stopover: true}]
    //   };

      // const DirectionsService = new google.maps.DirectionsService();
      // DirectionsService.route({
      //   // origin: new google.maps.LatLng(41.8507300, -87.6512600),
      //   origin: this.state.origin,
      //   // destination: new google.maps.LatLng(41.8525800, -87.6514100),
      //   destination: this.state.destination,
      //   waypoints: this.state.waypoints,
      //   optimizeWaypoints: true,
      //   travelMode: google.maps.TravelMode.DRIVING,
      // }, (result, status) => {
      //   if (status === google.maps.DirectionsStatus.OK) {
      //     this.setState({
      //       directions: result,
      //     }, function(){
      //       console.log(result)
      //     });
      //   } else {
      //     console.error(`error fetching directions ${result}`);
      //   }
      // });

    // },


    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      // let origin;
      // let dest;
      // let ways;
      // if (this.state) {
      //   origin = this.state.origin;
      //   dest = this.state.destination;
      //   ways = this.state.waypoints;
      // }
      // Init state.
      // this.state = {};
      // this.setState({
      //   origin: "New York City, NY",
      //   destination: "Toronto, Ontario",
      //   waypoints: [{location:'Boston', stopover: true}]
      // }, makeDirections); 


      console.log('map props',this.props);
      
      // [{location: "New York, NYC", stopover: true}];


      DirectionsService.route({
        // origin: new google.maps.LatLng(41.8507300, -87.6512600),
        origin: this.props.origin,
        // destination: new google.maps.LatLng(41.8525800, -87.6514100),
        destination: this.props.destination,
        waypoints: this.props.waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          }, function(){
            console.log(result)
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });


    }
  })
)(props =>
  <GoogleMap
    // defaultZoom={7}
    // defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
    defaultZoom={props.zoom || 8}
    defaultCenter={props.center || { lat: -34.397, lng: 150.644 }}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

export default MapWithADirectionsRenderer

// <MapWithADirectionsRenderer />