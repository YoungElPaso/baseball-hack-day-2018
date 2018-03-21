/* eslint-disable no-undef */
import React, { Component } from "react";
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} = require("react-google-maps");
// import { GoogleMap, Marker } from "react-google-maps"

// const MyMapComponent = (props) =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}
//   >
//     {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//   </GoogleMap>

// // <MyMapComponent isMarkerShown />// Map with a Marker
// // <MyMapComponent isMarkerShown={false} />// Just only Map

// export default MyMapComponent

// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
// } from "react-google-maps";

const MyMapComponent = compose(
  withScriptjs(
    withGoogleMap(
      lifecycle({
        componentDidMount() {
          let GeoCodeService = new google.maps.Geocoder();
          GeoCodeService.geocode(
            {
              address: this.props.origin
            },
            (result, status) => {
              if (status === google.maps.GeocoderStatus.OK) {
                this.setState(
                  {
                    origin: result
                  },
                  function() {
                    console.log(result);
                  }
                );
              } else {
                console.error(`error fetching location ${result}`);
              }
            }
          );
        }
      }),
      props => (
        <GoogleMap
          defaultZoom={props.zoom || 8}
          defaultCenter={props.center || { lat: -34.397, lng: 150.644 }}
        >
          {props.isMarkerShown && (
            <Marker position={{ lat: -34.397, lng: 150.644 }} />
          )}
        </GoogleMap>
      )
    )
  )
);

export default MyMapComponent;
