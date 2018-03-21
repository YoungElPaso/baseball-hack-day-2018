const _ = require("lodash");
const moment = require("moment");

const games = require("./data/games");
const distances = require("./data/distances");

export default class Games {
  gamesBetweenDates = (start, end) => {
    let goodGames = _(games)
      .filter(game => {
        const gameTime = moment.utc(game.scheduled);
        const startDate = moment.utc(start);
        const endDate = moment.utc(end);

        return (
          gameTime.isSameOrAfter(startDate, "day") &&
          gameTime.isSameOrBefore(endDate, "day")
        );
      })
      .orderBy(game => game.scheduled)
      .map(game => {
        const dd = _(distances[game.home_team])
          .sortBy(k => k[1])
          .map(k => _.set({}, k[0], k[1]))
          .reduce((result, value, key) => _.assignIn(result, key, value));

        return _.assignIn(game, { distances: dd });
      });
    console.log(goodGames.value());
    return goodGames;
  };

  firstGameAtBetween(teamId, start, end) {
    return _(this.gamesBetweenDates(start, end)).find(
      game => game.home_team === teamId
    );
  }

  buildRoute(teamId, start, end) {
    const results = [];

    const endOn = moment.utc(end);
    let current = moment.utc(start);
    let currentGame = this.firstGameAtBetween(teamId, start, end);
    let maxTravel = 300;
    results.push(currentGame);

    const route = {
      destination: currentGame.venue,
      origin: currentGame.venue,
      waypoints: [],
      schedule: []
    };

    console.log(currentGame);
    console.log(`${currentGame.scheduled} @ ${currentGame.home}`);
    console.log("first game", currentGame);
    route.schedule.push(
      `${moment(currentGame.scheduled).format("LL")} | ${currentGame.away} @ ${
        currentGame.home
      }`
    );

    // Key fix, current should be updated to whatever the first game is.
    // I.e. if you start w/ a home game in the city you choose, should go from there.

    // TODO: also first game is listed as a way point or always "B" in the markers.

    // TODO: reducing travel distance from 500 to 300/200 is better
    // TODO: avoiding repetition in cities would be ideal.
    current = moment(currentGame.scheduled);

    while (current.isBefore(endOn, "day")) {
      current.add(1, "day");
      console.log(current);
      let nextDaysGames = this.gamesBetweenDates(current, current);

      let nextDestination = _(nextDaysGames)
        .sortBy([game => game.distances[currentGame.home_team]])
        .filter(game => {
          return (
            _.filter(results, g => g.home_team === game.home_team).length < 3 &&
            game.distances[currentGame.home_team] <= maxTravel
          );
        })
        .first();

      if (_(nextDestination).isEmpty()) {
        console.log("travelling", `${current} Travel Day`);
        route.schedule.push(`${moment(current).format("LL")} Travel Day`);
        maxTravel += 300;
      } else {
        console.log(nextDestination);
        console.log(`${nextDestination.away} @ ${nextDestination.home}`);
        route.schedule.push(
          `${moment(nextDestination.scheduled).format("LL")} | ${
            nextDestination.away
          } @ ${nextDestination.home}`
        );
        results.push(nextDestination);
      }
    }

    route.waypoints = _(results)
      .map(result => {
        return { location: result.venue };
      })
      .value();

    return route;
  }
}
