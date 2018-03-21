import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import moment from "moment";

// Import the games scheduling class.
import Games from "./games.js";

// Get all the teams as an object.
import AllTeams from "./data/teams.js";

import MyMapComponent from "./map.js";
import MapWithADirectionsRenderer from "./map-direction.js";
import InputForm from "./input-form.js";

const teams = AllTeams;
// Bring in the react-google-maps components.
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require("react-google-maps");

// Instance of Games class.
const getGames = new Games();

// A big wrapper component that holds an input for defining route parameters and a Google Map that will display rendered route.
class NewRoute extends Component {
  constructor(props) {
    super(props);
    // Set a couple methods.
    this.getNewRoute = this.getNewRoute.bind(this);
    // Set a couple methods.
    this.handleDateChange = this.handleDateChange.bind(this);

    // Init state with some defaults.
    this.state = {
      team: teams[Object.keys(teams)[0]],
      zoom: 7,
      // startDate: moment().format("YYYY-MM-DD"),
      // endDate: moment()
      //   .add(1, "days")
      //   .format("YYYY-MM-DD")
      startDate: "2018-05-12",
      endDate: "2018-05-24"
    };

    console.log("very first state", this.state);
  }

  // Method for getting a new route...
  getNewRoute(routeData) {
    let rD = routeData;
    console.log("routeData", rD);
    this.setState({ route: getGames.buildRoute(...rD) });
  }

  // Method for handling date change...
  handleDateChange(changedStuff) {
    console.log("changing date");
    // this.setState....

    // Some mock data for a roadtrip in May.
    // let mockData = [
    //   "93941372-eb4c-4c40-aced-fe3267174393",
    //   "2018-07-12",
    //   "2018-07-24"
    // ];

    // let mockData = [
    //   this.state.team,
    //   this.state.startDate,
    //   this.state.endDate
    // ];

    // Get Initial route data using some mock data.
    // let routeData = getGames.buildRoute(...mockData);
    // console.log(this, mockData);
    console.info("new stuff", changedStuff);
    this.getNewRoute(changedStuff);
  }

  componentDidMount() {
    console.info("NewRoute props", this.state);

    // Some mock data for a roadtrip in May.
    // let mockData = [
    //   "55714da8-fcaf-4574-8443-59bfb511a524",
    //   "2018-05-12",
    //   "2018-05-24"
    // ];

    let mockData = [this.state.team, this.state.startDate, this.state.endDate];

    // Get Initial route data using some mock data.
    // let routeData = getGames.buildRoute(...mockData);
    this.getNewRoute(mockData);
  }

  render() {
    console.log("rendering new route", this.state);

    // Just pass a null filled route at first.
    let routeState = this.state.route || {
      origin: null,
      destination: null,
      waypoints: null,
      schedule: []
    };

    // Get origin, destination and waypoints from state.
    let origin = routeState.origin;
    let destination = routeState.destination;
    let waypoints = routeState.waypoints;
    let schedule = routeState.schedule;

    // Date info.
    let startDate = this.state.startDate || null;
    let endDate = this.state.endDate || null;

    let team = this.state.team || null;

    // Zoom is easy to set.
    let zoom = this.state.zoom;

    // Handlers for date changing.
    let handleDateChange = this.handleDateChange;

    let place = this.state.place || null;

    // let directions = this.state.directions || [];

    // console.log(directions);

    return (
      <div>
        <InputForm
          startDate={startDate}
          endDate={endDate}
          changeDate={handleDateChange}
          team={team}
        />
        <MapWithADirectionsRenderer
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAUmfYzdwc8GFbdBKWMVy0Oqqeh0zN3J6E&?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `500px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          zoom={zoom}
          waypoints={waypoints}
          origin={origin}
          destination={destination}
          place={place}
        />
        <Schedule sD={startDate} eD={endDate} schedule={schedule} />
      </div>
    );
  }
}

//Renders the schedule as a list of destinations.
class Schedule extends Component {
  render() {
    let schedule = this.props.schedule;
    return (
      <div>
        <h3>Schedule</h3>
        {schedule.map(sched => {
          console.log("schedule piece", sched);
          return (
            <div className="sched-piece" key={sched}>
              {sched}
            </div>
          );
        })}
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
          <h1 className="App-title">MLB Roadtrip Generator</h1>
        </header>

        <NewRoute />
      </div>
    );
  }
}

export default App;
