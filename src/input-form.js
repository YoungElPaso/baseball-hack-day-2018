import React, { Component } from "react";

// Get all the teams as an object.
import AllTeams from "./data/teams.js";
const teams = AllTeams;

class InputForm extends Component {
  constructor(props) {
    super(props);
    // Need to import teams for a select box or something.
    // this.state.teams = teams;
    // Need to set a default start date...
    // this.state.startDate = "";
    // Need to set a default end date...
    // this.state.endDate = "";
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(e) {
    this.props.changeDate(e.target.value);
  }

  render() {
    let sD = this.props.sD;
    let eD = this.props.eD;
    let handle = this.handleDateChange;
    return (
      <div>
        {sD} - {eD}
        <button onClick={handle}>Update Route</button>
      </div>
    );
  }
}

export default InputForm;
