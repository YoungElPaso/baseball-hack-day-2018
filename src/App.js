import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Games from './games.js';

import MyMapComponent from './map.js';
import MapWithADirectionsRenderer from './map-direction.js';
import InputForm from './input-form.js';

const fungames = new Games;

const allTeams = {
  "Oakland Athletics": "27a59d3b-ff7c-48ea-b016-4798f560f5e1",
  "Pittsburgh Pirates": "481dfe7e-5dab-46ab-a49f-9dcc2b6e2cfd",
  "Los Angeles Angels": "4f735188-37c8-473d-ae32-1f7e34ccf892",
  "Baltimore Orioles": "75729d34-bca7-4a0f-b3df-6f26c6ad3719",
  "Atlanta Braves": "12079497-e414-450a-8bf2-29f91de646bf",
  "Washington Nationals": "d89bed32-3aee-4407-99e3-4103641b999a",
  "Milwaukee Brewers": "dcfd5266-00ce-442c-bc09-264cd20cf455",
  "Chicago White Sox": "47f490cd-2f58-4ef7-9dfd-2ad6ba6c1ae8",
  "Kansas City Royals": "833a51a9-0d84-410f-bd77-da08c3e5e26e",
  "Miami Marlins": "03556285-bdbb-4576-a06d-42f71f46ddc5",
  "Cincinnati Reds": "c874a065-c115-4e7d-b0f0-235584fb0e6f",
  "Minnesota Twins": "aa34e0ed-f342-4ec6-b774-c79b47b60e2d",
  "Arizona Diamondbacks": "25507be1-6a68-4267-bd82-e097d94b359b",
  "Houston Astros": "eb21dadd-8f10-4095-8bf3-dfb3b779f107",
  "Los Angeles Dodgers": "ef64da7f-cfaf-4300-87b0-9313386b977c",
  "San Francisco Giants": "a7723160-10b7-4277-a309-d8dd95a8ae65",
  "Philadelphia Phillies": "2142e1ba-3b40-445c-b8bb-f1f8b1054220",
  "Texas Rangers": "d99f919b-1534-4516-8e8a-9cd106c6d8cd",
  "Cleveland Indians": "80715d0d-0d2a-450f-a970-1b9a3b18c7e7",
  "New York Mets": "f246a5e5-afdb-479c-9aaa-c68beeda7af6",
  "Tampa Bay Rays": "bdc11650-6f74-49c4-875e-778aeb7632d9",
  "Toronto Blue Jays": "1d678440-b4b1-4954-9b39-70afb3ebbcfa",
  "St. Louis Cardinals": "44671792-dc02-4fdd-a5ad-f5f17edaa9d7",
  "Chicago Cubs": "55714da8-fcaf-4574-8443-59bfb511a524",
  "New York Yankees": "a09ec676-f887-43dc-bbb3-cf4bbaee9a18",
  "Seattle Mariners": "43a39081-52b4-4f93-ad29-da7f329ea960",
  "San Diego Padres": "d52d5339-cbdd-43f3-9dfa-a42fd588b9a3",
  "Boston Red Sox": "93941372-eb4c-4c40-aced-fe3267174393",
  "Detroit Tigers": "575c19b7-4052-41c2-9f0a-1c5813d02f99",
  "Colorado Rockies" : "29dd9a87-5bcc-4774-80c3-7f50d985068b"
};

const newData =   fungames.buildRoute ("55714da8-fcaf-4574-8443-59bfb511a524", "2018-05-12", "2018-05-24");

const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");


class NewRoute extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   zoom: 3
    // }

    // Init state.
      this.state = {
      zoom: 3,
        origin: "Safeco Field 1516 First Avenue South Seattle WA 98134 USA",
        destination: "Oakland-Alameda County Coliseum 7000 Coliseum Way Oakland CA 94621 USA",
        waypoints: [{location:'AT&T Park 24 Willie Mays Plaza San Francisco CA 94107 USA'},{location:'San Diego'}]
      };

      // let stateObj = JSON.parse('{"destination":"Safeco Field 1516 First Avenue South Seattle WA 98134 USA","origin":"Safeco Field 1516 First Avenue South Seattle WA 98134 USA","waypoints":[{"location":"Safeco Field 1516 First Avenue South Seattle WA 98134 USA"},{"location":"Oakland-Alameda County Coliseum 7000 Coliseum Way Oakland CA 94621 USA"},{"location":"Oakland-Alameda County Coliseum 7000 Coliseum Way Oakland CA 94621 USA"},{"location":"AT&T Park 24 Willie Mays Plaza San Francisco CA 94107 USA"},{"location":"Oakland-Alameda County Coliseum 7000 Coliseum Way Oakland CA 94621 USA"},{"location":"AT&T Park 24 Willie Mays Plaza San Francisco CA 94107 USA"},{"location":"AT&T Park 24 Willie Mays Plaza San Francisco CA 94107 USA"},{"location":"Angel Stadium of Anaheim 2000 Gene Autry Way Anaheim CA 92806 USA"},{"location":"Dodger Stadium 1000 Vin Scully Avenue Los Angeles CA 90012 USA"},{"location":"Dodger Stadium 1000 Vin Scully Avenue Los Angeles CA 90012 USA"},{"location":"Dodger Stadium 1000 Vin Scully Avenue Los Angeles CA 90012 USA"},{"location":"PETCO Park 100 Park Blvd. San Diego CA 92101 USA"},{"location":"PETCO Park 100 Park Blvd. San Diego CA 92101 USA"},{"location":"PETCO Park 100 Park Blvd. San Diego CA 92101 USA"}]}');
      let stateObj = newData;
      console.log('newdata', newData);
      this.state = stateObj;
    
  }


  componentDidMount() {
    console.log('rooute props', this.state)
    // this.props = this.state;
    // this.state.zoom = 3;
  }

  render () {
    console.log('rendering new route', this.state);

    let origin = this.state.origin;
    let destination = this.state.destination;
    let waypoints = this.state.waypoints;
    let zoom = 6;

    return (
      <div>

      <InputForm/>

      <MapWithADirectionsRenderer
  isMarkerShown
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAUmfYzdwc8GFbdBKWMVy0Oqqeh0zN3J6E&?v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
  zoom={zoom}
  waypoints = {waypoints}
  origin = {origin}
  destination = {destination}

/>


      </div>
    )
  }
}

class App extends Component {
  componentDidMount() {
    console.log('app state', this.state)
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
