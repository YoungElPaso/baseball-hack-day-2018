import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

// Import the games scheduling class.
import Games from "./games.js";

// Get all the teams as an object.
import AllTeams from "./data/teams.js";

import MyMapComponent from "./map.js";
import MapWithADirectionsRenderer from "./map-direction.js";
import InputForm from "./input-form.js";

// Bring in the react-google-maps components.
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require("react-google-maps");

// Instance of Games class.
const getGames = new Games();

// Some mock data for a roadtrip in May.
let mockData = [
  "55714da8-fcaf-4574-8443-59bfb511a524",
  "2018-05-12",
  "2018-05-24"
];

class NewRoute extends Component {
  constructor(props) {
    super(props);

    // Get Initial route data using some mock data.
    let routeData = getGames.buildRoute(...mockData);

    // Init state with some defaults.
    this.state = {
      zoom: 6,
      route: routeData
    };
  }

  componentDidMount() {
    console.log("NewRoute props", this.state);
  }

  render() {
    console.log("rendering new route", this.state);

    let origin = this.state.route.origin;
    let destination = this.state.route.destination;
    let waypoints = this.state.route.waypoints;
    let zoom = this.state.zoom;

    return (
      <div>
        <InputForm />

        <MapWithADirectionsRenderer
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAUmfYzdwc8GFbdBKWMVy0Oqqeh0zN3J6E&?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          zoom={zoom}
          waypoints={waypoints}
          origin={origin}
          destination={destination}
        />
      </div>
    );
  }
}

class App extends Component {
  componentDidMount() {
    console.log("app state", this.state);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Baseball Roadtrip Generator! (BRG)</h1>
        </header>

        <NewRoute />
      </div>
    );
  }
}

export default App;
