import React, { Component } from 'react';
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

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={props.zoom || 8}
    defaultCenter={props.center || { lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))

export default MyMapComponent