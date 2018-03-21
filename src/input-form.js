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
    console.info("form props", this.props);
    this.state = this.props;
  }

  handleDateChange(e) {
    if (e.target.name == "sd") {
      // change start date..
      console.log(e.target.value);
      this.setState({ startDate: e.target.value });
    }
    if (e.target.name == "ed") {
      // change end date..
      // this.setState({ endDate: e.target.value });
      console.log(e.target.value);
      this.setState({ endDate: e.target.value });
    }
    if (e.target.name == "team-selector") {
      // change team selected
      // console.log(e.target.value);
      this.setState({ team: e.target.value });
    }
    // TODO: almost there! JUst need change up the format of these dates!
    if (e.target.name == "button") {
      let setting = [
        // "93941372-eb4c-4c40-aced-fe3267174393",
        this.state.team,
        this.state.startDate,
        this.state.endDate
      ];

      console.info(this.state, setting);
      this.props.changeDate(setting);
    }
  }

  render() {
    // let sD = this.props.sD;
    // let eD = this.props.eD;
    // let team = this.props.team;
    let handle = this.handleDateChange;

    return (
      <div>
        <select name="team-selector" value={this.state.team} onChange={handle}>
          {Object.keys(teams).map(team => {
            // console.log(teams[team], team);
            return <option value={teams[team]}>{team}</option>;
          })}
        </select>
        <input type="text" name="sd" value={this.state.startDate} onChange={handle} />
        <input type="text" name="ed" value={this.state.endDate} onChange={handle} />
        <button onClick={handle} name="button">
          Update Route
        </button>
      </div>
    );
  }
}

export default InputForm;
